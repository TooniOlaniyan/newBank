'use client'

import React, { useEffect, useState } from 'react';

const Balance = () => {
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
      <h2 className="text-xl pr-4 my-2 mt-6 font-semibold ml-2">Balance</h2>

      <div>
        {/* Name */}
        <div className="flex justify-between items-center border-b border-t border-gray-300 px-2 py-4 transition duration-300 ease-in-out transform group-hover:bg-gray-100">
          <div className="flex items-center gap-x-6">
            <div>
              <h3 className="text-left font-semibold transition-colors duration-300 group-hover:text-blue-500">
                Name
              </h3>
              <p className="text-left">{`${userData?.info.firstName} ${userData?.info?.lastName}` || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Profile Type */}
        <div className="flex justify-between items-center border-b border-t border-gray-300 px-2 py-4 transition duration-300 ease-in-out transform group-hover:bg-gray-100">
          <div className="flex items-center gap-x-6">
            <div>
              <h3 className="text-left font-semibold transition-colors duration-300 group-hover:text-blue-500">
                Profile Type
              </h3>
              <p className="text-left">{userData?.info?.profileType || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Rate per Content */}
        <div className="flex justify-between items-center border-b border-t border-gray-300 px-2 py-4 transition duration-300 ease-in-out transform group-hover:bg-gray-100">
          <div className="flex items-center gap-x-6">
            <div>
              <h3 className="text-left font-semibold transition-colors duration-300 group-hover:text-blue-500">
                Rate per Content
              </h3>
              <p className="text-left">${userData?.info?.ratePerContent || "0.00"}</p>
            </div>
          </div>
        </div>

        {/* Balance */}
        <div className="flex justify-between items-center border-b border-t border-gray-300 px-2 py-4 transition duration-300 ease-in-out transform group-hover:bg-gray-100">
          <div className="flex items-center gap-x-6">
            <div>
              <h3 className="text-left font-semibold transition-colors duration-300 group-hover:text-blue-500">
                Balance
              </h3>
              <p className="text-left">${userData?.info?.balance || "0.00"} ({userData?.info?.balanceStatus || "N/A"})</p>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Balance;
