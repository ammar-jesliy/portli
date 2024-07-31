import React from "react";
import Image from "next/image";
import Logo from "../../public/Logo-text.svg"

const authLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen w-screen">
      <div className="flex lg:flex-[5] flex-col w-full">
        <div className="w-full flex justify-center pb-8 pt-6 lg:pl-12 lg:justify-start">
          <Image src={Logo} width={100} height={45} alt="Portli"/>
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
