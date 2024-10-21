"use client"; // Ensure client-side rendering

import { useEffect, useState } from "react"; // Import useState and useEffect
import { useRouter } from "next/navigation"; // Next.js router for client-side navigation
import Action from "@/components/Action";
import Payment from "@/components/Payment";
import Products from "@/components/Products";
import Welcome from "@/components/Welcome";
import Nav from "@/components/Nav";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Loader state
  const [userData, setUserData] = useState(null); // State for user data
  const [error, setError] = useState(null); // State for error handling

  // Check for token in localStorage on page load
  useEffect(() => {
    const token = localStorage.getItem("token");

    setTimeout(() => {
      if (!token) {
        router.push("/sign-in");
      } else {
        const userId = localStorage.getItem("userId");

        fetch(`/api/get-user?userId=${userId}`)
          .then((response) => {
            console.log(response);

            if (!response.ok) {
              throw new Error("Failed to fetch user data");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            setUserData(data); // Set user data
            localStorage.setItem("userData", JSON.stringify(data)); // Store user data in localStorage
            setLoading(false); // Stop loading
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
            setError(error.message); // Set error message
            setLoading(false); // Stop loading
          });
      }
    }, 1000); // Simulate loading delay (1 second)
  }, [router]);

  if (loading) {
    // Display loader while checking token or fetching user data
    return (
      <div className="flex justify-center items-center h-screen">
        {/* Loader SVG or spinner */}
        <svg
          className="animate-spin h-8 w-8 text-black"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      </div>
    );
  }

  if (error) {
    // Handle error case
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
  console.log(userData);

  // Assuming userData is structured similarly to your previous user JSON
  const { firstName } = userData?.info; // Access user info
  const payment = {
    title: "Payments",
    amount: userData?.info?.balance, // Use amount from fetched user data
  };

  const products = {
    title: "Application Status",
    product: ["Approved (Pending Payment)", "Check Status"],
  };

  const action = {
    title: "Action Required",
    text: "Complete Payment Verification",
    status: userData?.verify,
  };

  return (
    <section className="flex flex-col gap-8">
      <Welcome name={firstName} />
      <Payment payment={payment} />
      <Products products={products} />
      <Action action={action} />
      <Nav />
    </section>
  );
};

export default Page;
