import React from "react";
import { Link, useLocation } from "react-router-dom";

const ADMIN_TOKEN_KEY = "adminToken";

export default function RequireAuth({ children }) {
  const location = useLocation();
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);

  if (!token) {
    return (
      <div className="min-h-screen font-mono flex items-center justify-center bg-linear-to-b from-emerald-50 via-green-50 to-emerald-100 px-4">
        <div className="text-center">
          <p className="text-emerald-800 font-semibold text-lg sm:text-2xl mb-4 animate-fade-in">
            Please sign in to view this page.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              to="/admin"
              className="px-4 py-2 text-sm rounded-full bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 hover:shadow-md transition-all duration-300 ease-in-out"
            >
              Admin Login
            </Link>
            <Link
              to="/"
              className="px-4 py-2 text-sm rounded-full bg-white text-emerald-700 border border-emerald-200 shadow-sm hover:bg-emerald-50 transition-all duration-300 ease-in-out"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
