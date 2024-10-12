'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // For navigation
import { ToastContainer, toast } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS

const AddAccounts = () => {
  const router = useRouter(); // Initialize router for redirection

  // State for form fields
  const [formData, setFormData] = useState({
    bankName: '',
    bankUsername: '',
    bankPassword: ''
  });

  // State for form validation errors
  const [errors, setErrors] = useState({});

  // State for submission status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Form validation
  const validate = () => {
    const newErrors = {};
    if (!formData.bankName.trim()) {
      newErrors.bankName = 'Bank name is required';
    }
    if (!formData.bankUsername.trim()) {
      newErrors.bankUsername = 'Bank account number is required';
    }
    if (!formData.bankPassword.trim()) {
      newErrors.bankPassword = 'Bank routing number is required';
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

    // Reset errors and submit state
    setErrors({});
    setIsSubmitting(true);

    try {
      // Send form data to the API endpoint
      const response = await fetch('/api/add-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to add account');
      }

      const data = await response.json();

      // Show success toast
      toast.success('Account added successfully! Redirecting...', {
        position: 'top-right',  // Correct position value
        autoClose: 2000 // Close after 2 seconds
      });

      // Redirect to /verify-now after 2 seconds
      setTimeout(() => {
        router.push('/verify-now');
      }, 2000);

      // Optionally reset the form after submission
      setFormData({ bankName: '', bankUsername: '', bankPassword: '' });
    } catch (error) {
      console.error('Error:', error);

      // Show error toast
      toast.error('Failed to add account. Please try again.', {
        position: 'top-right'  // Correct position value
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Toast Container to show notifications */}
      <ToastContainer />

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        {/* Form Title */}
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
              errors.bankName ? 'border-red-500' : 'border-gray-300'
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
            placeholder="Enter bank account number"
            className={`w-full p-2 border rounded-md ${
              errors.bankUsername ? 'border-red-500' : 'border-gray-300'
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
            type="number"
            value={formData.bankPassword}
            onChange={handleChange}
            placeholder="Enter bank routing number"
            className={`w-full p-2 border rounded-md ${
              errors.bankPassword ? 'border-red-500' : 'border-gray-300'
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
          {isSubmitting ? 'Submitting...' : 'Continue'}
        </button>
      </form>
    </section>
  );
};

export default AddAccounts;
