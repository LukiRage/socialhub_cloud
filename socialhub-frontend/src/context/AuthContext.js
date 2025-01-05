import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const id = localStorage.getItem('userId');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetch(`http://localhost:8080/api/user/${id}`, {
        headers: {
          'Authorization': token
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }
        return response.json();
      })
      .then(userData => {
        // userData zawiera obiekt użytkownika pobrany z bazy
        setCurrentUser(userData);
      })
      .catch(err => console.error('Error fetching user:', err));
    }
  }, [id]);

  const login = (userData) => {
    setCurrentUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
