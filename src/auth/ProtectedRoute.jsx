import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./../auth/Auth";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
