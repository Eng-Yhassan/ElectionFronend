import React, { useState } from "react";
import { Menu, TextAlignStart, X } from "lucide-react"; // optional icons for mobile
import { Link } from "react-router-dom";

const CandidateHeader = ({ candidate }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const handleLinkClick = () => {
        setMenuOpen(false);
    };
    return (
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg md:flex md:justify-between md:px-20">

            {/* Logo & Hamburger */}
            <div className="flex justify-between items-center p-4">
                <Link to="/candidateHome">
                    <div className="text-3xl font-bold">Bu Election System</div>
                </Link>
                <button
                    className="md:hidden focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={30} /> : <TextAlignStart size={30} />}
                </button>
            </div>

            {/* Menu Items */}
            <ul
                className={`md:flex md:flex-row md:items-center text-2xl md:justify-start gap-4 md:gap-6 overflow-hidden transition-all duration-500 ease-in-out ${menuOpen ? "max-h-96" : "max-h-0 md:max-h-full"
                    } flex flex-col px-4 md:px-0`}
            >
                <li className="flex items-center gap-2 py-2 cursor-pointer hover:text-yellow-400 transition transform hover:scale-105">
                    <Link to="/candidateHome" onClick={handleLinkClick}>Profile</Link>
                </li>
            </ul>
        </div>
    );
};

export default CandidateHeader