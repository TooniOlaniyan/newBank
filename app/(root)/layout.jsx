"use client";

import React from "react";
import { MdAccountBalance } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { IoIosContact, IoMdHome } from "react-icons/io";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

import Image from "next/image";

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <section className="relative min-h-screen bg-gray-50">
      {/* Header with Logo */}
      <header  onClick={() => router.push("/")} className="bg-zinc-800 shadow-md p-4 flex items-center justify-between cursor-pointer">
        <Image src="/images/logo.jpg" width={80} height={30} alt="Logo" className="h-10" /> 
      </header>

      {/* Main content */}
      <section className="mx-4 my-3 flex-1">
        {children}
      </section>

      {/* Bottom navigation on mobile, sidebar on desktop */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-xl z-10 flex items-center justify-between p-2">
        <button
          onClick={() => router.push("/")}
          className="flex flex-col items-center flex-1 justify-center transition-colors duration-300 hover:text-blue-500"
        >
          <IoMdHome size={24} className="transition-colors duration-200" />
          <p className="font-semibold text-xs md:text-base transition-colors duration-200">
            Home
          </p>
        </button>

        <button
          onClick={() => router.push("/")}
          className="flex flex-col items-center flex-1 justify-center transition-colors duration-300 hover:text-blue-500"
        >
          <IoCloudUploadOutline
            size={24}
            className="transition-colors duration-200"
          />
          <p className="font-semibold text-xs md:text-base transition-colors duration-200">
            Upload documents
          </p>
        </button>

        <button
          className="flex flex-col items-center flex-1 justify-center transition-colors duration-300 hover:text-blue-500"
          onClick={() => router.push("/accounts")}
        >
          <MdAccountBalance
            size={24}
            className="transition-colors duration-300"
          />
          <p className="font-semibold text-xs md:text-base transition-colors duration-200">
            Accounts
          </p>
        </button>

        <button
          className="flex flex-col items-center flex-1 justify-center transition-colors duration-300 hover:text-blue-500"
          onClick={() => router.push("/settings")}
        >
          <IoSettingsSharp
            size={24}
            className="transition-colors duration-300"
          />
          <p className="font-semibold text-xs md:text-base transition-colors duration-200">
            Settings
          </p>
        </button>

        <button
          className="flex flex-col items-center flex-1 justify-center transition-colors duration-300 hover:text-blue-500"
          onClick={() => router.push("/contact-us")}
        >
          <IoIosContact size={24} className="transition-colors duration-300" />
          <p className="font-semibold text-xs md:text-base transition-colors duration-200">
            Contact
          </p>
        </button>
      </div>
    </section>
  );
};

export default Layout;
