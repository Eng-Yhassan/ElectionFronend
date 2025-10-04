import React, { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

const GetAllCandidates = () => {
    const [candidates, setCandidates] = useState([]);

    const handleCandidate = () => {
        axios.get("http://localhost:8900/candidate/read").then((res) => {
            setCandidates(res.data)
        })
    }

    useEffect(() => {
        handleCandidate()
    }, [])

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8900/candidate/delete/${id}`).then(() => {
            alert("Deleted");
            handleCandidate();
        });
    };



    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">All Candidates</h2>

            {/* Desktop / Tablet View */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left">Image</th>
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">ID</th>
                            <th className="py-3 px-6 text-left">description</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates.map((c) => (
                            <tr
                                key={c.id}
                                className="border-b hover:bg-gray-50 transition duration-200"
                            >
                                <td className="py-3 px-6">
                                    <img
                                        src={c.image}
                                        alt={c.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                </td>
                                <td className="py-3 px-6">{c.name}</td>
                                <td className="py-3 px-6">{c.candidateId}</td>
                                <td className="py-3 px-6">{c.description}</td>
                                <td className="py-3 px-6 text-center flex justify-center gap-3">
                                    <Link to={`/editCandidate/${c._id}`}>
                                        <button className="text-blue-600 hover:text-blue-800">
                                            <Edit size={20} />
                                        </button>
                                    </Link>
                                    <button onClick={() => handleDelete(c._id)} className="text-red-600 hover:text-red-800">
                                        <Trash2 size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile View */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {candidates.map((c) => (
                    <div
                        key={c.id}
                        className="bg-white shadow-lg rounded-xl p-4 flex items-center gap-4"
                    >
                        <img
                            src={c.image}
                            alt={c.name}
                            className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-800">{c.name}</h3>
                            <p className="text-gray-500">ID: {c.candidateId}</p>
                            <p className="text-gray-600 font-medium">Votes: {c.description}</p>
                        </div>
                        <div className="flex gap-3 items-center">
                            <Link to={`/editCandidate/${c._id}`}>
                                <button className="text-blue-600 hover:text-blue-800">
                                    <Edit size={20} />
                                </button>
                            </Link>
                            <button onClick={() => handleDelete(c._id)} className="text-red-600 hover:text-red-800">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GetAllCandidates;
