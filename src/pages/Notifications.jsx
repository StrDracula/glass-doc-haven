import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Notifications = () => {
  const [notifications] = useState([
    { id: 1, type: 'reminder', title: 'Passport Expiring Soon', message: 'Your passport expires in 30 days', time: '2 hours ago', read: false },
    { id: 2, type: 'approval', title: 'Access Request', message: 'Sarah requested access to Insurance documents', time: '5 hours ago', read: false },
    { id: 3, type: 'activity', title: 'New Upload', message: 'Mike uploaded Medical records', time: '1 day ago', read: true },
    { id: 4, type: 'reminder', title: 'Document Review', message: 'Time to review your insurance policy', time: '2 days ago', read: true }
  ]);

  const getIcon = (type) => {
    switch(type) {
      case 'reminder': return '⏰';
      case 'approval': return '🔐';
      case 'activity': return '📋';
      default: return 'ℹ️';
    }
  };

  return (
    <div className="min-h-screen flex flex-column">
      <Navbar />
      <main style={{ flex: 1, padding: '40px 0' }}>
        <div className="container">
          <h1 className="h1">Notifications & Reminders 🔔</h1>
          <p style={{ fontSize: '16px', color: '#6B7280', marginBottom: '32px' }}>Stay updated with your document activities</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {notifications.map(notification => (
              <GlassCard key={notification.id} style={{ 
                padding: '20px',
                opacity: notification.read ? 0.7 : 1,
                borderLeft: notification.read ? 'none' : '4px solid #2563EB'
              }}>
                <div className="flex align-center justify-between">
                  <div className="flex align-center" style={{ gap: '12px' }}>
                    <span style={{ fontSize: '24px' }}>{getIcon(notification.type)}</span>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1E3A8A', margin: '0 0 4px 0' }}>
                        {notification.title}
                      </h3>
                      <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
                        {notification.message}
                      </p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '12px', color: '#6B7280' }}>{notification.time}</span>
                    {!notification.read && (
                      <div style={{ 
                        width: '8px', 
                        height: '8px', 
                        background: '#2563EB', 
                        borderRadius: '50%',
                        marginTop: '4px',
                        marginLeft: 'auto'
                      }}></div>
                    )}
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

export default Notifications;