import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getCurrentUser } from "../utils/userService";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get("jwt"));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (token) {
          console.log("Checking auth with token:", token);
          const userData = await getCurrentUser();
          console.log("User data received:", userData);
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          console.log("No token found");
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        Cookies.remove("jwt");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [token]);
  
  const login = (jwtToken) => {
    setToken(jwtToken);
    Cookies.set("jwt", jwtToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    Cookies.remove("jwt");
  };

  if (loading) {
    return <div>Loading...</div>; // يمكنك إضافة loading component هنا
  }

  return (
    <AuthContext.Provider value={{ 
      token, 
      user,
      isAuthenticated, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}