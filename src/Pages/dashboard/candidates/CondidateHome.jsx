import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CandidateHome = () => {
    const [candidate, setCandidate] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Ka soo qaad xogta candidate-ka ee localStorage
        const storedCandidate = localStorage.getItem("candidate");
        if (storedCandidate) {
            setCandidate(JSON.parse(storedCandidate));
        } else {
            // Haddii candidate login la'aan yahay, dib ugu celin login
            navigate("/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
        window.location.reload();
    };

    if (!candidate) return null; // loading ama redirect ka hor inta aan xog la helin

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-12">
            {/* Header */}
            <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-10">
                Ku soo dhawoow, {candidate.name}
            </h1>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
                    <img
                        src={candidate.image}
                        alt={candidate.name}
                        className="w-32 h-32 rounded-full border-4 border-blue-600 mb-4"
                    />
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        {candidate.name}
                    </h2>
                    <p className="text-gray-600 text-sm">{candidate.description}</p>
                </div>

                {/* Stats Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-center text-center">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        Doorashada: Gudiga Ardayda 2025
                    </h3>
                    <p className="text-2xl font-bold text-blue-600 mb-4">
                        Codadka: {candidate.votes}
                    </p>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Notifications Section */}
            <div className="max-w-4xl mx-auto mt-12 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-6 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">Ogeysiis</h4>
                <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Xeerarka doorashada waa in la raaco.</li>
                    <li>Doorashadu waxay bilaabanaysaa 15/10/2025 saacadda 10:00 AM.</li>
                    <li>Hubi profile-kaaga inuu sax yahay kahor doorashada.</li>
                </ul>
            </div>
        </div>
    );
};

export default CandidateHome;
