
import React from "react";

const Navbar: React.FC = () => {
  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 top-6 w-[95%] md:w-[90%] bg-white rounded-xl shadow-md z-20">
      <div className="flex items-center justify-between px-4 md:px-8 py-3">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <img
            src='https://tse1.mm.bing.net/th/id/OIP.YS7p3dw3nsYlvey2zGo6wQHaHy?rs=1&pid=ImgDetMain&o=7&rm=3'
            alt="Logo"
            className="h-8 md:h-10 object-contain"
          />
          {/* Menu Links */}
          <nav className="hidden md:flex gap-20 text-sm text-gray-600">
            <a href="#" className="hover:text-gray-800">
              Biscuits
            </a>
            <a href="#" className="hover:text-gray-800">
              Snacks
            </a>
            <a href="#" className="hover:text-gray-800">
              Beverages
            </a>
            <a href="#" className="hover:text-gray-800">
              Chips
            </a>
          </nav>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <button className="hidden md:inline-block px-4 py-2 bg-sky-600 text-white rounded-full font-medium shadow hover:bg-sky-700 transition">
            Search 
          </button>

          {/* Placeholder icons */}
          <div className="flex items-center gap-3 text-gray-600">
            <button className="p-2 hover:bg-gray-100 rounded-full">🛒</button>
            <button className="p-2 hover:bg-gray-100 rounded-full">👤</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
