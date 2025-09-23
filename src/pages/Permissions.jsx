import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import Modal from '../components/Modal';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useToast } from '../components/Toast';

const Permissions = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  const [accessRequests] = useState([
    { id: 1, requester: 'Sarah Johnson', document: 'Insurance_Policy.pdf', type: 'View', status: 'pending', date: '2024-01-20' },
    { id: 2, requester: 'Mike Wilson', document: 'Medical_Records.pdf', type: 'Download', status: 'approved', date: '2024-01-19' },
    { id: 3, requester: 'Emma Davis', document: 'Tax_Return_2023.pdf', type: 'Edit', status: 'denied', date: '2024-01-18' }
  ]);

  const handleApprove = (request) => {
    showToast(`Access approved for ${request.requester}`, 'success');
  };

  const handleDeny = (request) => {
    showToast(`Access denied for ${request.requester}`, 'info');
  };

  return (
    <div className="min-h-screen flex flex-column">
      <Navbar />
      <main style={{ flex: 1, padding: '40px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div>
              <h1 className="h1">Permission Management 🔐</h1>
              <p style={{ fontSize: '16px', color: '#6B7280' }}>Manage document access requests</p>
            </div>
            <button onClick={() => setIsRequestModalOpen(true)} className="btn-primary">
              Request Access
            </button>
          </div>

          <div className="grid" style={{ gap: '20px' }}>
            {accessRequests.map(request => (
              <GlassCard key={request.id} style={{ padding: '24px' }}>
                <div className="flex justify-between align-center">
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1E3A8A', marginBottom: '8px' }}>
                      {request.requester}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>
                      Document: {request.document}
                    </p>
                    <p style={{ fontSize: '14px', color: '#6B7280' }}>
                      Type: {request.type} • Date: {request.date}
                    </p>
                  </div>
                  <div className="flex" style={{ gap: '8px' }}>
                    {request.status === 'pending' && (
                      <>
                        <button onClick={() => handleApprove(request)} className="btn-primary" style={{ padding: '8px 16px' }}>
                          Approve
                        </button>
                        <button onClick={() => handleDeny(request)} className="btn-danger" style={{ padding: '8px 16px' }}>
                          Deny
                        </button>
                      </>
                    )}
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500',
                      background: request.status === 'approved' ? 'rgba(34, 197, 94, 0.1)' : 
                                 request.status === 'denied' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                      color: request.status === 'approved' ? '#059669' : 
                             request.status === 'denied' ? '#DC2626' : '#D97706'
                    }}>
                      {request.status}
                    </span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Permissions;