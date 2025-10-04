import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterVoter = () => {
    const [voterId, setVoterId] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [Faculty, setFaculty] = useState(null);

    const navigate = useNavigate()

    const handleCreateNewVoter = (e) => {
        e.preventDefault()
        try {
            axios.post("http://localhost:8900/voter/register", {
                voterId: voterId,
                name: name,
                password: password,
                faculty: Faculty
            }).then(() => {
                alert("you created new Voter")
                navigate("/allVoters")
            })
        } catch (error) {
            alert("you can't create new voter")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center  p-6">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Register New Voter
                </h2>

                <form
                    onSubmit={handleCreateNewVoter}
                    className="space-y-4">
                    {/* Voter ID */}
                    <div>
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
                    {/* Passowrd */}
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
                            value={Faculty}
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
                        Register Voter
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterVoter;
