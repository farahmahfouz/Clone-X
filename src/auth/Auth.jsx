import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? storedUser : null;
  });
  
  
  // const login = (jwtToken) => {
  //   setToken(jwtToken);
  //   localStorage.setItem("token", jwtToken); 
  // };
  const login = (token, user) => {
    setToken(token);
    setCurrentUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  // const logout = () => {
  //   setToken(null);
  //   localStorage.removeItem("token"); 
  // };


  const logout = () => {
    setToken(null);
    setCurrentUser(null); 
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ token,currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}