import { MdOutlineMail } from "react-icons/md";
import SidebarForNavbar from "./SidebarForNavbar";
import { Link } from "react-router-dom";

const Desktop = () => {
  return (
    <div>
      <div className="py-2 w-11/12 mx-auto text-white flex items-center justify-between">
        <div className="flex justify-center items-center gap-3">
          <SidebarForNavbar />
          <p className="">Subscribe to Newsletter</p>
          <MdOutlineMail className="text-2xl" />
        </div>
        <Link to="/" className="text-4xl font-semibold font-Playfair">
          Forbes
        </Link>
        <div className="flex items-center gap-3">
          {/* <Button className="bg-red-600 text-lg font-bold">
            Subscribe: Less than $1.50/wk
          </Button> */}
          <Link to="/login">Sign In</Link>
          {/* <FiSearch className="text-2xl" /> */}
        </div>
      </div>
    </div>
  );
};

export default Desktop;
