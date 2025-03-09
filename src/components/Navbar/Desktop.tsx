import { MdOutlineMail } from "react-icons/md";
import SidebarForNavbar from "./SidebarForNavbar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Desktop = () => {
  const user = useSelector((state: RootState) => state.auth.user);

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
