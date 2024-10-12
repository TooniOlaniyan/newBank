"use client";
import { IoMdContact } from "react-icons/io";
import { IoChevronForwardCircleOutline } from "react-icons/io5";
import { BsWallet2 } from "react-icons/bs";
import { PiSignOutBold } from "react-icons/pi";


const page = () => {
  return (
    <section className="flex flex-col border rounded-lg">
      {/* Title */}
      <h2 className="text-left text-2xl font-bold text-gray-800 mb-1 my-1">
        Got A Problem
      </h2>
      <h4 className="text-left">Contact us to get help</h4>

      <h2 className="text-xl my-2 mt-6 font-semibold">Contact Options</h2>

        <button className="group" onClick={() => router.push("/add-account")}>
          <div className="flex justify-between items-center border-b border-t border-gray-300 px-2 py-4 transition duration-300 ease-in-out transform group-hover:bg-gray-100">
            <div className="flex items-center gap-x-6">
              <IoMdContact
                size={28}
                className="transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-500"
              />
              <div>
                <h3 className="text-xl text-left font-semibold transition-colors duration-300 group-hover:text-blue-500">
                  Need to talk to a representative
                </h3>
                <p className="text-left">Contact Customer Support at</p>
                <p className="text-left">122333333</p>
                <p className="text-left">12pm-4pm PST, 3 days a week</p>
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

        <button className="group">
          <div className="flex justify-between items-center border-t border-gray-300 px-2 py-4 transition duration-300 ease-in-out transform group-hover:bg-gray-100">
            <div className="flex items-center gap-x-6">
              <BsWallet2
                size={28}
                className="transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-500"
              />
              <div>
                <h3 className="text-xl text-left font-semibold transition-colors duration-300 group-hover:text-blue-500">
                  Send us an email
                </h3>
                <p className="text-left">Email Customer Support at</p>
                <p className="text-left">mail@influencers.com</p>
                <p className="text-left">24 hours, 7 days a week</p>
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

        <button className="group">
          <div className="flex justify-between items-center border-t border-gray-300 px-2 py-4 transition duration-300 ease-in-out transform group-hover:bg-gray-100">
            <div className="flex items-center gap-x-6">
              <PiSignOutBold
                size={28}
                className="transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-500"
              />
              <div>
                <h3 className="text-xl text-left font-semibold transition-colors duration-300 group-hover:text-blue-500">
                  Mail Us
                </h3>
                <p>Securely sign out of your account</p>
                <p className="text-left">Maybelline Headquarters</p>
                <p className="text-left">10 Hudson Yards, West Street</p>
                <p className="text-left">New York, NY 10001</p>
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

export default page;
