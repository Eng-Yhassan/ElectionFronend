import { TextAlignStart, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [role, setRole] = useState(null);
    const navigate = useNavigate();

    // Hubinta role-ka user-ka
    useEffect(() => {
        if (localStorage.getItem("admin")) setRole("admin");
        else if (localStorage.getItem("candidate")) setRole("candidate");
        else if (localStorage.getItem("voter")) setRole("voter");
    }, []);

    const handleLinkClick = () => setMenuOpen(false);

    // Logout function oo refresh sameeya kadibna home u celinaya
    const handleLogout = () => {
        localStorage.clear();
        setRole(null);
        navigate("/");
        window.location.reload(); // refresh page
    };

    return (
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg md:flex md:justify-between md:px-20">
            {/* Logo & Hamburger */}
            <div className="flex justify-between items-center p-4">
                <Link to="/">
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
                {/* Home & About - Had iyo jeer muuqda */}
                <li className="flex items-center gap-2 py-2 cursor-pointer hover:text-yellow-400 transition transform hover:scale-105">
                    <Link to="/" onClick={handleLinkClick}>
                        Home
                    </Link>
                </li>
                <li className="flex items-center gap-2 py-2 cursor-pointer hover:text-yellow-400 transition transform hover:scale-105">
                    <Link to="/about" onClick={handleLinkClick}>
                        About
                    </Link>
                </li>

                {/* Candidates Link - kaliya muuqda haddii user aanu voter ahayn */}
                {role == "voter" && (
                    <li className="flex items-center gap-2 py-2 cursor-pointer hover:text-yellow-400 transition transform hover:scale-105">
                        <Link to="/candidates" onClick={handleLinkClick}>
                            Candidates
                        </Link>
                    </li>
                )}

                {/* Role specific buttons */}
                {role === "candidate" && (
                    <li className="py-2">
                        <Link to="/candidateHome">
                            <button className="bg-white text-blue-900 w-full md:w-auto px-8 py-1 rounded-[8px] hover:bg-yellow-400 hover:text-white transition">
                                Profile
                            </button>
                        </Link>
                    </li>
                )}

                {role === "admin" && (
                    <li className="py-2">
                        <Link to="/adminPanel">
                            <button className="bg-white text-blue-900 w-full md:w-auto px-8 py-1 rounded-[8px] hover:bg-yellow-400 hover:text-white transition">
                                Admin Panel
                            </button>
                        </Link>
                    </li>
                )}

                {/* Logout button - Had iyo jeer muuqda haddii user login yahay */}
                {role && (
                    <li className="py-2">
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 text-white w-full md:w-auto px-8 py-1 rounded-[8px] hover:bg-red-700 transition"
                        >
                            Logout
                        </button>
                    </li>
                )}

                {/* Login Button - Muuqda haddii user login la’ yahay */}
                {!role && (
                    <li className="py-2">
                        <Link to="/login">
                            <button className="bg-white text-blue-900 w-full md:w-auto px-12 py-1 rounded-[8px] hover:bg-yellow-400 hover:text-white transition">
                                Login
                            </button>
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Header;
