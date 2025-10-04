import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditAdmin = () => {
    const { id } = useParams(); // admin id from URL
    const navigate = useNavigate();

    const [adminId, setAdminId] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    // Fetch admin data by ID
    const getAdmin = async () => {
        try {
            const res = await axios.get(`http://localhost:8900/readSingle/admin/${id}`);
            setAdminId(res.data.adminId);
            setName(res.data.name);
            setPassword(res.data.password);
        } catch (err) {
            console.error(err);
            setMessage("Failed to load admin data ❌");
        }
    };

    useEffect(() => {
        getAdmin();
    }, [id]);

    // Handle update
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8900/update/admin/${id}`, {
                adminId,
                name,
                password,
            });
            setMessage("Admin updated successfully ✅");
            setTimeout(() => {
                navigate("/allAdmins"); // Navigate back to admin list
            }, 1000);
        } catch (err) {
            console.error(err);
            setMessage("Update failed ❌");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">
                    Edit Admin
                </h2>
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-gray-600">Admin ID</label>
                        <input
                            type="text"
                            value={adminId}
                            onChange={(e) => setAdminId(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-600">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-600">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Update Admin
                    </button>
                </form>

                {message && (
                    <p className="text-center mt-4 text-gray-700 font-medium">{message}</p>
                )}
            </div>
        </div>
    );
};

export default EditAdmin;
