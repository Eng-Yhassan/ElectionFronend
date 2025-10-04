import React, { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const GetAllAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const adminsPerPage = 15;

  const handleAdmins = () => {
    axios.get("http://localhost:8900/read/admins").then((res) => {
      setAdmins(res.data);
    });
  };

  useEffect(() => {
    handleAdmins();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8900/delete/admin/${id}`).then(() => {
      alert("Deleted");
      handleAdmins();
    });
  };

  // ✅ Filter admins by name or adminId
  const filteredAdmins = admins.filter((a) => {
    return (
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.adminId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Pagination logic
  const indexOfLastAdmin = currentPage * adminsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage;
  const currentAdmins = filteredAdmins.slice(
    indexOfFirstAdmin,
    indexOfLastAdmin
  );
  const totalPages = Math.ceil(filteredAdmins.length / adminsPerPage);

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center my-4 gap-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">
          All Admins
        </h1>
        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Search by ID or Name"
            className="border px-3 py-1 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link to="/registerAdmin">
            <button className="bg-gray-800 md:px-12 px-8 py-2 rounded-[5px] text-white">
              Add New Admin
            </button>
          </Link>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-[600px] md:min-w-full bg-white shadow-md rounded-lg overflow-hidden text-sm sm:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 sm:py-3 sm:px-6 text-left text-gray-600">
                Admin ID
              </th>
              <th className="py-2 px-4 sm:py-3 sm:px-6 text-left text-gray-600">
                Name
              </th>
              <th className="py-2 px-4 sm:py-3 sm:px-6 text-center text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentAdmins.map((admin, index) => (
              <tr
                key={admin._id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition`}
              >
                <td className="py-2 px-4 sm:py-3 sm:px-6">{admin.adminId}</td>
                <td className="py-2 px-4 sm:py-3 sm:px-6">{admin.name}</td>
                <td className="py-2 px-4 sm:py-3 sm:px-6 flex justify-center gap-3">
                  <Link to={`/editAdmin/${admin._id}`}>
                    <Edit className="text-blue-500 cursor-pointer hover:text-blue-700 w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                  <Trash2
                    onClick={() => handleDelete(admin._id)}
                    className="text-red-500 cursor-pointer hover:text-red-700 w-4 h-4 sm:w-5 sm:h-5"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">
        {currentAdmins.map((admin, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-2 border-l-4 border-blue-500"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-gray-700">
                ID: {admin.adminId}
              </h2>
              <div className="flex gap-3">
                <Link to={`/editAdmin/${admin._id}`}>
                  <Edit className="text-blue-500 cursor-pointer hover:text-blue-700 w-5 h-5" />
                </Link>
                <Trash2
                  onClick={() => handleDelete(admin._id)}
                  className="text-red-500 cursor-pointer hover:text-red-700 w-5 h-5"
                />
              </div>
            </div>
            <p className="text-gray-600">
              <span className="font-semibold">Name:</span> {admin.name}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-1">
            {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default GetAllAdmins;
