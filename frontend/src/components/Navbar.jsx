import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Hamburger from "hamburger-react";

function Navbar() {
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-amber-50 border  border-gray-400 rounded-full backdrop-blur-lg text-gray-700 py-1 px-2  w-full md:px-4 md:py-3">
        {/* Top bar */}
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-xl">MyApp</h1>

          {/* Hamburger (mobile only) */}
          <div className="md:hidden">
            <Hamburger toggled={isOpen} toggle={setOpen} />
          </div>

          {/* Desktop menu */}
          <ul className="hidden  cursor-pointer md:flex gap-6">
            <li className="hover:text-gray-950" onClick={() => navigate("/")}>
              Home
            </li>
            <li
              className="hover:text-gray-950"
              onClick={() => navigate("/about")}
            >
              About
            </li>
            <li className="hover:text-gray-950">Contact</li>
          </ul>
        </div>

        {/* Mobile menu */}
      </div>
      {isOpen && (
        <ul className="flex flex-col text-grey-700  animate__animated animate__fadeIn   mt-4 gap-3 md:hidden">
          <li className="border-b pb-2" onClick={() => navigate("/")}>
            Home
          </li>
          <li className="border-b pb-2" onClick={() => navigate("/about")}>
            About
          </li>
          <li className="border-b pb-2">Contact</li>
        </ul>
      )}
    </>
  );
}

export default Navbar;
