import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
// import Swal from "sweetalert2";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const user = useSelector((state: RootState) => state?.auth?.user);
  const role = user?.role;
  const email = user?.email;

  // Redirect to login if accessToken doesn't exist
  if (!role || !email) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
