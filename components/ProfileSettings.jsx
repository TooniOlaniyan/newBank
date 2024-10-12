'use client'
import { IoMdContact } from "react-icons/io";
import { IoChevronForwardCircleOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { BsWallet2 } from "react-icons/bs";
import { PiSignOutBold } from "react-icons/pi";

const ProfileSettings = () => {
    const router = useRouter();

    // Handle sign-out button click
    const handleSignOut = () => {
      // Clear localStorage
      localStorage.removeItem("token");

      // Redirect to the login page
      router.push("/sign-in");
    };
  return (
    <section className="flex flex-col border rounded-lg">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center my-4">
        Profile Settings
      </h2>

      {/* First Button */}
      <button className="group" onClick={() => router.push("/personal-info")}>
        <div className="flex justify-between items-center border-b border-gray-300 px-2 py-4 transition duration-300 ease-in-out transform group-hover:bg-gray-100">
          <div className="flex items-center gap-x-3">
              <IoMdContact 
              size={20}
              className="transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-500"
            />
            <div>
              <h3 className="text-left font-semibold transition-colors duration-300 group-hover:text-blue-500">
                Personal Info
              </h3>
              <p>Name, instagram, address, email</p>
            </div>
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
      <button className="group" onClick={() => router.push("/balance")}>
        <div className="flex justify-between items-center border-t border-gray-300 px-2 py-4 transition duration-300 ease-in-out transform group-hover:bg-gray-100">
          <div className="flex items-center gap-x-3">
          <BsWallet2 
              size={20}
              className="transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-500"
            />
            <div>
              <h3 className="text-left font-semibold transition-colors duration-300 group-hover:text-blue-500">
                Balance
              </h3>
              <p>Account balance and rates</p>
            </div>
          </div>
          <div>
            <IoChevronForwardCircleOutline
              size={28}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-500"
            />
          </div>
        </div>
      </button>


      <button className="group" onClick={handleSignOut}>
        <div className="flex justify-between items-center border-t border-gray-300 px-2 py-4 transition duration-300 ease-in-out transform group-hover:bg-gray-100">
          <div className="flex items-center gap-x-3">
            <PiSignOutBold 
              size={20}
              className="transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-500"
            />
            <div>
              <h3 className="text-left font-semibold transition-colors duration-300 group-hover:text-blue-500">
                Sign Out
              </h3>
              <p>Securely sign out of your account</p>
            </div>
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
  );
};

export default ProfileSettings;
