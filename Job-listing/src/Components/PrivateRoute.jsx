import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // OPTION 1: Normal authentication check
  const isAuth = localStorage.getItem("isAuth");
  return isAuth ? children : <Navigate to="/login" />;
  
  // OPTION 2: Bypass authentication for testing (uncomment to use)
  // return children; 
};

export default PrivateRoute;
