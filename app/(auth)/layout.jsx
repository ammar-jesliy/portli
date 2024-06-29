import React from "react";
import Image from "next/image";

const authLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen w-screen">
      <div className="flex lg:flex-[5] flex-col w-full">
        <div className="w-full flex justify-center pb-8 pt-12 lg:pl-12 lg:py-12 lg:justify-start">
          <Image src="/logo-text.svg" width={150} height={45} alt="Portli"/>
        </div>
        <div className="flex flex-1 self-center items-center pb-8 lg:px-12 lg:pb-12">
          {children}
        </div>
      </div>
      <div className=" hidden bg-gray-400 lg:flex lg:flex-[6]">
      </div>
    </div>
  );
};

export default authLayout;
