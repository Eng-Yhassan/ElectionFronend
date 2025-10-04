import React, { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const GetAllVoters = () => {
    const [voters, setVoters] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [facultyFilter, setFacultyFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const votersPerPage = 15;

    const handleVoter = () => {
        axios.get("http://localhost:8900/voter/read").then((res) => {
            setVoters(res.data);
        });
    };

    useEffect(() => {
        handleVoter();
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8900/voter/delete/${id}`).then(() => {
            alert("Deleted");
            handleVoter();
        });
    };

    // Filter voters
    const filteredVoters = voters.filter((v) => {
        const matchesSearch =
            v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.voterId.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFaculty = facultyFilter ? v.faculty === facultyFilter : true;
        return matchesSearch && matchesFaculty;
    });

    // Pagination logic
    const indexOfLastVoter = currentPage * votersPerPage;
    const indexOfFirstVoter = indexOfLastVoter - votersPerPage;
    const currentVoters = filteredVoters.slice(indexOfFirstVoter, indexOfLastVoter);
    const totalPages = Math.ceil(filteredVoters.length / votersPerPage);

    return (
        <div className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-center my-4 gap-4">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">
                    All Voters
                </h1>
                <div className="flex gap-2 flex-wrap">
                    <input
                        type="text"
                        placeholder="Search by ID or Name"
                        className="border px-3 py-1 rounded"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        className="border px-3 py-1 rounded w-[280px] "
                        value={facultyFilter}
                        onChange={(e) => setFacultyFilter(e.target.value)}
                    >
                        <option value="">All Faculties</option>
                        {[...new Set(voters.map((v) => v.faculty))].map((faculty, idx) => (
                            <option key={idx} value={faculty}>{faculty}</option>
                        ))}
                    </select>
                    <Link to="/registerVoters">
                        <button className="bg-gray-800 md:px-12 px-8 py-2 rounded-[5px] text-white">
                            Add New Voter
                        </button>
                    </Link>
                </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-[600px] md:min-w-full bg-white shadow-md rounded-lg overflow-hidden text-sm sm:text-base">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 sm:py-3 sm:px-6 text-left text-gray-600">ID</th>
                            <th className="py-2 px-4 sm:py-3 sm:px-6 text-left text-gray-600">Name</th>
                            <th className="py-2 px-4 sm:py-3 sm:px-6 text-left text-gray-600">Faculty</th>
                            <th className="py-2 px-4 sm:py-3 sm:px-6 text-center text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentVoters.map((voter, index) => (
                            <tr
                                key={voter._id}
                                className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition`}
                            >
                                <td className="py-2 px-4 sm:py-3 sm:px-6">{voter.voterId}</td>
                                <td className="py-2 px-4 sm:py-3 sm:px-6">{voter.name}</td>
                                <td className="py-2 px-4 sm:py-3 sm:px-6">{voter.faculty}</td>
                                <td className="py-2 px-4 sm:py-3 sm:px-6 flex justify-center gap-3">
                                    <Link to={`/editVoter/${voter._id}`}>
                                        <Edit className="text-blue-500 cursor-pointer hover:text-blue-700 w-4 h-4 sm:w-5 sm:h-5" />
                                    </Link>
                                    <Trash2 onClick={() => handleDelete(voter._id)} className="text-red-500 cursor-pointer hover:text-red-700 w-4 h-4 sm:w-5 sm:h-5" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden flex flex-col gap-4">
                {currentVoters.map((voter, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-2 border-l-4 border-blue-500"
                    >
                        <div className="flex justify-between items-center">
                            <h2 className="font-bold text-gray-700">ID: {voter.voterId}</h2>
                            <div className="flex gap-3">
                                <Link to={`/editVoter/${voter._id}`}>
                                    <Edit className="text-blue-500 cursor-pointer hover:text-blue-700 w-5 h-5" />
                                </Link>
                                <Trash2 onClick={() => handleDelete(voter._id)} className="text-red-500 cursor-pointer hover:text-red-700 w-5 h-5" />
                            </div>
                        </div>
                        <p className="text-gray-600"><span className="font-semibold">Name:</span> {voter.name}</p>
                        <p className="text-gray-600"><span className="font-semibold">Faculty:</span> {voter.faculty}</p>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-4 mt-4">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                        className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="px-4 py-1">{currentPage} / {totalPages}</span>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default GetAllVoters;
