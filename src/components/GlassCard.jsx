import React from 'react';

const GlassCard = ({ 
  children, 
  className = '', 
  style = {}, 
  onClick,
  hover = true,
  padding = '24px'
}) => {
  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(0, 0, 255, 0.15)',
    boxShadow: '0 4px 20px rgba(0, 0, 255, 0.1)',
    borderRadius: '12px',
    padding: padding,
    transition: 'all 0.3s ease',
    cursor: onClick ? 'pointer' : 'default',
    ...style
  };

  const hoverStyle = hover ? {
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 30px rgba(0, 0, 255, 0.15)'
    }
  } : {};

  return (
    <div 
      className={`glass-card ${className}`}
      style={cardStyle}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (hover) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 255, 0.15)';
        }
      }}
      onMouseLeave={(e) => {
        if (hover) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 255, 0.1)';
        }
      }}
    >
      {children}
    </div>
  );
};

export default GlassCard;