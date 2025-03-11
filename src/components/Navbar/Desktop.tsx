import SidebarForNavbar from "./SidebarForNavbar";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CgProfile } from "react-icons/cg";
import { useCallback, useState } from "react";
import debounce from "lodash.debounce";
import { AiOutlineSearch } from "react-icons/ai";

const Desktop = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  // Debounced input change handler
  const handleInputChange = useCallback(
    debounce((value: string) => {
      setQuery(value);
    }, 300),
    []
  );

  // Handle search execution when Enter is pressed
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  // Handle search execution when search button is clicked
  const handleSearchClick = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div>
      <div className="py-2 w-11/12 mx-auto text-white flex items-center justify-between">
        <div className="flex justify-center items-center gap-3">
          <Link to="/" className="text-4xl font-semibold">
            Aidasx
          </Link>
        </div>

        {/* Search Input */}
        <div className="relative flex items-center border border-gray-300 rounded-md pl-1 bg-white">
          <input
            type="text"
            placeholder="Search articles..."
            className="outline-none py-1 px-2 text-white w-64"
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSearchClick} className="text-black p-1">
            <AiOutlineSearch className="text-xl" />
          </button>
        </div>

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
