"use client";

import { useRouter } from "next/navigation";

const VerifyAccount = () => {
  const router = useRouter();
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg text-center">
        <div className="flex justify-center items-center"> 
          <img width="64" height="64" src="https://img.icons8.com/sf-black-filled/64/link.png" alt="link"/>
        </div>
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">
          Verify Bank Account
        </h2>

        {/* Description */}
        <p className="text-gray-700 leading-relaxed mb-6">
          Linking your bank account ensures secure, direct deposits and timely
          payroll processing. Please avoid using prepaid banks or fintech
          accounts; link a traditional bank account for seamless processing.
        </p>

        {/* Call-to-Action */}
        <button
          onClick={() => router.push("/verify-now")}
          className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-200 font-semibold"
        >
          Verify Now
        </button>
      </div>
    </section>
  );
};

export default VerifyAccount;
