import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import axios from "axios";

const Login = () => {
  const { setUser } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/login",
        { email, password },
        { withCredentials: true }
      );
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#EFEBE9" }}>
      <div
        className="p-8 max-w-md w-full rounded-xl shadow-lg"
        style={{ backgroundColor: "#D7CCC8", border: "2px solid #A1887F" }}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2"
            style={{ backgroundColor: "#EFEBE9", border: "1px solid #A1887F", ringColor: "#A1887F" }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2"
            style={{ backgroundColor: "#EFEBE9", border: "1px solid #A1887F", ringColor: "#A1887F" }}
            required
          />
          <button
            type="submit"
            className="p-3 rounded-lg font-semibold text-white transition-colors"
            style={{ backgroundColor: "#A1887F", border: "1px solid #8D6E63" }}
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-800">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-gray-700 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
