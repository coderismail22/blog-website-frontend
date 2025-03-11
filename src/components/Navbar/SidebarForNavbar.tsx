import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/slices/authSlice";
import { HiOutlineMenu, HiChartPie, HiLogin } from "react-icons/hi";
import { LogOut, LogOutIcon } from "lucide-react";
import Loader from "../Loader/Loader";
import axiosInstance from "@/api/axiosInstance";

const SidebarForNavbar = () => {
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setIsOpen(false);
  };

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/categories");
        const allCategories = response.data.data;
        setCategories(allCategories);
      } catch (err) {
        console.error("API Request Error:", err);
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (error) {
    return <div>Something went wrong...</div>;
  }
  return (
    <div className="flex">
      {/* Mobile Sidebar (Drawer) */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="text-white text-2xl">
            <HiOutlineMenu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-black text-white w-64">
          <div className="p-4">
            <h2 className="text-xl font-bold">Menu</h2>
            <ul className="mt-4 space-y-2">
              {user ? (
                <>
                  <li className="">
                    <Link
                      to="/dashboard"
                      className="w-full  gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <Button variant="secondary" className="w-25">
                        <HiChartPie className="text-lg" />
                        Dashboard
                      </Button>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="w-full gap-2"
                      onClick={() => {
                        setIsOpen(false);
                        handleLogout();
                      }}
                    >
                      <Button variant="secondary" className="w-30">
                        <LogOutIcon className="text-lg" />
                        Logout {"     "}
                      </Button>
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    to="/login"
                    className="w-full gap-2 mb-5 "
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <Button variant="secondary">
                      <HiLogin />
                      Login
                    </Button>
                  </Link>
                </li>
              )}
              <p className="font-bold tracking-widest ">Categories:</p>
              {loading ? (
                <Loader />
              ) : (
                categories.map((category) => (
                  <li key={category._id} className="py-1 px-1">
                    <Link
                      to={`/all-posts/${encodeURIComponent(category.name)}`}
                      className="w-full flex items-center gap-2 hover:text-blue-400"
                      onClick={() => setIsOpen(false)}
                    >
                      • {category.name}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SidebarForNavbar;
