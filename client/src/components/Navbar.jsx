import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import axios from "axios";

const Navbar = () => {
  const { user, cart, setUser } = useAppContext();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/user/logout", {}, { withCredentials: true });
    } catch {}
    setUser(null);
  };

  return (
    <nav
      className="px-6 py-3 flex justify-between items-center shadow-md"
      style={{ backgroundColor: "#D7CCC8", color: "#4E342E" }}
    >
      <Link to="/" className="font-bold text-lg">
        E-Shop
      </Link>
      <div className="flex gap-4 items-center">
        <Link
          to="/"
          className="px-3 py-1 rounded hover:bg-[#A1887F] hover:text-white transition-colors font-bold"
        >
          Home
        </Link>
        <Link
          to="/cart"
          className="px-3 py-1 rounded hover:bg-[#A1887F] hover:text-white transition-colors font-bold"
        >
          Cart ({cart.length})
        </Link>
        <Link
          to="/orders"
          className="px-3 py-1 rounded hover:bg-[#A1887F] hover:text-white transition-colors font-bold"
        >
          Orders
        </Link>
        {user ? (
          <button
            onClick={handleLogout}
            className="px-3 py-1 rounded bg-[#A1887F] text-white hover:bg-[#8D6E63] transition-colors font-bold"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="px-3 py-1 rounded hover:bg-[#A1887F] hover:text-white transition-colors font-bold"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-3 py-1 rounded hover:bg-[#A1887F] hover:text-white transition-colors font-bold"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
