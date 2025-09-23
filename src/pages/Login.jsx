import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import { useToast } from '../components/Toast';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  const from = location.state?.from?.pathname || '/dashboard';

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
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        showToast('Login successful! Welcome back.', 'success');
        navigate(from, { replace: true });
      } else {
        showToast(result.error || 'Login failed. Please try again.', 'error');
      }
    } catch (error) {
      showToast('An unexpected error occurred. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const demoCredentials = [
    { email: 'admin@docvault.com', password: 'admin123', role: 'Admin' },
    { email: 'user@docvault.com', password: 'user123', role: 'User' }
  ];

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
        backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(30, 58, 138, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(37, 99, 235, 0.1) 0%, transparent 50%)',
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
              Welcome Back
            </h1>
            <p style={{ 
              fontSize: '18px', 
              color: '#6B7280', 
              marginBottom: '32px',
              lineHeight: '1.6'
            }}>
              Sign in to access your secure document vault and manage your family's important files.
            </p>

            {/* Demo Credentials */}
            <GlassCard style={{ padding: '20px' }}>
              <h3 style={{ 
                fontSize: '16px', 
                fontWeight: '600', 
                color: '#1E3A8A', 
                marginBottom: '12px' 
              }}>
                Demo Credentials
              </h3>
              {demoCredentials.map((cred, index) => (
                <div key={index} style={{ 
                  marginBottom: '8px', 
                  fontSize: '14px',
                  padding: '8px',
                  background: 'rgba(30, 58, 138, 0.05)',
                  borderRadius: '6px'
                }}>
                  <div style={{ fontWeight: '500', color: '#1E3A8A' }}>{cred.role}:</div>
                  <div style={{ color: '#6B7280' }}>
                    {cred.email} / {cred.password}
                  </div>
                </div>
              ))}
            </GlassCard>
          </div>

          {/* Right Side - Login Form */}
          <GlassCard style={{ padding: '40px' }}>
            <h2 className="h2" style={{ 
              textAlign: 'center', 
              marginBottom: '32px',
              fontSize: '24px'
            }}>
              Sign In
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

              <div style={{ marginBottom: '32px' }}>
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
                  placeholder="Enter your password"
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
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>

              <div className="text-center">
                <Link 
                  to="#" 
                  style={{ 
                    color: '#2563EB', 
                    textDecoration: 'none', 
                    fontSize: '14px' 
                  }}
                >
                  Forgot your password?
                </Link>
              </div>
            </form>

            <div style={{ 
              textAlign: 'center', 
              marginTop: '32px', 
              paddingTop: '24px',
              borderTop: '1px solid rgba(0, 0, 255, 0.1)'
            }}>
              <p style={{ color: '#6B7280', fontSize: '14px', marginBottom: '16px' }}>
                Don't have an account?
              </p>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <button className="btn-glass w-full">
                  Create Account
                </button>
              </Link>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Login;