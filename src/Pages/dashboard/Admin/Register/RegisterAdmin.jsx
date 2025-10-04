import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterAdmin = () => {
    const [adminId, setAdminId] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:8900/register/admin", {
                adminId,
                name,
                password,
            });
            setMessage("Admin registered successfully ✅");
            setAdminId("");
            setName("");
            setPassword("");
            navigate("/allAdmins")
        } catch (err) {
            console.error(err);
            setMessage("Registration failed ❌");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">
                    Register Admin
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-gray-600">Admin ID</label>
                        <input
                            type="text"
                            value={adminId}
                            onChange={(e) => setAdminId(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Enter Admin ID"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-600">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Enter name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-600">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition"
                    >
                        Register
                    </button>
                </form>

                {message && (
                    <p className="text-center mt-4 text-gray-700 font-medium">{message}</p>
                )}
            </div>
        </div>
    );
};

export default RegisterAdmin;
