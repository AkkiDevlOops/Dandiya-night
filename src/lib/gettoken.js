  // context/AuthContext.js
  "use client";

  import React, { createContext, useContext, useState, useEffect } from 'react';

  const AuthContext = createContext(null);

  export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 💡 Helper function to call your new api/auth/me route
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/parsecookie', { method: 'GET' });
        const data = await res.json();

        if (res.ok && data.authenticated) {
          setUser(data.user); // Store user data globally
        } else {
          setUser("Token couldnt be found");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    // Run the helper function immediately when the application loads
    useEffect(() => {
      checkAuth();
    }, []);

    return (
      <AuthContext.Provider value={{ user, loading, checkAuth }}>
        {!loading && children}
      </AuthContext.Provider>
    );
  };

  // 💡 Custom hook helper to grab auth data on any Page component
  export const useAuth = () => useContext(AuthContext);
