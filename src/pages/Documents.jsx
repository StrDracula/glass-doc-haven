import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import Modal from '../components/Modal';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useToast } from '../components/Toast';

const Documents = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Mock documents data
  const [documents] = useState([
    {
      id: 1,
      name: 'Passport_John.pdf',
      category: 'Identity',
      size: '2.5 MB',
      uploadedBy: 'John Doe',
      uploadDate: '2024-01-15',
      lastModified: '2024-01-15',
      permissions: ['view', 'download'],
      tags: ['passport', 'travel'],
      description: 'John\'s passport document for international travel'
    },
    {
      id: 2,
      name: 'Insurance_Policy.pdf',
      category: 'Insurance',
      size: '1.8 MB',
      uploadedBy: 'Jane Doe',
      uploadDate: '2024-01-14',
      lastModified: '2024-01-20',
      permissions: ['view', 'download', 'edit'],
      tags: ['insurance', 'health'],
      description: 'Family health insurance policy documents'
    },
    {
      id: 3,
      name: 'Medical_Records.pdf',
      category: 'Medical',
      size: '3.2 MB',
      uploadedBy: 'Dr. Smith',
      uploadDate: '2024-01-13',
      lastModified: '2024-01-13',
      permissions: ['view'],
      tags: ['medical', 'records'],
      description: 'Complete medical history and test results'
    },
    {
      id: 4,
      name: 'Tax_Return_2023.pdf',
      category: 'Financial',
      size: '0.9 MB',
      uploadedBy: 'John Doe',
      uploadDate: '2024-01-12',
      lastModified: '2024-01-18',
      permissions: ['view', 'download'],
      tags: ['tax', '2023'],
      description: '2023 tax return documents'
    },
    {
      id: 5,
      name: 'Birth_Certificate.pdf',
      category: 'Identity',
      size: '1.1 MB',
      uploadedBy: 'Jane Doe',
      uploadDate: '2024-01-11',
      lastModified: '2024-01-11',
      permissions: ['view', 'download'],
      tags: ['birth', 'certificate'],
      description: 'Official birth certificate'
    }
  ]);

  const categories = [
    { value: 'all', label: 'All Categories', icon: '📁' },
    { value: 'Identity', label: 'Identity', icon: '🆔' },
    { value: 'Medical', label: 'Medical', icon: '🏥' },
    { value: 'Financial', label: 'Financial', icon: '💰' },
    { value: 'Insurance', label: 'Insurance', icon: '🛡️' },
    { value: 'Legal', label: 'Legal', icon: '⚖️' },
    { value: 'Education', label: 'Education', icon: '🎓' }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleViewDocument = (doc) => {
    setSelectedDocument(doc);
    setIsViewModalOpen(true);
  };

  const handleDownload = (doc) => {
    showToast(`Downloading ${doc.name}...`, 'info');
    // Mock download functionality
  };

  const handleDelete = (doc) => {
    if (window.confirm(`Are you sure you want to delete ${doc.name}?`)) {
      showToast(`${doc.name} has been deleted`, 'success');
      // Mock delete functionality
    }
  };

  const UploadModal = () => {
    const [uploadData, setUploadData] = useState({
      file: null,
      category: 'Identity',
      description: '',
      tags: ''
    });

    const handleUpload = (e) => {
      e.preventDefault();
      showToast('Document uploaded successfully!', 'success');
      setIsUploadModalOpen(false);
      setUploadData({ file: null, category: 'Identity', description: '', tags: '' });
    };

    return (
      <Modal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload Document"
        size="medium"
      >
        <form onSubmit={handleUpload}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '500',
              color: '#1E3A8A',
              fontSize: '14px'
            }}>
              Select File
            </label>
            <input
              type="file"
              onChange={(e) => setUploadData({...uploadData, file: e.target.files[0]})}
              className="input-glass"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              required
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '500',
              color: '#1E3A8A',
              fontSize: '14px'
            }}>
              Category
            </label>
            <select
              value={uploadData.category}
              onChange={(e) => setUploadData({...uploadData, category: e.target.value})}
              className="input-glass"
              required
            >
              {categories.filter(cat => cat.value !== 'all').map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '500',
              color: '#1E3A8A',
              fontSize: '14px'
            }}>
              Description
            </label>
            <textarea
              value={uploadData.description}
              onChange={(e) => setUploadData({...uploadData, description: e.target.value})}
              className="input-glass"
              rows="3"
              placeholder="Brief description of the document"
              style={{ resize: 'vertical', minHeight: '80px' }}
            />
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '500',
              color: '#1E3A8A',
              fontSize: '14px'
            }}>
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={uploadData.tags}
              onChange={(e) => setUploadData({...uploadData, tags: e.target.value})}
              className="input-glass"
              placeholder="e.g., passport, travel, 2024"
            />
          </div>

          <div className="flex justify-between" style={{ gap: '12px' }}>
            <button 
              type="button" 
              onClick={() => setIsUploadModalOpen(false)}
              className="btn-secondary"
              style={{ flex: 1 }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              style={{ flex: 1 }}
            >
              Upload Document
            </button>
          </div>
        </form>
      </Modal>
    );
  };

  return (
    <div className="min-h-screen flex flex-column">
      <Navbar />
      
      <main style={{ flex: 1, padding: '40px 0' }}>
        <div className="container">
          {/* Header */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '32px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <h1 className="h1" style={{ marginBottom: '8px' }}>
                Document Management 📄
              </h1>
              <p style={{ fontSize: '16px', color: '#6B7280' }}>
                Manage and organize your family's important documents
              </p>
            </div>
            <button 
              onClick={() => setIsUploadModalOpen(true)}
              className="btn-primary"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                fontSize: '16px',
                padding: '12px 24px'
              }}
            >
              📤 Upload Document
            </button>
          </div>

          {/* Filters */}
          <GlassCard style={{ padding: '24px', marginBottom: '32px' }}>
            <div className="grid grid-2" style={{ gap: '24px', alignItems: 'end' }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '500',
                  color: '#1E3A8A',
                  fontSize: '14px'
                }}>
                  Search Documents
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-glass"
                  placeholder="Search by name or tags..."
                />
              </div>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '500',
                  color: '#1E3A8A',
                  fontSize: '14px'
                }}>
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input-glass"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.icon} {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </GlassCard>

          {/* Documents Grid */}
          <div className="grid grid-2" style={{ gap: '24px' }}>
            {filteredDocuments.map(doc => (
              <GlassCard key={doc.id} style={{ padding: '24px' }}>
                <div className="flex justify-between align-center" style={{ marginBottom: '16px' }}>
                  <h3 style={{ 
                    fontSize: '16px', 
                    fontWeight: '600', 
                    color: '#1E3A8A',
                    margin: 0,
                    wordBreak: 'break-word'
                  }}>
                    📄 {doc.name}
                  </h3>
                  <span style={{
                    background: 'rgba(37, 99, 235, 0.1)',
                    color: '#1E3A8A',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {doc.category}
                  </span>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <p style={{ 
                    fontSize: '13px', 
                    color: '#6B7280', 
                    lineHeight: '1.4',
                    margin: '0 0 8px 0'
                  }}>
                    {doc.description}
                  </p>
                  <div style={{ fontSize: '12px', color: '#6B7280' }}>
                    <span>📂 {doc.size}</span> • 
                    <span> 👤 {doc.uploadedBy}</span> • 
                    <span> 📅 {doc.uploadDate}</span>
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>
                    Tags:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {doc.tags.map(tag => (
                      <span key={tag} style={{
                        background: 'rgba(0, 0, 255, 0.1)',
                        color: '#1E3A8A',
                        padding: '2px 6px',
                        borderRadius: '8px',
                        fontSize: '11px'
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex" style={{ gap: '8px' }}>
                    <button
                      onClick={() => handleViewDocument(doc)}
                      className="btn-glass"
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                    >
                      👁️ View
                    </button>
                    {doc.permissions.includes('download') && (
                      <button
                        onClick={() => handleDownload(doc)}
                        className="btn-glass"
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                      >
                        📥 Download
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(doc)}
                    className="btn-danger"
                    style={{ padding: '6px 12px', fontSize: '12px' }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>

          {filteredDocuments.length === 0 && (
            <GlassCard style={{ padding: '60px', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📄</div>
              <h3 style={{ fontSize: '20px', color: '#1E3A8A', marginBottom: '8px' }}>
                No documents found
              </h3>
              <p style={{ color: '#6B7280', marginBottom: '24px' }}>
                {searchTerm || selectedCategory !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Upload your first document to get started'
                }
              </p>
              {!searchTerm && selectedCategory === 'all' && (
                <button 
                  onClick={() => setIsUploadModalOpen(true)}
                  className="btn-primary"
                >
                  📤 Upload Document
                </button>
              )}
            </GlassCard>
          )}
        </div>
      </main>

      <Footer />
      <UploadModal />

      {/* Document View Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={selectedDocument?.name}
        size="large"
      >
        {selectedDocument && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <div className="grid grid-2" style={{ gap: '16px', marginBottom: '16px' }}>
                <div>
                  <strong style={{ color: '#1E3A8A' }}>Category:</strong>
                  <span style={{ marginLeft: '8px', color: '#6B7280' }}>
                    {selectedDocument.category}
                  </span>
                </div>
                <div>
                  <strong style={{ color: '#1E3A8A' }}>Size:</strong>
                  <span style={{ marginLeft: '8px', color: '#6B7280' }}>
                    {selectedDocument.size}
                  </span>
                </div>
                <div>
                  <strong style={{ color: '#1E3A8A' }}>Uploaded by:</strong>
                  <span style={{ marginLeft: '8px', color: '#6B7280' }}>
                    {selectedDocument.uploadedBy}
                  </span>
                </div>
                <div>
                  <strong style={{ color: '#1E3A8A' }}>Upload Date:</strong>
                  <span style={{ marginLeft: '8px', color: '#6B7280' }}>
                    {selectedDocument.uploadDate}
                  </span>
                </div>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <strong style={{ color: '#1E3A8A' }}>Description:</strong>
                <p style={{ margin: '8px 0', color: '#6B7280', lineHeight: '1.5' }}>
                  {selectedDocument.description}
                </p>
              </div>

              <div>
                <strong style={{ color: '#1E3A8A' }}>Tags:</strong>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                  {selectedDocument.tags.map(tag => (
                    <span key={tag} style={{
                      background: 'rgba(37, 99, 235, 0.1)',
                      color: '#1E3A8A',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Mock Document Preview */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.05)',
              borderRadius: '8px',
              padding: '60px',
              textAlign: 'center',
              marginBottom: '24px'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📄</div>
              <p style={{ color: '#6B7280' }}>Document preview would appear here</p>
            </div>

            <div className="flex justify-center" style={{ gap: '12px' }}>
              {selectedDocument.permissions.includes('download') && (
                <button
                  onClick={() => handleDownload(selectedDocument)}
                  className="btn-primary"
                >
                  📥 Download
                </button>
              )}
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Documents;