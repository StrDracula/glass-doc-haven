import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock user roles
  const USER_ROLES = {
    ADMIN: 'admin',
    USER: 'user',
    FAMILY_MEMBER: 'family_member'
  };

  useEffect(() => {
    // Check for existing auth token/session
    const token = localStorage.getItem('docvault_token');
    const userData = localStorage.getItem('docvault_user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('docvault_token');
        localStorage.removeItem('docvault_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on email
      let mockUser = {
        id: 1,
        email: email,
        name: email === 'admin@docvault.com' ? 'Admin User' : 'John Doe',
        role: email === 'admin@docvault.com' ? USER_ROLES.ADMIN : USER_ROLES.USER,
        avatar: null,
        createdAt: new Date().toISOString()
      };

      const token = 'mock_jwt_token_' + Date.now();
      
      localStorage.setItem('docvault_token', token);
      localStorage.setItem('docvault_user', JSON.stringify(mockUser));
      
      setUser(mockUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: Date.now(),
        email: email,
        name: name,
        role: USER_ROLES.USER,
        avatar: null,
        createdAt: new Date().toISOString()
      };

      const token = 'mock_jwt_token_' + Date.now();
      
      localStorage.setItem('docvault_token', token);
      localStorage.setItem('docvault_user', JSON.stringify(mockUser));
      
      setUser(mockUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('docvault_token');
    localStorage.removeItem('docvault_user');
    setUser(null);
  };

  const isAdmin = () => {
    return user && user.role === USER_ROLES.ADMIN;
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAdmin,
    isAuthenticated,
    USER_ROLES
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};