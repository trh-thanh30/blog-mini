/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleChanges = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(false);
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(true);
      if (!res.ok) {
        setError(data.message);
      }
      if (res.ok) {
        setError(null);
        navigate("/sign-in");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="bg-gray-900 min-h-screen">
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto pt-32">
        <h1 className="text-4xl font-bold text-white mb-8">Sign Up</h1>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Username
          </label>
          <input
            onChange={handleChanges}
            type="text"
            id="username"
            className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="username"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your email
          </label>
          <input
            onChange={handleChanges}
            type="email"
            id="email"
            className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
          />
        </div>
        <div className="">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your password
          </label>
          <input
            onChange={handleChanges}
            type="password"
            placeholder="*********"
            id="password"
            className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4"
        >
          {loading ? "Sign Up" : <p className="loader mx-auto"></p>}
        </button>
        <div className="flex mt-4 gap-1 items-center text-sm">
          <p className="text-white">Already have an account?</p>
          <Link className="text-blue-500 hover:underline" to={"/sign-in"}>
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
