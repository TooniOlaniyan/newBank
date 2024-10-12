'use client';

import React, { useEffect, useState } from 'react';

const Page = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve userData from local storage
    const data = localStorage.getItem('userData');
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  return (
    <section className="flex flex-col border rounded-lg mb-10">
      <h2 className="text-xl pr-4 my-2 mt-6 font-semibold ml-2">Contact Options</h2>

      <div className="">
        {/* Full Name */}
        <div className="flex justify-between items-center border-b border-t border-gray-300 px-2 py-4 transition duration-300 ease-in-out transform group-hover:bg-gray-100">
          <div className="flex items-center gap-x-6">
            <div>
              <h3 className="text-left font-semibold transition-colors duration-300 group-hover:text-blue-500">
                Full Name
              </h3>
              <p className="text-left">{`${userData?.info.firstName} ${userData?.info.lastName}` || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Instagram Username */}
        <div className="flex justify-between items-center border-b border-t border-gray-300 px-2 py-4 transition duration-300 ease-in-out transform group-hover:bg-gray-100">
          <div className="flex items-center gap-x-6">
            <div>
              <h3 className="text-left font-semibold transition-colors duration-300 group-hover:text-blue-500">
                Instagram Username
              </h3>
              <p className="text-left">{userData?.info?.instagramUsername || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Influencer Number */}
        <div className="flex justify-between items-center border-b border-t border-gray-300 px-2 py-4 transition duration-300 ease-in-out transform group-hover:bg-gray-100">
          <div className="flex items-center gap-x-6">
            <div>
              <h3 className="text-left font-semibold transition-colors duration-300 group-hover:text-blue-500">
                Influencer Number
              </h3>
              <p className="text-left">{userData?.info?.influencerNumber || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Email Address */}
        <div className="flex justify-between items-center border-b border-t border-gray-300 px-2 py-4 transition duration-300 ease-in-out transform group-hover:bg-gray-100">
          <div className="flex items-center gap-x-6">
            <div>
              <h3 className="text-left font-semibold transition-colors duration-300 group-hover:text-blue-500">
                Email Address
              </h3>
              <p className="text-left">{userData?.info?.email || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Mailing Address */}
        <div className="flex justify-between items-center border-t border-gray-300 px-2 py-4 transition duration-300 ease-in-out transform group-hover:bg-gray-100">
          <div className="flex items-center gap-x-6">
            <div>
              <h3 className="text-left font-semibold transition-colors duration-300 group-hover:text-blue-500">
                Mailing Address
              </h3>
              <p className="text-left">{userData?.info?.mailingAdress || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
