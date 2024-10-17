"use client"; // Ensure client-side rendering

import { useEffect, useState } from "react"; // Import useState and useEffect
import { useRouter } from "next/navigation"; // Next.js router for client-side navigation
import { IoCloudUploadOutline, IoSettingsSharp } from "react-icons/io5";
import { MdAccountBalance } from "react-icons/md";
import { IoIosContact, IoMdHome } from "react-icons/io";

const Nav = () => {
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
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      </div>
    );
  }

  return (
    <section className="relative bg-gray-50">
      
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-xl z-10 flex items-center justify-between p-2">
        <button
          onClick={() => router.push("/")}
          className="flex flex-col items-center flex-1 justify-center transition-colors duration-300 hover:text-blue-500"
        >
          <IoMdHome size={24} className="transition-colors duration-200" />
          <p className="font-bold text-xs md:text-base transition-colors duration-200">
            Home
          </p>
        </button>

        <button
          onClick={() => router.push("/upload")}
          className="flex flex-col items-center flex-1 justify-center transition-colors duration-300 hover:text-blue-500"
        >
          <IoCloudUploadOutline size={24} className="transition-colors duration-200" />
          <p className="font-bold text-xs md:text-base transition-colors duration-200">
            Upload documents
          </p>
        </button>

        <button
          className="flex flex-col items-center flex-1 justify-center transition-colors duration-300 hover:text-blue-500"
          onClick={() => router.push("/accounts")}
        >
          <MdAccountBalance size={24} className="transition-colors duration-300" />
          <p className="font-bold text-xs md:text-base transition-colors duration-200">
            Accounts
          </p>
        </button>

        <button
          className="flex flex-col items-center flex-1 justify-center transition-colors duration-300 hover:text-blue-500"
          onClick={() => router.push("/settings")}
        >
          <IoSettingsSharp size={24} className="transition-colors duration-300" />
          <p className="font-bold text-xs md:text-base transition-colors duration-200">
            Settings
          </p>
        </button>

        <button
          className="flex flex-col items-center flex-1 justify-center transition-colors duration-300 hover:text-blue-500"
          onClick={() => router.push("/contact-us")}
        >
          <IoIosContact size={24} className="transition-colors duration-300" />
          <p className="font-bold text-xs md:text-base transition-colors duration-200">
            Contact
          </p>
        </button>
      </div>
    </section>
  );
};

export default Nav;
