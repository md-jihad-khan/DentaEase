import axios from "axios";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER}/jwt`, {
        email,
        password,
      });
      const token = response.data.token;

      // Store JWT in cookies
      Cookies.set("admin_token", token, { expires: 1 }); // Expires in 1 day

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You have successfully logged in!",
      }).then(() => {
        // Navigate to the dashboard after the alert is closed
        navigate("/dashboard");
      });
    } catch (error) {
      // Show error message
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password. Please try again.",
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 space-y-3 rounded-xl  ">
      <h1 className="text-2xl gradient-text font-bold text-center mt-10">
        Admin Login
      </h1>

      <div>
        <form className="space-y-6 min-h-[100vh]" onSubmit={handleLogin}>
          <div className="space-y-1 text-sm">
            <label className="block ">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="input w-full text-gray-800 border-cyan-500 border "
            />
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="password" className="block">
              Password
            </label>
            <div className="flex items-center relative">
              <span
                className="cursor-pointer absolute right-4"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                className="input w-full text-gray-800 border-cyan-500 border "
              />
            </div>
          </div>
          <button className="block w-full p-3 text-center rounded-sm gradient-bg bg-sky-500 text-white">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
