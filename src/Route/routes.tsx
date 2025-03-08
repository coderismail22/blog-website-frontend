import MainLayout from "@/Layout/MainLayout";
import Home from "@/Pages/Home";
import NotFoundPage from "@/Pages/NotFoundPage";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "@/Pages/Dashboard/Dashboard/Dashboard";
import Login from "@/components/Auth/Login/Login";
import AdminProfile from "@/Pages/Dashboard/Admin/AdminProfile/AdminProfile";
import Categories from "@/Pages/Dashboard/Admin/Categories/Categories";
import PublishNewPost from "@/Pages/Dashboard/Admin/PublishNewPost/PublishNewPost";
import MyBlogPosts from "@/Pages/Dashboard/Admin/MyBlogPosts/MyBlogPosts";
import PostDetails from "@/components/PostDetails/PostDetails";
import AllPosts from "@/Pages/AllPosts/AllPosts";
import Register from "@/components/Auth/Register/Register";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
// import PublishNewBlogPost from "@/Pages/Dashboard/Admin/PublishNewPost/PublishNewBlogPost";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post-details/:slug",
        element: <PostDetails />,
      },
      {
        path: "/all-posts/:category",
        element: <AllPosts />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      // Role: Admin
      { path: "/dashboard/admin/profile", element: <AdminProfile /> },
      // { path: "/dashboard/admin/", element: <AdminProfile /> },
      { path: "/dashboard/admin/add-category", element: <Categories /> },
      { path: "/dashboard/admin/add-service", element: <PublishNewPost /> },
      { path: "/dashboard/admin/edit-service", element: <MyBlogPosts /> },
      // { path: "/dashboard/admin/blog-editor-new-post", element: <PublishNewBlogPost /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
