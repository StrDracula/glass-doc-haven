import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useToast } from '../components/Toast';

const Family = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [familyMembers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', joinDate: '2024-01-01' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com', role: 'Member', status: 'active', joinDate: '2024-01-02' },
    { id: 3, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Member', status: 'pending', joinDate: '2024-01-20' }
  ]);

  const handleAccept = (member) => {
    showToast(`${member.name} has been accepted`, 'success');
  };

  const handleRemove = (member) => {
    if (window.confirm(`Remove ${member.name} from family group?`)) {
      showToast(`${member.name} has been removed`, 'info');
    }
  };

  return (
    <div className="min-h-screen flex flex-column">
      <Navbar />
      <main style={{ flex: 1, padding: '40px 0' }}>
        <div className="container">
          <div>
            <h1 className="h1">Family Management 👨‍👩‍👧‍👦</h1>
            <p style={{ fontSize: '16px', color: '#6B7280', marginBottom: '32px' }}>Manage your family members and their access</p>
          </div>

          <div className="grid grid-2" style={{ gap: '24px' }}>
            {familyMembers.map(member => (
              <GlassCard key={member.id} style={{ padding: '24px' }}>
                <div className="flex justify-between align-center" style={{ marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1E3A8A', margin: 0 }}>
                    {member.name}
                  </h3>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '500',
                    background: member.status === 'active' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                    color: member.status === 'active' ? '#059669' : '#D97706'
                  }}>
                    {member.status}
                  </span>
                </div>
                
                <div style={{ marginBottom: '16px' }}>
                  <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>
                    📧 {member.email}
                  </p>
                  <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>
                    🏷️ Role: {member.role}
                  </p>
                  <p style={{ fontSize: '14px', color: '#6B7280' }}>
                    📅 Joined: {member.joinDate}
                  </p>
                </div>

                <div className="flex" style={{ gap: '8px' }}>
                  {member.status === 'pending' && (
                    <button onClick={() => handleAccept(member)} className="btn-primary" style={{ flex: 1, padding: '8px' }}>
                      Accept
                    </button>
                  )}
                  {member.id !== user?.id && (
                    <button onClick={() => handleRemove(member)} className="btn-danger" style={{ flex: 1, padding: '8px' }}>
                      Remove
                    </button>
                  )}
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

export default Family;