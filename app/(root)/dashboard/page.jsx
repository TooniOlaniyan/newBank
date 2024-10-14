"use client"; // Ensure client-side rendering

import { useEffect, useState } from "react"; // Import useState and useEffect
import { useRouter } from "next/navigation"; // Next.js router for client-side navigation
import Action from "@/components/Action";
import Payment from "@/components/Payment";
import Products from "@/components/Products";
import Welcome from "@/components/Welcome";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Loader state

  // Check for token in localStorage on page load
  useEffect(() => {
    const token = localStorage.getItem("token");

    // Simulate loading delay for UX purposes (optional)
    setTimeout(() => {
      if (!token) {
        // If no token, redirect to login page
        router.push("/sign-in");
      } else {
        setLoading(false); // Stop loading once token is verified
      }
    }, 1000); // Simulate loading delay (1 second)
  }, [router]);

  if (loading) {
    // Display loader while checking token
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

  // Dashboard content, displayed only after loading is false
  const name = {
    firstName: "Binta",
    lastName: "Lawn"
  };

  const payment = {
    title: "payments",
    amount: 40.56
  };

  const products = {
    title: "Application status",
    product: ["Super stay matte ink", "Liquid lipstick"]
  };

  const action = {
    title: "action required",
    text: "Complete Payroll Verification"
  };

  return (
    <section className="flex flex-col gap-8">
      <Welcome name={name} />
      <Payment payment={payment} />
      <Products products={products} />
      <Action action={action} />
    </section>
  );
};

export default Page;
