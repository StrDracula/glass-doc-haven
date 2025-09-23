import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useToast } from '../components/Toast';

const Admin = () => {
  const { showToast } = useToast();
  
  const [logs] = useState([
    { id: 1, user: 'John Doe', action: 'Document Upload', document: 'Passport.pdf', timestamp: '2024-01-20 14:30', ip: '192.168.1.1' },
    { id: 2, user: 'Jane Doe', action: 'Permission Request', document: 'Insurance.pdf', timestamp: '2024-01-20 13:15', ip: '192.168.1.2' },
    { id: 3, user: 'Mike Wilson', action: 'Document Download', document: 'Medical.pdf', timestamp: '2024-01-20 12:45', ip: '192.168.1.3' }
  ]);

  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', lastLogin: '2024-01-20', role: 'Admin' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com', status: 'active', lastLogin: '2024-01-19', role: 'Member' },
    { id: 3, name: 'Mike Wilson', email: 'mike@example.com', status: 'suspended', lastLogin: '2024-01-18', role: 'Member' }
  ]);

  const handleSuspend = (user) => {
    showToast(`${user.name} has been suspended`, 'warning');
  };

  const handleActivate = (user) => {
    showToast(`${user.name} has been activated`, 'success');
  };

  return (
    <div className="min-h-screen flex flex-column">
      <Navbar />
      <main style={{ flex: 1, padding: '40px 0' }}>
        <div className="container">
          <h1 className="h1">Admin Monitoring ⚙️</h1>
          <p style={{ fontSize: '16px', color: '#6B7280', marginBottom: '32px' }}>System monitoring and user management</p>

          {/* Stats */}
          <div className="grid grid-4" style={{ gap: '20px', marginBottom: '40px' }}>
            <GlassCard style={{ padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', color: '#2563EB', fontWeight: '700' }}>156</div>
              <div style={{ fontSize: '12px', color: '#6B7280' }}>Total Users</div>
            </GlassCard>
            <GlassCard style={{ padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', color: '#059669', fontWeight: '700' }}>1.2K</div>
              <div style={{ fontSize: '12px', color: '#6B7280' }}>Documents</div>
            </GlassCard>
            <GlassCard style={{ padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', color: '#DC2626', fontWeight: '700' }}>3</div>
              <div style={{ fontSize: '12px', color: '#6B7280' }}>Suspended</div>
            </GlassCard>
            <GlassCard style={{ padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', color: '#D97706', fontWeight: '700' }}>45</div>
              <div style={{ fontSize: '12px', color: '#6B7280' }}>Active Sessions</div>
            </GlassCard>
          </div>

          <div className="grid grid-2" style={{ gap: '30px' }}>
            {/* Activity Logs */}
            <GlassCard style={{ padding: '24px' }}>
              <h3 className="h3" style={{ marginBottom: '20px' }}>Recent Activity</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {logs.map(log => (
                  <div key={log.id} style={{ 
                    padding: '12px', 
                    background: 'rgba(255, 255, 255, 0.3)', 
                    borderRadius: '8px',
                    fontSize: '13px'
                  }}>
                    <div style={{ fontWeight: '500', color: '#1E3A8A', marginBottom: '4px' }}>
                      {log.user} - {log.action}
                    </div>
                    <div style={{ color: '#6B7280' }}>
                      Document: {log.document} • {log.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* User Management */}
            <GlassCard style={{ padding: '24px' }}>
              <h3 className="h3" style={{ marginBottom: '20px' }}>User Management</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {users.map(user => (
                  <div key={user.id} style={{ 
                    padding: '16px', 
                    background: 'rgba(255, 255, 255, 0.3)', 
                    borderRadius: '8px'
                  }}>
                    <div className="flex justify-between align-center">
                      <div>
                        <div style={{ fontWeight: '500', color: '#1E3A8A', fontSize: '14px' }}>
                          {user.name}
                        </div>
                        <div style={{ fontSize: '12px', color: '#6B7280' }}>
                          {user.email} • {user.role}
                        </div>
                      </div>
                      <div className="flex" style={{ gap: '8px' }}>
                        {user.status === 'active' ? (
                          <button 
                            onClick={() => handleSuspend(user)}
                            className="btn-danger"
                            style={{ padding: '4px 8px', fontSize: '11px' }}
                          >
                            Suspend
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleActivate(user)}
                            className="btn-primary"
                            style={{ padding: '4px 8px', fontSize: '11px' }}
                          >
                            Activate
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;