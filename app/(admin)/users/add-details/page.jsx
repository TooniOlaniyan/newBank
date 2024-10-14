"use client";

import { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddUserPage = () => {
  const [formData, setFormData] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    instagramUsername: "",
    influencerName: "",
    influencerNumber: "",
    email: "",
    mailingAddress: "",
    profileType: "",
    ratePerContent: "",
    balance: "",
    balanceStatus: "",
  });

  const [errors, setErrors] = useState({}); // State for storing field-specific errors
  const [submitting, setSubmitting] = useState(false);
  const nameInputRef = useRef(null); // Ref for focusing the first name input field

  // Focus on the first name input field when the component mounts
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus(); // Focus the first name input field
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Reset the error for the field being modified
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validate individual fields
  const validateField = (name, value) => {
    if (!value.trim()) {
      return `${name} is required.`;
    }
    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      return "Please enter a valid email address.";
    }
    if (name === "balance" && isNaN(value)) {
      return "Balance must be a number.";
    }
    return ""; // No error
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset errors state
    setSubmitting(true);

    const newErrors = {};
    const requiredFields = [
      "userId",
      "firstName",
      "lastName",
      "instagramUsername",
      "influencerName",
      "influencerNumber",
      "email",
      "mailingAddress",
      "ratePerContent",
      "balance",
      
    ];

    // Validate all required fields
    requiredFields.forEach((field) => {
      const errorMsg = validateField(field, formData[field]);
      if (errorMsg) {
        newErrors[field] = errorMsg;
      }
    });

    // If there are errors, stop submission and display errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitting(false);
      return;
    }

    const userToSend = {
      id: formData.userId,
      info: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        instagramUsername: formData.instagramUsername,
        influencerName: formData.influencerName,
        influencerNumber: formData.influencerNumber,
        email: formData.email,
        mailingAddress: formData.mailingAddress,
        profileType: formData.profileType,
        ratePerContent: formData.ratePerContent,
        balance: formData.balance,
        balanceStatus: parseFloat(formData.balance) || 0
      },
      verify: false,
    };

    try {
      const response = await fetch("/api/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userToSend)
      });

      if (!response.ok) {
        throw new Error("Failed to save user");
      }

      const data = await response.json();
      toast.success(`User added: ${data.user.info.firstName}`, {
        position: "top-right"
      });

      // Reset form fields
      setFormData({
        userId: "",
        firstName: "",
        lastName: "",
        instagramUsername: "",
        influencerName: "",
        influencerNumber: "",
        email: "",
        mailingAddress: "",
        profileType: "Influencer collective",
        ratePerContent: "",
        balance: "",
        balanceStatus: "pending",
        username: "",
        password: ""
      });
    } catch (error) {
      toast.error(error.message || "Something went wrong!", {
        position: "top-right"
      });
    } finally {
      setSubmitting(false); // Reset submitting state after the process finishes
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl mb-4 text-center font-semibold">Add User Details</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key}>
              <label className="block mb-2" htmlFor={key}>
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                type={key === "email" ? "email" : "text"}
                id={key}
                name={key}
                value={value}
                onChange={handleChange}
                className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors[key] && <p className="text-red-500 text-sm">{errors[key]}</p>}
            </div>
          ))}
          
          <button
            type="submit"
            className={`bg-blue-500 text-white rounded-md p-2 ${submitting ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={submitting} // Disable button when submitting
          >
            {submitting ? "Submitting..." : "Add User"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddUserPage;
