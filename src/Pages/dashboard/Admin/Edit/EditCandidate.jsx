import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

const EditCandidate = () => {
    const [name, setName] = useState("");
    const [candidateId, setCandidateId] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");

    const navigate = useNavigate();
    const params = useParams();

    const handleReadOne = async () => {
        try {
            const res = await axios.get(`http://localhost:8900/candidate/readSingle/${params.id}`);
            const data = res.data;
            setName(data.name);
            setCandidateId(data.candidateId);
            setPassword(""); // ha muujin password hore
            setImage(data.image);
            setDescription(data.description);
        } catch (err) {
            console.error("Error fetching candidate:", err);
        }
    };

    useEffect(() => {
        handleReadOne();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("candidateId", candidateId);
            if (password) formData.append("password", password);
            if (image) formData.append("image", image);
            formData.append("description", description);

            await axios.put(`http://localhost:8900/candidate/update/${params.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Candidate updated successfully!");
            navigate("/allCandidates");
        } catch (err) {
            console.error("Error updating candidate:", err);
            alert("Update failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Update Candidate
                </h2>

                <form onSubmit={handleUpdate} className="space-y-4">

                    {/* Candidate ID */}
                    <div inert>
                        <label className="block text-gray-700 font-medium mb-1">
                            Candidate ID
                        </label>
                        <input
                            value={candidateId}
                            onChange={(e) => setCandidateId(e.target.value)}
                            type="text"
                            placeholder="Enter Candidate ID"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                        />
                    </div>

                    {/* Candidate Name */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Name
                        </label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Enter Candidate Name"
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
                            placeholder="Enter New Password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                        />
                    </div>

                    {/* Current Image */}
                    {image && typeof image === "string" && (
                        <img src={image} alt="Candidate" className="w-32 h-32 object-cover rounded-lg mb-3" />
                    )}

                    {/* Upload New Image */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Upload Image
                        </label>
                        <input
                            onChange={(e) => setImage(e.target.files[0])}
                            type="file"
                            accept="image/*"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                            placeholder="Enter description about candidate"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none resize-none"
                        ></textarea>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-yellow-400 text-gray-900 font-semibold py-2 rounded-lg shadow hover:bg-yellow-500 transition duration-200"
                    >
                        Update Candidate
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditCandidate;
