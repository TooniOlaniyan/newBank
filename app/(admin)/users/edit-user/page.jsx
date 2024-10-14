"use client"; // Ensure this component runs on the client side

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation'; 

const CheckUserPage = () => {
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize router

  // Optional: Load user data from localStorage on component mount
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      console.log("User Data retrieved from local storage:", JSON.parse(storedUserData));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/get-details?userId=${userId}`);
      if (!response.ok) {
        throw new Error("User not found");
      }
      const data = await response.json(); // Store the response data here

      // Save user data to localStorage
      localStorage.setItem("userDatas", JSON.stringify(data)); // Store the user data

      // Redirect to edit user page with userId
      router.push(`/users/edit-now?userId=${userId}`);
    } catch (error) {
      toast.error("User ID not found, please try again.", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl mb-4 text-center font-semibold">Check User</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label className="block mb-2" htmlFor="userId">
              Enter User ID
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className={`bg-blue-500 text-white rounded-md p-2 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Checking..." : "Check User"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CheckUserPage;
