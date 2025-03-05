import { BiCategory } from "react-icons/bi";
import { FaHome, FaRegListAlt,FaRegEdit } from "react-icons/fa";

export const sidebarData = {
  admin: [
    { label: "Home", path: "/dashboard/admin/profile", icon: FaHome },
    {
      label: "Add Category",
      path: "/dashboard/admin/add-category",
      icon: BiCategory,
    },
    {
      icon: FaRegEdit ,
      label: "New Post",
      path: "/dashboard/admin/add-service",
    },
    {
      icon: FaRegListAlt,
      label: "All Posts",
      path: "/dashboard/admin/edit-service",
    },
  ],
};
