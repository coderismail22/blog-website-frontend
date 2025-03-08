import { MdOutlineMail } from "react-icons/md";
import SidebarForNavbar from "./SidebarForNavbar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/slices/authSlice";

const Desktop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      <div className="py-2 w-11/12 mx-auto text-white flex items-center justify-between">
        <div className="flex justify-center items-center gap-3">
          <SidebarForNavbar />
          <p className="">Subscribe to Newsletter</p>
          <MdOutlineMail className="text-2xl" />
        </div>
        <Link to="/" className="text-4xl font-semibold">
          Forbes
        </Link>
        <div className="flex items-center gap-3">
          {user ? (
            <Link to="/dashboard">Dashboard</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Desktop;
