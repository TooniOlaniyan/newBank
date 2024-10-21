"use client"; // Necessary for Next.js App Router

import { useState } from "react";
import { useRouter } from "next/navigation"; // App Router hook for navigation
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // React Toastify

const ChangePassword = () => {
  const [userId, setUserId] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter(); // For navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId, // Send the user ID (like "user4")
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Show success toast
        toast.success("Password updated successfully!", {
          position: "top-right",
        });

        // Redirect to the add-account page after success
        setTimeout(() => {
          router.push("/users/add-user");
        }, 3000);
      } else {
        // Show error toast if the response isn't ok
        toast.error(data.message || "Something went wrong.", {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer position="top-center" /> {/* Toast container */}
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-xl font-semibold mb-4">Change Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">User ID</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="e.g., user4"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Current Password
            </label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              New Password
            </label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full p-2 rounded ${
              loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white font-semibold"
            }`}
            disabled={loading}
          >
            {loading ? "Changing Password..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
