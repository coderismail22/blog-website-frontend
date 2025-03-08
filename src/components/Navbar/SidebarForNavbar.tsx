import { Drawer, Sidebar } from "flowbite-react";
import { useState } from "react";
import { HiChartPie, HiLogin } from "react-icons/hi";
import { MdOutlineMenu } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
const SidebarForNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <>
      <div className="">
        <MdOutlineMenu
          onClick={() => setIsOpen(true)}
          className="text-white text-3xl cursor-pointer"
        />
      </div>
      <Drawer
        backdrop={false}
        open={isOpen}
        onClose={handleClose}
        className="bg-black"
      >
        <Drawer.Header
          title="MENU"
          titleIcon={() => <></>}
          className="text-white"
        />
        <Drawer.Items>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="text-white [&>div]:bg-transparent [&>div]:p-0"
          >
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                {/* <form className="pb-3 md:hidden">
                  <TextInput
                    icon={HiSearch}
                    type="search"
                    placeholder="Search"
                    required
                    size={32}
                    className="text-white"
                  />
                </form> */}
                <Sidebar.Items className="text-white">
                  <Sidebar.ItemGroup className="text-white">
                    {user ? (
                      <div>
                        <Sidebar.Item
                          href="/dashboard"
                          icon={HiChartPie}
                          className="text-white hover:text-black"
                        >
                          Dashboard
                        </Sidebar.Item>
                        <Sidebar.Item
                          icon={LogOut}
                          className="text-white hover:text-black"
                          onClick={handleLogout}
                        >
                          Logout
                        </Sidebar.Item>
                      </div>
                    ) : (
                      <Sidebar.Item
                        href="/login"
                        icon={HiLogin}
                        className="text-white hover:text-black"
                      >
                        Sign in
                      </Sidebar.Item>
                    )}
                  </Sidebar.ItemGroup>
                </Sidebar.Items>
              </div>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </>
  );
};

export default SidebarForNavbar;
