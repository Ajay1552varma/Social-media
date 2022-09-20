import { Navigate } from "react-router-dom";

const ProtectedPage = ({ children }) => {
  const auth = localStorage.getItem("jwt-auth");
  if (auth) {
    return <>{children}</>;
  }
  return <Navigate to="/auth/login" />;
};

export default ProtectedPage;
