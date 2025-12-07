import { Navigate } from "react-router-dom";
import NotFoundPage from "../Pages/NotFoundPage";

const PrivateRoute = ({ children }) => {
  // OPTION 1: Normal authentication check
  const isAuth = localStorage.getItem("isAuth");
  return isAuth ? children : <NotFoundPage/>;
  
  // OPTION 2: Bypass authentication for testing (uncomment to use)
  // return children; 
};

export default PrivateRoute;
