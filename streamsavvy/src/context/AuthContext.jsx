import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Check localStorage for existing user upon initialization
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      console.error("Could not parse user from localStorage", e);
      return null;
    }
  });

  const login = (email, password) => {
    // Mock authentication: Hardcoded check against db.json user (id: 1)
    if (email === 'test@test.com' && password === '123') {
      const mockUser = { id: 1, name: 'Punnam' }; // Use the stored name if needed
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      toast.success("Login Successful!");
      return true;
    } else {
      toast.error("Invalid credentials.");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info("Logged out successfully.");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);