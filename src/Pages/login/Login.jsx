import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [active, setActive] = useState("voter"); // default role
    const navigate = useNavigate();

    const handleLogin = async () => {
        let url = "";
        if (active === "voter") url = "http://localhost:8900/voter/login";
        else if (active === "candidate") url = "http://localhost:8900/candidate/login";
        else if (active === "admin") url = "http://localhost:8900/admin/login";

        const payload =
            active === "voter"
                ? { voterId: userId, password }
                : active === "candidate"
                    ? { candidateId: userId, password }
                    : { adminId: userId, password };

        try {
            const res = await axios.post(url, payload);
            alert("Login successful ✅");

            // Save to localStorage based on role
            if (active === "admin") {
                localStorage.setItem("admin", JSON.stringify(res.data.admin));
                navigate("/adminPanel");
            } else if (active === "candidate") {
                localStorage.setItem("candidate", JSON.stringify(res.data.candidate));
                navigate("/candidateHome");
            } else {
                localStorage.setItem("voter", JSON.stringify(res.data.voter));
                navigate("/candidates");
                window.location.reload();
            }
        } catch (err) {
            alert(err.response?.data?.message || "Invalid ID or Password ❌");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={(e) => e.preventDefault()}
                className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
            >
                {/* Tabs */}
                <div className="flex justify-center mb-6">
                    <button
                        onClick={() => setActive("voter")}
                        className={`px-6 py-2 ${active === "voter"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700"
                            }`}
                    >
                        Voter
                    </button>
                    <button
                        onClick={() => setActive("candidate")}
                        className={`px-6 py-2 ${active === "candidate"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700"
                            }`}
                    >
                        Candidate
                    </button>
                    <button
                        onClick={() => setActive("admin")}
                        className={`px-6 py-2 ${active === "admin"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700"
                            }`}
                    >
                        Admin
                    </button>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-center mb-6">
                    {active === "voter"
                        ? "Voter Login"
                        : active === "candidate"
                            ? "Candidate Login"
                            : "Admin Login"}
                </h2>

                {/* ID Input */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        {active === "voter"
                            ? "Voter ID"
                            : active === "candidate"
                                ? "Candidate ID"
                                : "Admin ID"}
                    </label>
                    <input
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        type="text"
                        placeholder="Enter your ID"
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Password Input */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Password
                    </label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Enter your password"
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Login Button */}
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                    Login
                </button>

                {/* Footer */}
                <p className="text-center text-gray-500 text-sm mt-6">
                    If you don’t have an account, contact the admin.
                </p>
            </form>
        </div>
    );
};

export default Login;
