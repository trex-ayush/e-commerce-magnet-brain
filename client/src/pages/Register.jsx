import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import axios from "axios";

const Register = () => {
  const { setUser } = useAppContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "User",
    adminKey: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/register",
        formData,
        { withCredentials: true }
      );
      setUser(res.data.user);
      navigate("/"); 
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#EFEBE9" }}>
      <div
        className="p-8 max-w-md w-full rounded-xl shadow-lg"
        style={{ backgroundColor: "#D7CCC8", border: "2px solid #A1887F" }}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Register</h2>
        {error && <p className="text-red-700 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 rounded-lg text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2"
            style={{ backgroundColor: "#EFEBE9", border: "1px solid #A1887F", ringColor: "#A1887F" }}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 rounded-lg text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2"
            style={{ backgroundColor: "#EFEBE9", border: "1px solid #A1887F", ringColor: "#A1887F" }}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-3 rounded-lg text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2"
            style={{ backgroundColor: "#EFEBE9", border: "1px solid #A1887F", ringColor: "#A1887F" }}
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2"
            style={{ backgroundColor: "#EFEBE9", border: "1px solid #A1887F", ringColor: "#A1887F" }}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
          {formData.role === "Admin" && (
            <input
              type="text"
              name="adminKey"
              placeholder="Admin Key"
              value={formData.adminKey}
              onChange={handleChange}
              className="p-3 rounded-lg text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2"
              style={{ backgroundColor: "#EFEBE9", border: "1px solid #A1887F", ringColor: "#A1887F" }}
              required
            />
          )}
          <button
            type="submit"
            className="p-3 rounded-lg font-semibold text-white transition-colors"
            style={{ backgroundColor: "#A1887F", border: "1px solid #8D6E63" }}
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-gray-800">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-gray-700 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
