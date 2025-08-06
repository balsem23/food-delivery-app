import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-black text-white px-8 py-4 flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold">🍕 Pizzza</div>
      <nav className="space-x-6 text-lg font-medium">
        <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
        <Link to="/menu" className="hover:text-yellow-400 transition">Menu</Link>
        <Link to="/cart" className="hover:text-yellow-400 transition inline-flex items-center">
          <FaShoppingCart className="mr-1" /> Cart
        </Link>
      </nav>
    </header>
  );
}

export default Header;
