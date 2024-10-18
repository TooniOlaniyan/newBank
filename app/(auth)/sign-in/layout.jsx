import React from "react";
import Image from "next/image";

const layout = ({ children }) => {
  return (
    <div className="relative">
      <Image
        src="/images/logo.jpg"
        alt="Logo"
        layout="fixed"
        width={80}
        height={40}
          className="absolute top-10 left-10 md:left-10 lg:left-[10rem] "
      />

      <div className='bg-no-repeat bg-center bg-contain bg-[url("/images/bg.jpg")]'>
        {children}
      </div>
    </div>
  );
};

export default layout;
