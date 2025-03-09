import { useSelector } from "react-redux";
import SidebarForNavbar from "./SidebarForNavbar";
import { Link } from "react-router-dom";
import { RootState } from "@/redux/store";

const Mobile = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div>
      <div>
        <div className="py-2 w-11/12 mx-auto text-white flex items-center justify-between">
          <div className="flex justify-center items-center gap-3">
            <SidebarForNavbar />
            <Link to="/" className="text-xl">
              Forbes
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              {user ? (
                <Link to="/dashboard">Dashboard</Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mobile;
