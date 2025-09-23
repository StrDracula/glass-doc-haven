import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/dashboard/documents', label: 'Documents', icon: '📄' },
    { path: '/dashboard/permissions', label: 'Permissions', icon: '🔐' },
    { path: '/dashboard/family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
    { path: '/dashboard/notifications', label: 'Notifications', icon: '🔔' },
  ];

  if (isAdmin()) {
    navLinks.push({ path: '/dashboard/admin', label: 'Admin', icon: '⚙️' });
  }

  return (
    <nav className="glass-navbar" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container">
        <div className="flex justify-between align-center" style={{ height: '70px' }}>
          {/* Logo */}
          <Link to="/" className="flex align-center" style={{ textDecoration: 'none' }}>
            <div style={{ fontSize: '24px', marginRight: '8px' }}>🏛️</div>
            <span className="h3" style={{ margin: 0, color: '#1E3A8A' }}>DocVault</span>
          </Link>

          {/* Desktop Navigation */}
          {user && (
            <div className="flex align-center" style={{ display: window.innerWidth > 768 ? 'flex' : 'none' }}>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 16px',
                    margin: '0 4px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: isActive(link.path) ? '#1E3A8A' : '#6B7280',
                    backgroundColor: isActive(link.path) ? 'rgba(30, 58, 138, 0.1)' : 'transparent',
                    border: isActive(link.path) ? '1px solid rgba(30, 58, 138, 0.2)' : '1px solid transparent',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <span style={{ marginRight: '6px', fontSize: '16px' }}>{link.icon}</span>
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>{link.label}</span>
                </Link>
              ))}
            </div>
          )}

          {/* User Menu */}
          <div className="flex align-center">
            {user ? (
              <div className="flex align-center">
                <div className="glass-card" style={{ padding: '8px 12px', marginRight: '12px' }}>
                  <span style={{ fontSize: '14px', color: '#1E3A8A', fontWeight: '500' }}>
                    {user.name}
                  </span>
                </div>
                <button onClick={handleLogout} className="btn-secondary">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex align-center">
                <Link to="/login" style={{ textDecoration: 'none', marginRight: '12px' }}>
                  <button className="btn-glass">Login</button>
                </Link>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  <button className="btn-primary">Register</button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            {user && (
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="btn-glass"
                style={{ 
                  display: window.innerWidth <= 768 ? 'block' : 'none',
                  marginLeft: '12px',
                  padding: '8px'
                }}
              >
                ☰
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {user && isMobileMenuOpen && (
          <div className="glass-card" style={{ 
            position: 'absolute',
            top: '70px',
            left: '20px',
            right: '20px',
            padding: '16px',
            display: window.innerWidth <= 768 ? 'block' : 'none'
          }}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 16px',
                  margin: '4px 0',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: isActive(link.path) ? '#1E3A8A' : '#6B7280',
                  backgroundColor: isActive(link.path) ? 'rgba(30, 58, 138, 0.1)' : 'transparent',
                  border: '1px solid transparent',
                  transition: 'all 0.3s ease',
                }}
              >
                <span style={{ marginRight: '8px', fontSize: '18px' }}>{link.icon}</span>
                <span style={{ fontSize: '16px', fontWeight: '500' }}>{link.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;