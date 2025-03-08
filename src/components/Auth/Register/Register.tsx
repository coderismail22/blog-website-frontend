import { Link, useNavigate } from "react-router-dom";
import AppForm from "../../CustomForm/AppForm";
import AppInput from "../../CustomForm/AppInput";
import AppInputPassword from "../../CustomForm/AppInputPassword";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/slices/authSlice";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "@/api/axiosInstance";
import { handleAxiosError } from "@/utils/handleAxiosError";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    setError("");
    console.log("🚀 ~ Register ~ data:", data);

    try {
      const response = await axiosInstance.post("/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      const accessToken = response?.data?.data?.accessToken;
      const refreshToken = response?.data?.data?.refreshToken;

      // Store tokens
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Decode user token
      const decodedUser = jwtDecode<{ role: string; email: string }>(
        accessToken
      );
      const actualUserData = {
        role: decodedUser?.role as string,
        email: decodedUser?.email as string,
      };

      dispatch(login({ user: actualUserData }));
      navigate("/dashboard");
    } catch (err: any) {
      console.log("🚀 ~ onSubmit ~ err:", err);
      handleAxiosError(err, "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black">
      <Helmet>
        <title>Aisasx | Register</title>
      </Helmet>
      <div className="w-full max-w-sm p-8 bg-gray-800 shadow-lg rounded-lg border border-gray-700">
        <div className="flex flex-col items-center justify-center mb-2">
          <Link to="/">
            <img className="w-20" src="/logo.png" alt="Logo" />
          </Link>
        </div>
        <h2 className="text-xl font-bold text-center text-gray-100 mb-4">
          Create Your Account
        </h2>

        {error && (
          <p className="text-red-500 text-center text-sm mb-4">{error}</p>
        )}

        <AppForm
          onSubmit={onSubmit}
          buttonText={loading ? "Registering..." : "Register"}
          submitButtonStyles="bg-blue-500 hover:bg-blue-600 text-white"
          defaultValues={{ name: "", email: "", password: "" }}
        >
          <div className="mb-4">
            <AppInput
              className="w-full mb-4 bg-[#2D394B] border border-gray-600 text-gray-300 placeholder-gray-400 focus:ring focus:ring-blue-500 focus:border-blue-500"
              name="name"
              label="Full Name"
              labelStyles="text-white"
              placeholder="Enter your full name"
            />
          </div>

          <div className="mb-4">
            <AppInput
              className="w-full mb-4 bg-[#2D394B] border border-gray-600 text-gray-300 placeholder-gray-400 focus:ring focus:ring-blue-500 focus:border-blue-500"
              name="email"
              label="Email"
              labelStyles="text-white"
              placeholder="Enter your email"
            />
          </div>

          <AppInputPassword
            className="w-full mb-4 bg-gray-700 border border-gray-600 text-gray-300 placeholder-gray-400 focus:ring focus:ring-blue-500 focus:border-blue-500"
            name="password"
            label="Password"
            labelStyles="text-white"
            placeholder="Enter your password"
          />

          <Link to="/login" className="block text-blue-400 text-center">
            Already have an account?{" "}
            <span className="underline underline-offset-4">Login here.</span>
          </Link>
        </AppForm>
      </div>
    </div>
  );
};

export default Register;
