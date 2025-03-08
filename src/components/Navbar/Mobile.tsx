import SidebarForNavbar from "./SidebarForNavbar";
import { Link } from "react-router-dom";

const Mobile = () => {
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
            {/* <Button className="bg-red-600 text-sm font-bold">
              Join: $1.50/wk
            </Button> */}
            <p className="text-sm">Sign In</p>
            {/* <FiSearch className="text-xl" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mobile;
