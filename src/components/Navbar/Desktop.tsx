import SidebarForNavbar from "./SidebarForNavbar";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CgProfile } from "react-icons/cg";
import { AiOutlineSearch } from "react-icons/ai";

const Desktop = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  // Redirect to the search page when the search icon is clicked
  const handleSearchClick = () => {
    navigate("/search");
  };

  return (
    <div>
      <div className="py-2 w-11/12 mx-auto text-white flex items-center justify-between">
        <div className="flex justify-center items-center gap-3">
          <SidebarForNavbar />
          <Link to="/" className="text-4xl font-semibold">
            Aidasx
          </Link>
        </div>
        {/* Search Icon */}
        <button
          onClick={handleSearchClick}
          className="text-white p-2 flex  gap-2 "
        >
          <AiOutlineSearch className="text-2xl" /> Search Articles
        </button>
        <div className="flex items-center gap-3">
          {user ? (
            <Link to="/dashboard">
              <CgProfile className="text-2xl" />
            </Link>
          ) : (
            <Link to="/login">Sign In</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Desktop;
