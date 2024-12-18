import React, { useEffect, useState } from "react";
import { FaBarsStaggered, FaBlog } from "react-icons/fa6";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

const LoginNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const { user } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { link: "Home", path: "/HomeAfterLogin" },
    { link: "Rent Your Book", path: "/create-rent-listing" },
    { link: "Sell Your Book", path: "/create-listing" },
    { link: "Logout", path: "/login" },
  ];

  const menuItems = [
    { link: "Home", path: "/HomeAfterLogin" },
    { link: "See WishList", path: "/view_buy_wishlist" },
    { link: "View Cart", path: "/view_buy_cart" },
    { link: "See Rent WishList", path: "/view_rent_wishlist" },
    { link: "View Rent Cart", path: "/view_rent_cart" },
    { link: "Logout", path: "/Home" },
  ];

  return (
    <header
      className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${"bg-[#D2B48C]"}`}
    >
      <nav className="py-4 lg:px-24 px-4">
        <div className="flex justify-between items-center text-base gap-10">
          <Link className="text-4xl font-bold text-coffee flex items-center gap-2">
            <FaBlog className="inline-block" />
            Echoes
          </Link>

          {/* nav items */}
          <ul className="md:flex space-x-12 hidden">
            {navItems.map(({ link, path }) => (
              <Link
                key={path}
                to={path}
                className="block text-base text-black uppercase cursor-pointer hover:text-blue-700"
              >
                {link}
              </Link>
            ))}
          </ul>

          <div className="space-x-4 flex items-center relative">
            <img
              src={`http://localhost:3002${user.image}`}
              alt="Profile"
              className="hidden lg:block w-8 h-8 rounded-full"
            />

            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <FaBarsStaggered className="w-5 hover:text-blue-300" />
            </button>

            {/* Mobile Dropdown */}
            {isMenuOpen && (
              <div className="absolute top-full left-0 bg-blue-300 py-4 px-6 space-y-2">
                {" "}
                {/* Adjusted padding for wider menu */}
                {menuItems.map(({ link, path }) => (
                  <Link
                    key={path}
                    to={path}
                    className="block text-base text-white uppercase cursor-pointer hover:bg-blue-400 py-2 px-4" // Added padding for spacing between items
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default LoginNavbar;
