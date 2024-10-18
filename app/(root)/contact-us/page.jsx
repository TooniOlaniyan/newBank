"use client";

import { IoMdContact } from "react-icons/io";
import { IoCall, IoChevronForwardCircleOutline } from "react-icons/io5";
import { BsWallet2 } from "react-icons/bs";
import { PiSignOutBold, PiCallBell } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { MdEmail } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";

const ContactUs = () => {
  const router = useRouter();
  return (
    <section className="flex flex-col border rounded-lg">
      <div className="ml-4">
        <h2 className="text-left text-2xl font-bold text-gray-800 mb-1 my-1">
          Got A Problem
        </h2>
        <h4 className="text-left">Contact us to get help</h4>

        <h2 className="text-xl my-2 mt-6 font-semibold">Contact Options</h2>
      </div>

      <button className="group" onClick={() => router.push("/")}>
        <div className="flex justify-between items-center border-b border-t border-gray-300 px-2 py-4 transition duration-300 ease-in-out transform group-hover:bg-gray-100">
          <div className="flex items-center gap-x-6">
            <IoCall
              size={28}
              className="transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-500"
            />
            <div>
              <h3 className="font-semibold text-left transition-colors duration-300 group-hover:text-blue-500">
                Speak to a live agent
              </h3>

              <p className="text-left">
                <a href="tel:+17176897362" className="hover:underline">
                  (717) 689-7362
                </a>
              </p>
              <p className="text-left">12pm-5pm PST, 3 days a week</p>
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
            <MdEmail
              size={28}
              className="transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-500"
            />
            <div>
              <h3 className="text-left font-semibold transition-colors duration-300 group-hover:text-blue-500">
                Send us an email
              </h3>

              <p className="text-left">
                <a
                  href="mailto:assistance@dararelief.org"
                  className="hover:underline"
                >
                  assistance@dararelief.org
                </a>
              </p>
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
            <CgWebsite
              size={28}
              className="transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-500"
            />
            <div>
              <h3 className="text-left font-semibold transition-colors duration-300 group-hover:text-blue-500">
                Visit our website to chat with a live agent
              </h3>
              <p className="text-left">10am-5pm PST, 7 days a week.</p>
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

export default ContactUs;
