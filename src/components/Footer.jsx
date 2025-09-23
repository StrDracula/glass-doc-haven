import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      borderTop: '1px solid rgba(0, 0, 255, 0.1)',
      backgroundColor: '#ffffff',
      padding: '40px 0 20px',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div className="grid grid-4" style={{ marginBottom: '30px' }}>
          {/* Brand */}
          <div>
            <div className="flex align-center mb-3">
              <span style={{ fontSize: '24px', marginRight: '8px' }}>🏛️</span>
              <span className="h3" style={{ margin: 0, color: '#1E3A8A' }}>DocVault</span>
            </div>
            <p className="text-gray" style={{ fontSize: '14px', lineHeight: '1.6' }}>
              Secure document management for families and organizations. 
              Keep your important documents safe and organized.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 style={{ color: '#1E3A8A', marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
              Product
            </h4>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: '8px' }}>
                <a href="#" style={{ color: '#6B7280', textDecoration: 'none', fontSize: '14px' }}>
                  Features
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="#" style={{ color: '#6B7280', textDecoration: 'none', fontSize: '14px' }}>
                  Security
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="#" style={{ color: '#6B7280', textDecoration: 'none', fontSize: '14px' }}>
                  Pricing
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="#" style={{ color: '#6B7280', textDecoration: 'none', fontSize: '14px' }}>
                  API
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 style={{ color: '#1E3A8A', marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
              Support
            </h4>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: '8px' }}>
                <a href="#" style={{ color: '#6B7280', textDecoration: 'none', fontSize: '14px' }}>
                  Help Center
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="#" style={{ color: '#6B7280', textDecoration: 'none', fontSize: '14px' }}>
                  Contact Us
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="#" style={{ color: '#6B7280', textDecoration: 'none', fontSize: '14px' }}>
                  Documentation
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="#" style={{ color: '#6B7280', textDecoration: 'none', fontSize: '14px' }}>
                  Status
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ color: '#1E3A8A', marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: '8px' }}>
                <a href="#" style={{ color: '#6B7280', textDecoration: 'none', fontSize: '14px' }}>
                  About Us
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="#" style={{ color: '#6B7280', textDecoration: 'none', fontSize: '14px' }}>
                  Privacy Policy
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="#" style={{ color: '#6B7280', textDecoration: 'none', fontSize: '14px' }}>
                  Terms of Service
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="#" style={{ color: '#6B7280', textDecoration: 'none', fontSize: '14px' }}>
                  Careers
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ 
          paddingTop: '20px', 
          borderTop: '1px solid rgba(0, 0, 255, 0.05)',
          textAlign: 'center'
        }}>
          <div className="flex justify-between align-center">
            <p style={{ color: '#6B7280', fontSize: '14px', margin: 0 }}>
              © 2024 DocVault. All rights reserved.
            </p>
            <div className="flex">
              <a 
                href="#" 
                style={{ 
                  color: '#6B7280', 
                  fontSize: '20px', 
                  marginLeft: '16px',
                  textDecoration: 'none'
                }}
              >
                📧
              </a>
              <a 
                href="#" 
                style={{ 
                  color: '#6B7280', 
                  fontSize: '20px', 
                  marginLeft: '16px',
                  textDecoration: 'none'
                }}
              >
                🐦
              </a>
              <a 
                href="#" 
                style={{ 
                  color: '#6B7280', 
                  fontSize: '20px', 
                  marginLeft: '16px',
                  textDecoration: 'none'
                }}
              >
                💼
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;