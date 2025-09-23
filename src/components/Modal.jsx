import React, { useEffect } from 'react';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'medium',
  showCloseButton = true 
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    small: { maxWidth: '400px' },
    medium: { maxWidth: '600px' },
    large: { maxWidth: '800px' },
    full: { maxWidth: '95vw', maxHeight: '95vh' }
  };

  return (
    <div 
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
        padding: '20px'
      }}
    >
      <div 
        className="glass-modal"
        style={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 0, 255, 0.2)',
          boxShadow: '0 20px 40px rgba(0, 0, 255, 0.2)',
          borderRadius: '16px',
          width: '100%',
          ...sizeClasses[size],
          maxHeight: '90vh',
          overflow: 'auto'
        }}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div 
            style={{
              padding: '24px 24px 0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: title ? '1px solid rgba(0, 0, 255, 0.1)' : 'none',
              paddingBottom: title ? '16px' : '0',
              marginBottom: title ? '24px' : '0'
            }}
          >
            {title && (
              <h2 style={{ 
                margin: 0, 
                color: '#1E3A8A', 
                fontSize: '20px', 
                fontWeight: '600' 
              }}>
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#6B7280',
                  padding: '4px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#1E3A8A';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#6B7280';
                }}
              >
                ✕
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div style={{ padding: title || showCloseButton ? '0 24px 24px' : '24px' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;