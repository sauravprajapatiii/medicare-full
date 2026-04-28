import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../../assets/logo.png";

// const API_BASE = "http://localhost:4000";
const API_BASE = import.meta.env.VITE_API_URL;

const ADMIN_TOKEN_KEY = "adminToken";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const body = await res.json().catch(() => null);

      // if (res.status === 404) {
      //   setError(
      //     "API endpoint not found. Make sure the backend server is running on " +
      //       API_BASE +
      //       ".",
      //   );
      //   setLoading(false);
      //   return;
      // }

      if (!res.ok || !body?.success) {
        setError(body?.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      localStorage.setItem(ADMIN_TOKEN_KEY, body.token);
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-emerald-50 via-green-50 to-emerald-100 font-serif px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-emerald-100 p-8">
          <div className="text-center mb-8">
            <img
              src={logoImg}
              alt="Logo"
              className="w-20 h-20 mx-auto mb-4 object-contain"
            />
            <h1 className="text-2xl font-bold text-emerald-800">Admin Login</h1>
            <p className="text-sm text-emerald-600 mt-1">
              Secure access to admin panel
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                required
                className="w-full px-4 py-3 rounded-full border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full px-4 py-3 rounded-full border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200 text-sm"
              />
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-linear-to-r from-emerald-500 to-green-600 text-white font-semibold shadow-lg hover:shadow-xl transition disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/")}
              className="text-sm text-emerald-600 hover:text-emerald-800 transition"
            >
              Back to Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
