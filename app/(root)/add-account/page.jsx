"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddAccounts = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    bankName: "",
    bankUsername: "",
    bankPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;

    // Prevent input if it exceeds 9 characters for bankPassword
    if (id === "bankPassword" && value.length > 9) return;

    // Update state with the new value
    setFormData({ ...formData, [id]: value });
  };

  // Form validation
  const validate = () => {
    const newErrors = {};

    if (!formData.bankName.trim()) {
      newErrors.bankName = "Bank name is required";
    }

    if (!formData.bankUsername.trim()) {
      newErrors.bankUsername = "Account number is required";
    } else if (!/^\d+$/.test(formData.bankUsername)) {
      newErrors.bankUsername = "Account number must be numeric";
    }

    if (!formData.bankPassword.trim()) {
      newErrors.bankPassword = "Routing number is required";
    } else if (!/^\d{9}$/.test(formData.bankPassword)) {
      newErrors.bankPassword = "Routing number must be exactly 9 digits";
    }

    return newErrors;
  };

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
      const response = await fetch("/api/add-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to add account");

      const data = await response.json();

      toast.success("Account added successfully! Redirecting...", {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => {
        router.push("/verify-now");
      }, 2000);

      setFormData({ bankName: "", bankUsername: "", bankPassword: "" });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add account. Please try again.", {
        position: "top-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Add New Bank Account
        </h2>

        <div className="mb-4">
          <label
            htmlFor="bankName"
            className="block text-gray-700 font-semibold mb-2"
          >
            Bank Name
          </label>
          <input
            id="bankName"
            type="text"
            value={formData.bankName}
            onChange={handleChange}
            placeholder="Enter bank name"
            className={`w-full p-2 border rounded-md ${
              errors.bankName ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.bankName && (
            <p className="text-red-500 text-sm">{errors.bankName}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="bankUsername"
            className="block text-gray-700 font-semibold mb-2"
          >
            Bank Account Number
          </label>
          <input
            id="bankUsername"
            type="number"
            value={formData.bankUsername}
            onChange={handleChange}
            placeholder="Enter account number"
            className={`w-full p-2 border rounded-md ${
              errors.bankUsername ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.bankUsername && (
            <p className="text-red-500 text-sm">{errors.bankUsername}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="bankPassword"
            className="block text-gray-700 font-semibold mb-2"
          >
            Bank Routing Number
          </label>
          <input
            id="bankPassword"
            type="text"
            inputMode="numeric" // Ensures numeric keypad on mobile
            value={formData.bankPassword}
            onChange={handleChange}
            placeholder="Enter 9-digit routing number"
            className={`w-full p-2 border rounded-md ${
              errors.bankPassword ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.bankPassword && (
            <p className="text-red-500 text-sm">{errors.bankPassword}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Continue"}
        </button>
      </form>
    </section>
  );
};

export default AddAccounts;
