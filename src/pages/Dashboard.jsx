import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
  const { user } = useAuth();

  // Mock data for dashboard widgets
  const stats = {
    totalDocuments: 127,
    storageUsed: '2.4 GB',
    storageLimit: '10 GB',
    familyMembers: 5,
    recentActivity: 8,
    pendingApprovals: 3
  };

  const recentDocuments = [
    { id: 1, name: 'Passport_John.pdf', type: 'Identity', uploadedBy: 'John Doe', date: '2024-01-15' },
    { id: 2, name: 'Insurance_Policy.pdf', type: 'Insurance', uploadedBy: 'Jane Doe', date: '2024-01-14' },
    { id: 3, name: 'Medical_Records.pdf', type: 'Medical', uploadedBy: 'John Doe', date: '2024-01-13' },
    { id: 4, name: 'Tax_Return_2023.pdf', type: 'Financial', uploadedBy: 'Jane Doe', date: '2024-01-12' }
  ];

  const notifications = [
    { id: 1, type: 'reminder', message: 'Passport expires in 30 days', time: '2 hours ago' },
    { id: 2, type: 'approval', message: 'Sarah requested access to Insurance documents', time: '5 hours ago' },
    { id: 3, type: 'activity', message: 'Mike uploaded new Medical records', time: '1 day ago' }
  ];

  const quickActions = [
    { icon: '📄', label: 'Upload Document', link: '/dashboard/documents', color: '#2563EB' },
    { icon: '👨‍👩‍👧‍👦', label: 'Manage Family', link: '/dashboard/family', color: '#059669' },
    { icon: '🔐', label: 'Set Permissions', link: '/dashboard/permissions', color: '#DC2626' },
    { icon: '🔔', label: 'View Notifications', link: '/dashboard/notifications', color: '#D97706' }
  ];

  const storagePercentage = (parseFloat(stats.storageUsed) / parseFloat(stats.storageLimit)) * 100;

  return (
    <div className="min-h-screen flex flex-column" style={{ background: '#ffffff' }}>
      <Navbar />
      
      <main style={{ flex: 1, padding: '40px 0' }}>
        <div className="container">
          {/* Header */}
          <div style={{ marginBottom: '40px' }}>
            <h1 className="h1" style={{ marginBottom: '8px' }}>
              Welcome back, {user?.name}! 👋
            </h1>
            <p style={{ fontSize: '16px', color: '#6B7280' }}>
              Here's what's happening with your documents today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-4" style={{ gap: '24px', marginBottom: '40px' }}>
            <GlassCard style={{ padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', color: '#2563EB', fontWeight: '700', marginBottom: '8px' }}>
                {stats.totalDocuments}
              </div>
              <div style={{ fontSize: '14px', color: '#6B7280', fontWeight: '500' }}>
                Total Documents
              </div>
            </GlassCard>

            <GlassCard style={{ padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', color: '#059669', fontWeight: '700', marginBottom: '8px' }}>
                {stats.familyMembers}
              </div>
              <div style={{ fontSize: '14px', color: '#6B7280', fontWeight: '500' }}>
                Family Members
              </div>
            </GlassCard>

            <GlassCard style={{ padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', color: '#DC2626', fontWeight: '700', marginBottom: '8px' }}>
                {stats.pendingApprovals}
              </div>
              <div style={{ fontSize: '14px', color: '#6B7280', fontWeight: '500' }}>
                Pending Approvals
              </div>
            </GlassCard>

            <GlassCard style={{ padding: '24px' }}>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '16px', color: '#1E3A8A', fontWeight: '600', marginBottom: '4px' }}>
                  Storage Used
                </div>
                <div style={{ fontSize: '14px', color: '#6B7280' }}>
                  {stats.storageUsed} of {stats.storageLimit}
                </div>
              </div>
              <div style={{ 
                background: 'rgba(0, 0, 255, 0.1)', 
                borderRadius: '8px', 
                height: '8px',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  background: 'linear-gradient(90deg, #2563EB, #3B82F6)',
                  height: '100%',
                  width: `${storagePercentage}%`,
                  borderRadius: '8px',
                  transition: 'width 0.3s ease'
                }}></div>
              </div>
            </GlassCard>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-3" style={{ gap: '30px' }}>
            {/* Quick Actions */}
            <GlassCard style={{ padding: '30px' }}>
              <h3 className="h3" style={{ marginBottom: '20px', fontSize: '18px' }}>
                Quick Actions
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {quickActions.map((action, index) => (
                  <Link 
                    key={index}
                    to={action.link}
                    style={{ textDecoration: 'none' }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '16px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.5)',
                      border: '1px solid rgba(0, 0, 255, 0.1)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    >
                      <span style={{ 
                        fontSize: '24px', 
                        marginRight: '16px'
                      }}>
                        {action.icon}
                      </span>
                      <span style={{ 
                        fontSize: '14px', 
                        fontWeight: '500',
                        color: '#1E3A8A'
                      }}>
                        {action.label}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </GlassCard>

            {/* Recent Documents */}
            <GlassCard style={{ padding: '30px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <h3 className="h3" style={{ margin: 0, fontSize: '18px' }}>
                  Recent Documents
                </h3>
                <Link to="/dashboard/documents" style={{ 
                  fontSize: '12px', 
                  color: '#2563EB', 
                  textDecoration: 'none',
                  fontWeight: '500'
                }}>
                  View All →
                </Link>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {recentDocuments.map((doc) => (
                  <div key={doc.id} style={{
                    padding: '12px',
                    borderRadius: '6px',
                    background: 'rgba(255, 255, 255, 0.3)',
                    border: '1px solid rgba(0, 0, 255, 0.05)'
                  }}>
                    <div style={{ 
                      fontSize: '14px', 
                      fontWeight: '500', 
                      color: '#1E3A8A',
                      marginBottom: '4px'
                    }}>
                      📄 {doc.name}
                    </div>
                    <div style={{ 
                      fontSize: '12px', 
                      color: '#6B7280',
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}>
                      <span>{doc.type} • {doc.uploadedBy}</span>
                      <span>{doc.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Notifications */}
            <GlassCard style={{ padding: '30px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <h3 className="h3" style={{ margin: 0, fontSize: '18px' }}>
                  Notifications
                </h3>
                <Link to="/dashboard/notifications" style={{ 
                  fontSize: '12px', 
                  color: '#2563EB', 
                  textDecoration: 'none',
                  fontWeight: '500'
                }}>
                  View All →
                </Link>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {notifications.map((notification) => (
                  <div key={notification.id} style={{
                    padding: '12px',
                    borderRadius: '6px',
                    background: 'rgba(255, 255, 255, 0.3)',
                    border: '1px solid rgba(0, 0, 255, 0.05)'
                  }}>
                    <div style={{ 
                      fontSize: '13px', 
                      color: '#1E3A8A',
                      marginBottom: '4px',
                      lineHeight: '1.4'
                    }}>
                      {notification.type === 'reminder' && '⏰'} 
                      {notification.type === 'approval' && '🔐'} 
                      {notification.type === 'activity' && '📋'} 
                      {' '}{notification.message}
                    </div>
                    <div style={{ 
                      fontSize: '11px', 
                      color: '#6B7280'
                    }}>
                      {notification.time}
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

export default Dashboard;