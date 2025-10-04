import { ArrowDown, ChevronDown, ChevronUp, X } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isVotersOpen, setIsVotersOpen] = useState(false);
    const [isCandidatesOpen, setIsCandidatesOpen] = useState(false);
    const [isAdminOpen, setIsAdminOpen] = useState(false)
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const toggleVotersMenu = () => {
        setIsVotersOpen(!isVotersOpen);
    };

    const toggleCandidateMenu = () => {
        setIsCandidatesOpen(!isCandidatesOpen)
    }
    const toggleAdminMenu = () => {
        setIsAdminOpen(!isAdminOpen)
    }

    return (
        <>
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 bg-gray-800 text-white p-4 z-50 flex justify-between items-center">
                <Link to="/adminPanel">
                    <div className="text-xl font-bold">Admin Panel</div>
                </Link>
                <button
                    onClick={toggleMobileMenu}
                    className="p-2 rounded-md text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        {isMobileMenuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>
            </div>

            {/* Backdrop for mobile */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black opacity-50 z-40"
                    onClick={closeMobileMenu}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                bg-gray-800 text-white flex flex-col
                fixed top-0 left-0 z-40
                lg:w-64 lg:h-screen
                h-full
                transition-transform duration-300 ease-in-out
                ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                `}
            >
                {/* Desktop Header */}
                <Link to="/adminPanel">
                    <div className="hidden lg:block text-2xl font-bold p-6 border-b border-gray-700">
                        Admin Panel
                    </div>
                </Link>

                {/* Mobile Header inside sidebar */}
                <div className="lg:hidden flex justify-between items-center p-4 border-b border-gray-700">
                    <div className="text-xl font-bold">Admin Panel</div>
                    <button
                        onClick={closeMobileMenu}
                        className="p-2 rounded-md text-white hover:bg-gray-700"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Scrollable Links */}
                <div className="flex-1 overflow-y-auto">
                    <ul className="p-4 space-y-2 lg:text-2xl text-lg">
                        <li className="flex items-center gap-2 py-2 cursor-pointer hover:text-yellow-400 transition duration-200">
                            <Link
                                to="/"
                                onClick={closeMobileMenu}
                                className="w-full py-2"
                            >
                                Home
                            </Link>
                        </li>
                        <li className="flex items-center gap-2 py-2 cursor-pointer hover:text-yellow-400 transition duration-200">
                            <Link
                                to="/adminPanel"
                                onClick={closeMobileMenu}
                                className="w-full py-2"
                            >
                                Dashboard
                            </Link>
                        </li>

                        {/* Sub Pages of voters */}
                        <li className="flex flex-col">
                            <div
                                onClick={toggleVotersMenu}
                                className="flex items-center justify-between py-2 cursor-pointer hover:text-yellow-400 transition duration-200"
                            >
                                <span>Voters</span>
                                {isVotersOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                            </div>
                            {isVotersOpen && (
                                <ul className="pl-6 space-y-2">
                                    <li className="cursor-pointer hover:text-yellow-400 transition duration-200">
                                        <Link
                                            to="/allVoters"
                                            onClick={closeMobileMenu}
                                            className="block py-1"
                                        >
                                            All Voters
                                        </Link>
                                    </li>
                                    <li className="cursor-pointer hover:text-yellow-400 transition duration-200">
                                        <Link
                                            to="/registerVoters"
                                            onClick={closeMobileMenu}
                                            className="block py-1"
                                        >
                                            Register voter
                                        </Link>
                                    </li>
                                    {/* waxaad halkan ku dari kartaa subpages kale */}
                                </ul>
                            )}
                        </li>
                        {/* Sub Pages of Candidates */}
                        <li className="flex flex-col">
                            <div
                                onClick={toggleCandidateMenu}
                                className="flex items-center justify-between py-2 cursor-pointer hover:text-yellow-400 transition duration-300">
                                <span> Candidates</span>
                                {isCandidatesOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                            </div>
                            {isCandidatesOpen && (
                                <ul className="pl-6 space-y-2">
                                    <li className="cursor-pointer hover:text-yellow-400 transition duration-200">
                                        <Link
                                            to="/allCandidates"
                                            onClick={closeMobileMenu}
                                            className="block py-1"
                                        >
                                            All Candidates
                                        </Link>
                                    </li>
                                    <li className="cursor-pointer hover:text-yellow-400 transition duration-200">
                                        <Link
                                            to="/registerCandidate"
                                            onClick={closeMobileMenu}
                                            className="block py-1"
                                        >
                                            Register Candidate
                                        </Link>
                                    </li>
                                    {/* waxaad halkan ku dari kartaa subpages kale */}
                                </ul>
                            )}
                        </li>

                        {/* Sub Pages of Candidates */}
                        <li className="flex flex-col">
                            <div
                                onClick={toggleAdminMenu}
                                className="flex items-center justify-between py-2 cursor-pointer hover:text-yellow-400 transition duration-300">
                                <span> Admins</span>
                                {isAdminOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                            </div>
                            {isAdminOpen && (
                                <ul className="pl-6 space-y-2">
                                    <li className="cursor-pointer hover:text-yellow-400 transition duration-200">
                                        <Link
                                            to="/allAdmins"
                                            onClick={closeMobileMenu}
                                            className="block py-1"
                                        >
                                            All Admins
                                        </Link>
                                    </li>
                                    <li className="cursor-pointer hover:text-yellow-400 transition duration-200">
                                        <Link
                                            to="/registerAdmin"
                                            onClick={closeMobileMenu}
                                            className="block py-1"
                                        >
                                            Register Admin
                                        </Link>
                                    </li>
                                    {/* waxaad halkan ku dari kartaa subpages kale */}
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>
            </aside>

            {/* Spacer for mobile header */}
            <div className="lg:hidden h-16"></div>
        </>
    );
};

export default SideBar;
