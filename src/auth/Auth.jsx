import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  
  
  const login = (jwtToken) => {
    setToken(jwtToken);
    localStorage.setItem("token", jwtToken); 
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token"); 
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}