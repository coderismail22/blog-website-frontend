import MoveToTop from "@/components/MoveToTop/MoveToTop";
import Navbar from "@/components/Navbar/Navbar";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import Footer from "@/components/Shared/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {" "}
      {/* Full height layout */}
      <Navbar />
      <ScrollToTop />
      {/* Main content should take up remaining space */}
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer /> {/* Footer stays at bottom */}
      <MoveToTop />
    </div>
  );
};

export default MainLayout;
