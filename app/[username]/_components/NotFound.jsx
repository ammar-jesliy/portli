import Link from "next/link";
import React from "react";
import Image from "next/image";
import Logo from '../../../public/Logo-text.svg'

const NotFound = () => {
  return (
    <div className="w-full h-screen bg-primaryLightBlue/15">
      <div className="max-w-[1250px] mx-auto py-4 px-4 h-full">
        <div className="flex justify-start items-center">
          <Image src={Logo} alt="Logo" width={100} priority />
        </div>
        <div className="flex flex-col gap-3 items-center justify-center h-[calc(100%-80px)] w-full max-w-[500px] mx-auto">
          <h2 className="font-bricolage font-medium text-xl sm:text-2xl tracking-tight leading-none text-center ">Oops! page not found</h2>
          <p className="font-poppins text-center leading-[1.2] text-sm">There might be a typo in the URL or the page might have been removed. Please double-check the information and try again.</p>
          <Link href={'/'} className="px-4 py-2 mt-4 bg-primaryPurple/90 hover:bg-primaryPurple shadow-inner-button rounded-full text-white font-bricolage" >Return to home page</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
