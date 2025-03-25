import { useSelector } from "react-redux";
import SidebarForNavbar from "./SidebarForNavbar";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "@/redux/store";
import { CgProfile } from "react-icons/cg";
import { AiOutlineSearch } from "react-icons/ai";

const Mobile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  // Redirect to the search page when the search icon is clicked
  const handleSearchClick = () => {
    navigate("/search");
  };

  return (
    <div>
      <div className="py-2 w-11/12 mx-auto  flex items-center justify-between">
        <div className="flex justify-center items-center gap-3">
          <SidebarForNavbar />
          <Link to="/" className="text-xl font-semibold">
            Aidasx
          </Link>
        </div>

        {/* Search Icon */}
        <button
          onClick={handleSearchClick}
          className="text-white p-2 flex  gap-2 "
        >
          <AiOutlineSearch className="text-2xl" /> Search 
        </button>

        <div className="flex items-center gap-3">
          {user ? (
            <Link to="/dashboard">
              <CgProfile className="text-2xl text-white" />
            </Link>
          ) : (
            <Link to="/login">Sign In</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mobile;
