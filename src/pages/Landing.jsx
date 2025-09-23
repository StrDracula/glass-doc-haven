import React from 'react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Landing = () => {
  const features = [
    {
      icon: '🔒',
      title: 'Secure Storage',
      description: 'Bank-level encryption for all your important documents. Your files are protected with military-grade security.'
    },
    {
      icon: '👨‍👩‍👧‍👦',
      title: 'Family Sharing',
      description: 'Share documents with family members safely. Control who can view, edit, or manage your documents.'
    },
    {
      icon: '🔐',
      title: 'Permission Control',
      description: 'Granular permissions system. Decide exactly what each family member can access.'
    },
    {
      icon: '📱',
      title: 'Multi-Device Access',
      description: 'Access your documents from anywhere, on any device. Seamless synchronization across platforms.'
    },
    {
      icon: '🔔',
      title: 'Smart Reminders',
      description: 'Never miss important document renewals. Get notified before your documents expire.'
    },
    {
      icon: '📊',
      title: 'Analytics Dashboard',
      description: 'Track document usage and activity. Get insights into your document management habits.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-column">
      <Navbar />
      
      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.05), rgba(37, 99, 235, 0.05))',
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(30, 58, 138, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(37, 99, 235, 0.1) 0%, transparent 50%)',
          zIndex: 0
        }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="text-center">
            <GlassCard style={{ 
              display: 'inline-block', 
              padding: '60px 40px',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              <h1 className="h1" style={{ 
                fontSize: '3.5rem', 
                marginBottom: '20px',
                background: 'linear-gradient(135deg, #1E3A8A, #2563EB)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Your Family's Digital Vault
              </h1>
              <p style={{ 
                fontSize: '20px', 
                color: '#6B7280', 
                marginBottom: '40px',
                lineHeight: '1.6',
                maxWidth: '600px',
                margin: '0 auto 40px'
              }}>
                Secure document management system designed for families. 
                Store, organize, and share your important documents with complete peace of mind.
              </p>
              <div className="flex justify-center" style={{ gap: '20px', flexWrap: 'wrap' }}>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  <button className="btn-primary" style={{ 
                    fontSize: '18px', 
                    padding: '16px 32px',
                    boxShadow: '0 8px 30px rgba(37, 99, 235, 0.3)'
                  }}>
                    Get Started Free
                  </button>
                </Link>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <button className="btn-glass" style={{ 
                    fontSize: '18px', 
                    padding: '16px 32px'
                  }}>
                    Sign In
                  </button>
                </Link>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="h2" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
              Why Choose DocVault?
            </h2>
            <p style={{ 
              fontSize: '18px', 
              color: '#6B7280', 
              maxWidth: '600px', 
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Built specifically for families who want to keep their important documents 
              secure, organized, and easily accessible to authorized members.
            </p>
          </div>

          <div className="grid grid-3" style={{ gap: '30px' }}>
            {features.map((feature, index) => (
              <GlassCard key={index} style={{ textAlign: 'center', padding: '40px 30px' }}>
                <div style={{ 
                  fontSize: '48px', 
                  marginBottom: '20px',
                  display: 'block'
                }}>
                  {feature.icon}
                </div>
                <h3 className="h3" style={{ marginBottom: '16px', fontSize: '20px' }}>
                  {feature.title}
                </h3>
                <p style={{ 
                  color: '#6B7280', 
                  lineHeight: '1.6',
                  fontSize: '15px'
                }}>
                  {feature.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.02), rgba(37, 99, 235, 0.02))',
        padding: '80px 0'
      }}>
        <div className="container">
          <div className="grid grid-4" style={{ gap: '30px' }}>
            {[
              { number: '10K+', label: 'Families Protected' },
              { number: '1M+', label: 'Documents Secured' },
              { number: '99.9%', label: 'Uptime Guarantee' },
              { number: '24/7', label: 'Support Available' }
            ].map((stat, index) => (
              <GlassCard key={index} style={{ textAlign: 'center', padding: '30px 20px' }}>
                <h3 style={{ 
                  fontSize: '36px', 
                  fontWeight: '700', 
                  color: '#1E3A8A', 
                  marginBottom: '8px'
                }}>
                  {stat.number}
                </h3>
                <p style={{ 
                  color: '#6B7280', 
                  fontSize: '16px',
                  margin: 0
                }}>
                  {stat.label}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div className="text-center">
            <GlassCard style={{ 
              padding: '60px 40px',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              <h2 className="h2" style={{ marginBottom: '20px', fontSize: '2.2rem' }}>
                Ready to Secure Your Documents?
              </h2>
              <p style={{ 
                fontSize: '18px', 
                color: '#6B7280', 
                marginBottom: '40px',
                lineHeight: '1.6'
              }}>
                Join thousands of families who trust DocVault with their most important documents. 
                Start your free trial today - no credit card required.
              </p>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <button className="btn-primary" style={{ 
                  fontSize: '18px', 
                  padding: '16px 40px',
                  boxShadow: '0 8px 30px rgba(37, 99, 235, 0.3)'
                }}>
                  Start Free Trial
                </button>
              </Link>
              <p style={{ 
                fontSize: '14px', 
                color: '#6B7280', 
                marginTop: '16px',
                margin: '16px 0 0'
              }}>
                ✓ 14-day free trial &nbsp;&nbsp; ✓ No setup fees &nbsp;&nbsp; ✓ Cancel anytime
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;