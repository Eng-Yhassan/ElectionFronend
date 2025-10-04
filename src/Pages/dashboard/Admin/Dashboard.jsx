// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

const Dashboard = () => {
  const [totalVoters, setTotalVoters] = useState(0);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Total voters
        const votersRes = await axios.get("http://localhost:8900/voter/read");
        setTotalVoters(votersRes.data.length);

        // Candidates
        const candidatesRes = await axios.get("http://localhost:8900/candidate/read");
        setCandidates(candidatesRes.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  // Candidate-ka ugu codadka badan
  const topCandidate = candidates.reduce(
    (max, c) => (c.votes > max.votes ? c : max),
    candidates[0]
  );

  // Jamaca votes-ka dhammaan candidates (Pie chart)
  const liveVotesTotal = candidates.reduce((acc, c) => acc + c.votes, 0);

  // Pie chart
  const pieData = {
    labels: ["Votes Cast", "Remaining Voters"],
    datasets: [
      {
        data: [liveVotesTotal, totalVoters - liveVotesTotal],
        backgroundColor: ["#3b82f6", "#f97316"],
      },
    ],
  };

  // Bar chart
  const barData = {
    labels: candidates.map(c => c.name),
    datasets: [
      {
        label: "Votes",
        data: candidates.map(c => c.votes),
        backgroundColor: "#10b981",
      },
    ],
  };

  

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-center mb-6">Election Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <h2 className="text-xl font-semibold">Total Voters</h2>
          <p className="text-3xl font-bold text-blue-600">{totalVoters}</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <h2 className="text-xl font-semibold">Total Candidates</h2>
          <p className="text-3xl font-bold text-green-600">{candidates.length}</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <h2 className="text-xl font-semibold">Top Candidate</h2>
          <p className="text-3xl font-bold text-purple-600">
            {topCandidate.name} ({topCandidate.votes})
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4 text-center">Votes Distribution</h2>
          <Pie data={pieData} />
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4 text-center">Votes per Candidate</h2>
          <Bar data={barData} />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
