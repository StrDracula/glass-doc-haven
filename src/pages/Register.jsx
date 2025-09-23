import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import { useToast } from '../components/Toast';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { register } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const result = await register(formData.name, formData.email, formData.password);
      
      if (result.success) {
        showToast('Account created successfully! Welcome to DocVault.', 'success');
        navigate('/dashboard');
      } else {
        showToast(result.error || 'Registration failed. Please try again.', 'error');
      }
    } catch (error) {
      showToast('An unexpected error occurred. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex align-center justify-center" style={{
      background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.05), rgba(37, 99, 235, 0.05))',
      padding: '20px'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(30, 58, 138, 0.1) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(37, 99, 235, 0.1) 0%, transparent 50%)',
        zIndex: 0
      }}></div>

      <div style={{ 
        width: '100%', 
        maxWidth: '900px', 
        position: 'relative', 
        zIndex: 1 
      }}>
        <div className="grid grid-2" style={{ gap: '40px', alignItems: 'center' }}>
          {/* Left Side - Welcome */}
          <div>
            <Link to="/" style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              textDecoration: 'none',
              marginBottom: '32px'
            }}>
              <span style={{ fontSize: '32px', marginRight: '12px' }}>🏛️</span>
              <span className="h2" style={{ margin: 0, color: '#1E3A8A' }}>DocVault</span>
            </Link>
            
            <h1 className="h1" style={{ 
              fontSize: '2.5rem', 
              marginBottom: '16px',
              color: '#1E3A8A'
            }}>
              Join DocVault Today
            </h1>
            <p style={{ 
              fontSize: '18px', 
              color: '#6B7280', 
              marginBottom: '32px',
              lineHeight: '1.6'
            }}>
              Create your account and start securing your family's important documents 
              with our advanced document management system.
            </p>

            {/* Features */}
            <div>
              {[
                { icon: '🔒', text: 'Bank-level encryption' },
                { icon: '👨‍👩‍👧‍👦', text: 'Family document sharing' },
                { icon: '📱', text: 'Multi-device access' },
                { icon: '🔔', text: 'Smart reminders' }
              ].map((feature, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '12px',
                  fontSize: '16px'
                }}>
                  <span style={{ marginRight: '12px', fontSize: '20px' }}>{feature.icon}</span>
                  <span style={{ color: '#6B7280' }}>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Register Form */}
          <GlassCard style={{ padding: '40px' }}>
            <h2 className="h2" style={{ 
              textAlign: 'center', 
              marginBottom: '32px',
              fontSize: '24px'
            }}>
              Create Account
            </h2>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '500',
                  color: '#1E3A8A',
                  fontSize: '14px'
                }}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-glass"
                  placeholder="Enter your full name"
                  style={{
                    borderColor: errors.name ? '#EF4444' : undefined
                  }}
                />
                {errors.name && (
                  <p style={{ 
                    color: '#EF4444', 
                    fontSize: '12px', 
                    marginTop: '4px',
                    margin: '4px 0 0'
                  }}>
                    {errors.name}
                  </p>
                )}
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '500',
                  color: '#1E3A8A',
                  fontSize: '14px'
                }}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-glass"
                  placeholder="Enter your email"
                  style={{
                    borderColor: errors.email ? '#EF4444' : undefined
                  }}
                />
                {errors.email && (
                  <p style={{ 
                    color: '#EF4444', 
                    fontSize: '12px', 
                    marginTop: '4px',
                    margin: '4px 0 0'
                  }}>
                    {errors.email}
                  </p>
                )}
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '500',
                  color: '#1E3A8A',
                  fontSize: '14px'
                }}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-glass"
                  placeholder="Create a password (min. 6 characters)"
                  style={{
                    borderColor: errors.password ? '#EF4444' : undefined
                  }}
                />
                {errors.password && (
                  <p style={{ 
                    color: '#EF4444', 
                    fontSize: '12px', 
                    marginTop: '4px',
                    margin: '4px 0 0'
                  }}>
                    {errors.password}
                  </p>
                )}
              </div>

              <div style={{ marginBottom: '32px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '500',
                  color: '#1E3A8A',
                  fontSize: '14px'
                }}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-glass"
                  placeholder="Confirm your password"
                  style={{
                    borderColor: errors.confirmPassword ? '#EF4444' : undefined
                  }}
                />
                {errors.confirmPassword && (
                  <p style={{ 
                    color: '#EF4444', 
                    fontSize: '12px', 
                    marginTop: '4px',
                    margin: '4px 0 0'
                  }}>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <button 
                type="submit" 
                className="btn-primary w-full"
                disabled={isLoading}
                style={{
                  opacity: isLoading ? 0.7 : 1,
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  marginBottom: '24px'
                }}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>

              <p style={{ 
                fontSize: '12px', 
                color: '#6B7280', 
                textAlign: 'center',
                lineHeight: '1.4',
                margin: 0
              }}>
                By creating an account, you agree to our{' '}
                <Link to="#" style={{ color: '#2563EB', textDecoration: 'none' }}>
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link to="#" style={{ color: '#2563EB', textDecoration: 'none' }}>
                  Privacy Policy
                </Link>
              </p>
            </form>

            <div style={{ 
              textAlign: 'center', 
              marginTop: '32px', 
              paddingTop: '24px',
              borderTop: '1px solid rgba(0, 0, 255, 0.1)'
            }}>
              <p style={{ color: '#6B7280', fontSize: '14px', marginBottom: '16px' }}>
                Already have an account?
              </p>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <button className="btn-glass w-full">
                  Sign In
                </button>
              </Link>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Register;