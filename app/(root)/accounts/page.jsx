'use client';

import { MdAccountBalance } from "react-icons/md";
import { IoChevronForwardCircleOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { useEffect, useState } from "react"; // Import useEffect and useState

const Page = () => {
  const router = useRouter();
  const [details, setDetails] = useState(null); // State to hold user details

  useEffect(() => {
    // Get user data from local storage
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    
    // Set the details if user data is available
    if (storedUserData) {
      const { info } = storedUserData; // Assuming your user data has this structure
      setDetails({
        name: info.firstName, // Adjust based on your user data structure
        accounts: {
          first:  "Add account", // Fallback in case account details are not available
          second:  "Verify account"
        }
      });
    }
  }, []);

  // Show loading state while fetching user data
  if (!details) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading user details...</p>
      </div>
    );
  }

  return (
    <section>
      <section className='flex items-center justify-between'>
        <div>
          <h1>Welcome,</h1>
          <h1 className='font-semibold mt-1 capitalize'>{details?.name}</h1>
        </div>

        <div>
          <Image
            alt="Profile"
            src="/images/lip.jpg"
            layout='intrinsic'
            width={100}
            height={100}
          />
        </div>
      </section>

      <section className="flex flex-col border rounded-lg">
        {/* First Button */}
        <button className="group" onClick={() => router.push("/add-account")}>
          <div className="flex justify-between items-center border-b border-gray-300 px-2 py-4 transition duration-300 ease-in-out transform group-hover:bg-gray-100">
            <div className="flex items-center gap-x-3">
              <MdAccountBalance
                size={20}
                className="transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-500"
              />
              <h3 className="font-semibold transition-colors duration-300 group-hover:text-blue-500">
                {details?.accounts?.first}
              </h3>
            </div>
            <div>
              <IoChevronForwardCircleOutline
                size={28}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-500"
              />
            </div>
          </div>
        </button>

        {/* Second Button */}
        <button className="group" onClick={() => router.push("/verify-account")}>
          <div className="flex justify-between items-center border-t border-gray-300 px-2 py-4 transition duration-300 ease-in-out transform group-hover:bg-gray-100">
            <div className="flex items-center gap-x-3">
              <MdAccountBalance
                size={20}
                className="transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-500"
              />
              <h3 className="font-semibold transition-colors duration-300 group-hover:text-blue-500">
                {details?.accounts?.second}
              </h3>
            </div>
            <div>
              <IoChevronForwardCircleOutline
                size={28}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-500"
              />
            </div>
          </div>
        </button>
      </section>
    </section>
  );
};

export default Page;
