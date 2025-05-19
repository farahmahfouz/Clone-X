import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getCurrentUser } from "../utils/userService";
import Cookies from "js-cookie";
import LogoX from '../icons/LogoX';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get("jwt"));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (token) {
          const userData = await getCurrentUser();
          setUser(userData);
          setIsAuthenticated(true);
        } else {
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
    setError(""); 
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    Cookies.remove("jwt");
  };

  if (loading) {
    return <div className="bg-black min-h-screen flex justify-center items-center">
      <LogoX width={300} height={300} />
    </div>;
  }

  return (
    <AuthContext.Provider value={{
      token,
      user,
      isAuthenticated,
      login,
      logout,
      error,
      setError
    }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}