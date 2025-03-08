import { Drawer, Sidebar, TextInput } from "flowbite-react";
import { useState } from "react";
import {
  HiChartPie,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
  HiLogin,
  HiPencil,
  HiSearch,
  HiShoppingBag,
  HiUsers,
} from "react-icons/hi";
import { MdOutlineMenu } from "react-icons/md";

const SidebarForNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
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
                <form className="pb-3 md:hidden">
                  <TextInput
                    icon={HiSearch}
                    type="search"
                    placeholder="Search"
                    required
                    size={32}
                    className="text-white"
                  />
                </form>
                <Sidebar.Items className="text-white">
                  <Sidebar.ItemGroup className="text-white">
                    <Sidebar.Item
                      href="/"
                      icon={HiChartPie}
                      className="text-white"
                    >
                      Dashboard
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="/e-commerce/products"
                      icon={HiShoppingBag}
                      className="text-white"
                    >
                      Products
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="/users/list"
                      icon={HiUsers}
                      className="text-white"
                    >
                      Users list
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="/authentication/sign-in"
                      icon={HiLogin}
                      className="text-white"
                    >
                      Sign in
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="/authentication/sign-up"
                      icon={HiPencil}
                      className="text-white"
                    >
                      Sign up
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>
                  <Sidebar.ItemGroup className="text-white">
                    <Sidebar.Item
                      href="https://github.com/themesberg/flowbite-react/"
                      icon={HiClipboard}
                      className="text-white"
                    >
                      Docs
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="https://flowbite-react.com/"
                      icon={HiCollection}
                      className="text-white"
                    >
                      Components
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="https://github.com/themesberg/flowbite-react/issues"
                      icon={HiInformationCircle}
                      className="text-white"
                    >
                      Help
                    </Sidebar.Item>
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
