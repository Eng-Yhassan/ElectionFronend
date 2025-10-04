import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 text-white px-4">
            <AlertTriangle className="w-24 h-24 mb-6 animate-bounce" />
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-xl mb-6">Oops! Page-ka aad raadinayso lama helin.</p>
            <Link
                to="/"
                className="bg-white text-pink-500 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-pink-100 transition"
            >
                Ku Noqo Bogga Hore
            </Link>
        </div>
    );
};

export default NotFoundPage;
