import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Loader/Loader";
import UserTable from "./UserTable";
import { userColumns } from "./userColumns";
import axiosInstance from "@/api/axiosInstance";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/users");
        setUsers(response.data.data);
      } catch (err) {
        console.error("API Request Error:", err);
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Delete user
  const handleDelete = async (userId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`/users/${userId}`);
          setUsers(users.filter((user) => user._id !== userId));
          Swal.fire("Deleted!", "User deleted successfully!", "success");
        } catch (error) {
          Swal.fire("Error!", "Failed to delete user.", "error");
        }
      }
    });
  };

  // Edit user
  const handleEdit = (userId: string) => {
    navigate(`/dashboard/admin/user-management/edit-user/${userId}`);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div className="container mx-auto py-2">
      <h1 className="text-2xl font-bold mb-6 text-center underline underline-offset-8 text-blue-500">
        All Users
      </h1>
      <div className="my-4 flex justify-end">
        <Button
          onClick={() =>
            navigate("/dashboard/admin/user-management/create-user")
          }
          className="bg-gradient-to-tr from-[#6a82fb] to-[#fc5c7d] hover:from-[#fc5c7d] hover:to-[#6a82fb]"
        >
          Add User
        </Button>
      </div>
      {users.length > 0 && (
        <UserTable
          data={users}
          columns={userColumns(handleEdit, handleDelete)}
        />
      )}
    </div>
  );
};

export default AllUsers;
