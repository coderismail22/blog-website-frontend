import Desktop from "./Desktop";
import Mobile from "./Mobile";

const Navbar = () => {
  // TODO: Fix Search Bar & Date Filter is Coming On Top Of Navbar
  return (
    <div className="bg-black ">
      <div className="hidden lg:block">
        <Desktop />
      </div>
      <div className="lg:hidden">
        <Mobile />
      </div>
    </div>
  );
};

export default Navbar;
