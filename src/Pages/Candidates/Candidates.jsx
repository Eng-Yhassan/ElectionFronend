import React, { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import axios from "axios";

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    // 1️⃣ Fetch candidates
    axios
      .get("http://localhost:8900/candidate/read")
      .then((res) => setCandidates(res.data))
      .catch((err) => console.error(err));

    // 2️⃣ Hubi voter-ka localStorage
    const voter = JSON.parse(localStorage.getItem("voter"));
    if (voter && voter.hasVoted) setHasVoted(true);
  }, []);

  const handleVote = async (candidateId) => {
    try {
      const voter = JSON.parse(localStorage.getItem("voter"));
      if (!voter) return alert("Fadlan soo gal account-kaaga");

      const res = await axios.post("http://localhost:8900/create/vote", {
        voterId: voter.voterId,
        candidateId, // Halkan candidateId saxda ah ayaa loo dirayaa backend
      });

      alert(res.data.message);

      // 3️⃣ Update state iyo localStorage
      voter.hasVoted = true;
      localStorage.setItem("voter", JSON.stringify(voter));
      setHasVoted(true);
    } catch (err) {
      alert(err.response?.data?.message || "Error cod bixinta ❌");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen px-6 py-12">
      {/* Warning Section */}
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-xl mb-8 max-w-4xl mx-auto flex items-center gap-3">
        <AlertTriangle className="w-6 h-6 text-yellow-600" />
        <p className="text-sm md:text-base ">
          Fadlan iska hubi musharaxa aad rabto inaad codka siisid.
          <span className="font-bold"> Mar hadaa codeyso kama laban kartid.</span>
        </p>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-6">
        Musharixiinta Doorashada
      </h1>
      <p className="text-center max-w-2xl mx-auto text-gray-600 mb-12">
        Fadlan dooro musharaxa aad u aragto inuu ku habboon yahay hoggaanka
        ardayda Jaamacadda Benadir. Codkaagu waa muhiim.
      </p>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {candidates.map((candidate) => (
          <div
            key={candidate._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col items-center text-center"
          >
            {/* Image */}
            <img
              src={candidate.image}
              alt={candidate.name}
              className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-blue-600"
            />
            {/* Name */}
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {candidate.name}
            </h2>
            {/* Description */}
            <p className="text-gray-600 text-sm mb-4">{candidate.description}</p>
            {/* Vote Button */}
            <button
              onClick={() => handleVote(candidate.candidateId)}
              disabled={hasVoted}
              className={`${hasVoted ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                } text-white px-6 py-2 rounded-full font-medium transition`}
            >
              Codka sii
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Candidates;
