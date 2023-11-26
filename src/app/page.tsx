"use client";
import { useState } from "react";

const LoginPage = () => {
  const [cin, setCin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State variable for error message

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cin, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const user = data.user;
        console.log("test");
        if (user["role"] === "admin") window.location.href = "/admin";
        else window.location.href = "/employee";
      } else {
        const data = await response.json();
        setError(data.error); // Set error message if login failed
      }
    } catch (error) {
      console.log("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Welcome to MyOCP</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="cin" className="block text-gray-700 font-medium">
              CIN
            </label>
            <input
              type="cin"
              id="cin"
              name="cin"
              value={cin}
              onChange={(e) => setCin(e.target.value)}
              className="mt-2 px-4 py-3 w-full border rounded-lg focus:outline-none focus:border-indigo-500 transition duration-300"
              placeholder="Enter your CIN"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 px-4 py-3 w-full border rounded-lg focus:outline-none focus:border-indigo-500 transition duration-300"
              placeholder="Enter your password"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-4 py-3 w-full rounded-lg focus:outline-none transform transition hover:scale-105"
            >
              Log in
            </button>
          </div>
        </form>

        {/* Error pop-up */}
        {error && (
          <div className="bg-red-500 text-white px-4 py-2 mt-4 rounded-lg text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
