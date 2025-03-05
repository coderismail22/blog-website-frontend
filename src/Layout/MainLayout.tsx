import MoveToTop from "@/components/MoveToTop/MoveToTop";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import Footer from "@/components/Shared/Footer";
import Navbar from "@/components/Shared/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <div className="">
        <Outlet />
      </div>
      <Footer />
      <MoveToTop />
    </>
  );
};

export default MainLayout;
