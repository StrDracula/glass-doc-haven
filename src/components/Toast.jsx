import React, { useState, useEffect } from 'react';

const Toast = ({ 
  message, 
  type = 'info', 
  duration = 4000, 
  onClose,
  position = 'top-right'
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for animation to complete
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          borderColor: 'rgba(34, 197, 94, 0.3)',
          background: 'rgba(255, 255, 255, 0.9)',
          icon: '✅'
        };
      case 'error':
        return {
          borderColor: 'rgba(239, 68, 68, 0.3)',
          background: 'rgba(255, 255, 255, 0.9)',
          icon: '❌'
        };
      case 'warning':
        return {
          borderColor: 'rgba(245, 158, 11, 0.3)',
          background: 'rgba(255, 255, 255, 0.9)',
          icon: '⚠️'
        };
      default:
        return {
          borderColor: 'rgba(0, 0, 255, 0.2)',
          background: 'rgba(255, 255, 255, 0.9)',
          icon: 'ℹ️'
        };
    }
  };

  const getPositionStyles = () => {
    switch (position) {
      case 'top-left':
        return { top: '20px', left: '20px' };
      case 'top-center':
        return { top: '20px', left: '50%', transform: 'translateX(-50%)' };
      case 'top-right':
        return { top: '20px', right: '20px' };
      case 'bottom-left':
        return { bottom: '20px', left: '20px' };
      case 'bottom-center':
        return { bottom: '20px', left: '50%', transform: 'translateX(-50%)' };
      case 'bottom-right':
        return { bottom: '20px', right: '20px' };
      default:
        return { top: '20px', right: '20px' };
    }
  };

  const typeStyles = getTypeStyles();
  const positionStyles = getPositionStyles();

  return (
    <div
      style={{
        position: 'fixed',
        ...positionStyles,
        background: typeStyles.background,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: `1px solid ${typeStyles.borderColor}`,
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 8px 30px rgba(0, 0, 255, 0.15)',
        zIndex: 1000,
        minWidth: '300px',
        maxWidth: '400px',
        animation: isVisible 
          ? 'slideIn 0.3s ease-out' 
          : 'slideOut 0.3s ease-in',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}
    >
      <span style={{ fontSize: '18px' }}>{typeStyles.icon}</span>
      <span style={{ 
        fontSize: '14px', 
        color: '#333',
        flex: 1,
        lineHeight: '1.4'
      }}>
        {message}
      </span>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '16px',
          cursor: 'pointer',
          color: '#6B7280',
          padding: '2px',
          borderRadius: '2px'
        }}
      >
        ✕
      </button>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

// Toast Manager Hook
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random();
    const toast = { id, message, type, duration };
    
    setToasts(prev => [...prev, toast]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const ToastContainer = () => (
    <>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </>
  );

  return {
    showToast,
    ToastContainer
  };
};

export default Toast;