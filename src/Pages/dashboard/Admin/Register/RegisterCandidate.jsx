import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterCandidate = () => {
    const [name, setName] = useState("");
    const [candidateId, setCandidateId] = useState("");
    const [password, setPassword] = useState("")
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");


    const navigate = useNavigate()

    const handleCreate = (e) => {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append("name", name);
        formdata.append("candidateId", candidateId);
        formdata.append("image", image);
        formdata.append("description", description);
        formdata.append("password", password)
        axios.post("http://localhost:8900/candidate/register", formdata, {
            headers: { "Content-Type": "multipart/form-data" }
        }).then(() => {
            alert("added new Candidate")
            navigate("/allCandidates")
        }).catch(() => {
            alert("error can't create ")
        })
    }



    return (
        <div className="min-h-screen flex items-center justify-center  p-6">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Register New Candidate
                </h2>

                <form
                    onSubmit={handleCreate}
                    className="space-y-4">


                    {/* Candidate ID */}
                    <div>
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
                    {/* password Name */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            password
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Enter Candidate Name"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                        />
                    </div>
                    {/* Upload Image */}
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

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-yellow-400 text-gray-900 font-semibold py-2 rounded-lg shadow hover:bg-yellow-500 transition duration-200"
                    >
                        Register Candidate
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterCandidate;
