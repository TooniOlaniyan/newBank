'use client';

import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import { useRouter } from 'next/navigation'; // Import the router

const Otp = () => {
  const [otp, setOtp] = useState(new Array(6).fill("")); // 6-digit OTP
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize the router

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpCode = otp.join(''); // Combine the array into a string
    if (otpCode.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Send OTP to the API endpoint
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp: otpCode }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful OTP verification
        // Update verification status in the user object in local storage
        const user = JSON.parse(localStorage.getItem('userData')); // Retrieve the user object
        if (user) {
          user.verify = true; // Update the verify property
          localStorage.setItem('userData', JSON.stringify(user)); // Save the updated user object back to local storage
        }

        toast.success('OTP Verified Successfully!'); // Show success toast
        router.push('/'); // Redirect to the homepage
      } else {
        // Handle error from server
        setError(data.message || 'Failed to verify OTP');
        toast.error(data.message || 'Failed to verify OTP'); // Show error toast
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      toast.error('An error occurred. Please try again later.'); // Show error toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer /> {/* Add ToastContainer to the JSX */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Enter OTP
        </h2>

        <p className="text-center text-gray-600 mb-4">
          Please enter the 6-digit OTP sent to your phone.
        </p>

        {/* OTP Input Fields */}
        <div className="flex justify-center gap-2 mb-6">
          {otp.map((data, index) => {
            return (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                className="w-12 h-12 text-center p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-semibold"
              />
            );
          })}
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Submit OTP"}
        </button>
      </form>
    </section>
  );
};

export default Otp;
