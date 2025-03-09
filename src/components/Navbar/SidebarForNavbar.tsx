import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/slices/authSlice";
import { HiOutlineMenu, HiChartPie, HiLogin } from "react-icons/hi";
import { LogOut } from "lucide-react";

const SidebarForNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setIsOpen(false);
  };

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
                  <li>
                    <Button
                      variant="ghost"
                      className="w-full flex items-center gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <HiChartPie className="text-lg" />
                      Dashboard
                    </Button>
                  </li>
                  <li>
                    <Button
                      variant="ghost"
                      className="w-full flex items-center gap-2"
                      onClick={handleLogout}
                    >
                      <LogOut className="text-lg" />
                      Logout
                    </Button>
                  </li>
                </>
              ) : (
                <li>
                  <Button
                    variant="ghost"
                    className="w-full flex items-center gap-2"
                    onClick={() => {
                      navigate("/login");
                      setIsOpen(false);
                    }}
                  >
                    <HiLogin className="text-lg" />
                    Sign In
                  </Button>
                </li>
              )}
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SidebarForNavbar;
