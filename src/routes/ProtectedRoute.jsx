


import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{
          message: "Please login or register to access this page."
        }}
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;
