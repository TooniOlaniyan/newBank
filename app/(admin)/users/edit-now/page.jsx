"use client"; // This ensures the component runs on the client side

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditUserPage = () => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
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
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter(); // Use the router

  useEffect(() => {
    // Attempt to retrieve user data from localStorage
    const storedUserData = localStorage.getItem("userDatas");

    if (!storedUserData) {
      // If no data found, redirect to the previous page
      toast.error("No user data found, redirecting...", {
        position: "top-right",
      });
      setTimeout(() => {
        router.push("/users/add-user"); // Go back to the previous page
      }, 600);
      return; // Exit early
    }

    const data = JSON.parse(storedUserData); // Parse the stored data
    setUserData(data.user); // Set the userData state

    // Populate formData with retrieved user data
    setFormData({
      firstName: data.user.info.firstName || "",
      lastName: data.user.info.lastName || "",
      instagramUsername: data.user.info.instagramUsername || "",
      influencerName: data.user.info.influencerName || "",
      influencerNumber: data.user.info.influencerNumber || "",
      email: data.user.info.email || "",
      mailingAddress: data.user.info.mailingAddress || "",
      profileType: data.user.info.profileType || "",
      ratePerContent: data.user.info.ratePerContent || "",
      balance: data.user.info.balance || "", // Assuming balance amount is stored here
      balanceStatus: data.user.info.balanceStatus || "",
    });

    setLoading(false); // Set loading to false after fetching data
  }, [router]); // Add router as a dependency

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`/api/update-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userData.id, info: formData }), 
      });

      console.log(JSON.stringify({ userId: userData.id, info: formData }));
      

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      // Clear local storage after successful update
      localStorage.removeItem("userDatas");

      toast.success("User updated successfully!", {
        position: "top-right",
      });

      // Optionally redirect the user to another page after successful update
      router.push("/users/add-user"); 
    } catch (error) {
      toast.error(error.message || "Something went wrong.", {
        position: "top-right",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 animate-spin text-blue-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.5" />
          <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.071-7.071l-1.414 1.414M5.343 18.364l-1.414 1.414m12.728-12.728l1.414 1.414M6.636 5.343l1.414-1.414" stroke="currentColor" />
        </svg>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {userData ? (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl mb-4 text-center font-semibold">Edit User</h1>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
              <label className="block mb-2" htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="border rounded-md p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-2" htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="border rounded-md p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-2" htmlFor="instagramUsername">
                Application number
              </label>
              <input
                type="text"
                id="instagramUsername"
                name="instagramUsername"
                value={formData.instagramUsername}
                onChange={handleChange}
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label className="block mb-2" htmlFor="influencerName">
                Influencer Name
              </label>
              <input
                type="text"
                id="influencerName"
                name="influencerName"
                value={formData.influencerName}
                onChange={handleChange}
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label className="block mb-2" htmlFor="influencerNumber">
                User ID
              </label>
              <input
                type="text"
                id="influencerNumber"
                name="influencerNumber"
                value={formData.influencerNumber}
                onChange={handleChange}
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label className="block mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border rounded-md p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-2" htmlFor="mailingAddress">
                Mailing Address
              </label>
              <input
                type="text"
                id="mailingAddress"
                name="mailingAddress"
                value={formData.mailingAddress}
                onChange={handleChange}
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label className="block mb-2" htmlFor="profileType">
                Program Type
              </label>
              <input
                type="text"
                id="profileType"
                name="profileType"
                value={formData.profileType}
                onChange={handleChange}
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label className="block mb-2" htmlFor="ratePerContent">
                Account status
              </label>
              <input
                type="text"
                id="ratePerContent"
                name="ratePerContent"
                value={formData.ratePerContent}
                onChange={handleChange}
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label className="block mb-2" htmlFor="balance">
                Balance
              </label>
              <input
                type="text"
                id="balance"
                name="balance"
                value={formData.balance}
                onChange={handleChange}
                className="border rounded-md p-2 w-full"
                
              />
            </div>
            <div>
              <label className="block mb-2" htmlFor="balanceStatus">
                Balance Status
              </label>
              <input
                type="text"
                id="balanceStatus"
                name="balanceStatus"
                value={formData.balanceStatus}
                onChange={handleChange}
                className="border rounded-md p-2 w-full"
              />
            </div>
            <button
              type="submit"
              className={`bg-blue-500 text-white rounded-md p-2 ${submitting ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={submitting}
            >
              {submitting ? "Updating..." : "Update User"}
            </button>
          </form>
        </div>
      ) : (
        <p>User not found</p>
      )}
      <ToastContainer />
    </div>
  );
};

export default EditUserPage;
