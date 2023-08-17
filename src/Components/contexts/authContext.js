import React, { useEffect } from 'react'
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);

};


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))); // Get user data from localStorage
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user)); // Store user data in localStorage
    localStorage.setItem('token', token);
  }, [user, token]);
  const login = (userData, token) => {
    setUser(userData);
    setToken(token)

  };
  const logout = () => {
    setUser(null);
    setToken(null);
    console.log("log out ", user);
  };


  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>

  );
};

