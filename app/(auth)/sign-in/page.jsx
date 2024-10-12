'use client';

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Validate form data
  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to login");
      }

      // Store the JWT token in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);

      // Show success notification
      toast.success("Login successful!");

      // Optionally reset the form
      setFormData({ username: "", password: "" });

      // Redirect to dashboard after successful login
      setTimeout(() => {
        window.location.href = "/"; // Replace with your dashboard route
      }, 2000); // Delay to allow notification display
    } catch (error) {
      console.error("Error:", error);
      // Show error notification
      toast.error(error.message || "Failed to login");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 justify-between w-[90%] md:w-[320px]"
      >
        <h2 className="font-bold text-center text-2xl">Influencer Portal</h2>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-start justify-start gap-2">
            <label htmlFor="username" className="font-semibold">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full text-[#212529] px-[0.75rem] py-[0.375rem] border rounded-md ${errors.username ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>

          <div className="flex flex-col items-start justify-start gap-2">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-[0.75rem] py-[0.375rem] border rounded-md ${errors.password ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full px-[0.25rem] py-[0.5rem] bg-black text-white text-[0.875rem] rounded-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </div>
      </form>

      {/* Toast container to show notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;
