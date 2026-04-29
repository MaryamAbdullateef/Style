import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-red-500">StyleHub</h1>

      <ul className="flex gap-6 text-sm md:text-base">
        <li><Link to="/categories">Categories</Link></li>
        <li><Link to="/shop">Shop Now</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;