import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditVoter = () => {
    const [voterId, setVoterId] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [faculty, setFaculty] = useState("");

    const navigate = useNavigate();
    const params = useParams();

    // Fetch single voter details
    const handleReadOne = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8900/voter/readSingle/${params.id}`
            );
            const data = res.data;
            setVoterId(data.voterId);
            setName(data.name);
            setPassword(data.password);
            setFaculty(data.faculty);
        } catch (err) {
            console.error("Error fetching voter:", err);
        }
    };

    // Run on mount
    useEffect(() => {
        handleReadOne();
    }, []);

    // Handle update
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8900/voter/update/${params.id}`, {
                voterId,
                name,
                ...(password && { password }),
                faculty,
            });
            alert("Voter updated successfully!");
            navigate("/allVoters"); // change route sida aad rabto
        } catch (err) {
            console.error("Error updating voter:", err);
            alert("Update failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Edit The Information Of Voter
                </h2>

                <form onSubmit={handleUpdate} className="space-y-4">
                    {/* Voter ID */}
                    <div inert>
                        <label className="block text-gray-700 font-medium mb-1">
                            Voter ID
                        </label>
                        <input
                            value={voterId}
                            onChange={(e) => setVoterId(e.target.value)}
                            type="text"
                            placeholder="Enter Voter ID"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                        />
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Name
                        </label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Enter Full Name"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Password
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Enter password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                        />
                    </div>

                    {/* Faculty */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Faculty
                        </label>
                        <select
                            value={faculty}
                            onChange={(e) => setFaculty(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                        >
                            <option value="">Select Faculty</option>
                            <option value="Medicine">Medicine</option>
                            <option value="Engineering and Technology">Engineering and Technology</option>
                            <option value="Marine Science">Marine Science</option>
                            <option value="Computer Science and Information Technology">Computer Science and Information Technology</option>
                            <option value="Agriculture">Agriculture</option>
                            <option value="Economics and Management">Economics and Management</option>
                            <option value="Social Science">Social Science</option>
                            <option value="Geoscience and Environment">Geoscience and Environment</option>
                            <option value="Sharia and Law">Sharia and Law</option>
                            <option value="Education">Education</option>
                            <option value="Veterinary Science">Veterinary Science</option>
                            <option value="Postgraduate Studies">Postgraduate Studies</option>
                        </select>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-yellow-400 text-gray-900 font-semibold py-2 rounded-lg shadow hover:bg-yellow-500 transition duration-200"
                    >
                        Update Voter
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditVoter;
