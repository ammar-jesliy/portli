import Image from "next/image";
import React from "react";
import Logo from "../../public/Logo-text.svg";

const Footer = () => {
  return (
    <div className="flex flex-col items-center pt-10 md:pt-20 gap-3">
      <Image src={Logo} alt="Logo" width={100} />
      <div className="w-full h-[2px] bg-black/20 rounded-full mt-2"></div>
      <div className="w-full px-2 flex justify-between items-center">
        <p className="text-tiny font-poppins font-medium tracking-tight sm:text-xs">&copy; 2024 portli, all rights reserved</p>
        <p className="text-tiny font-poppins font-medium tracking-tight sm:text-xs">
          crafted with care by 
          <a href="https://ammarjesliy.netlify.app" target="_blank" className="text-blue-600 underline"> Ammar</a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
