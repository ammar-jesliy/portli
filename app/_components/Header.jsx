import React from "react";
import Logo from "../../public/Logo-text.svg";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <section className="flex justify-between items-center sm:px-4">
      <Image src={Logo} alt="Logo" width={100} />
      <div className="flex items-center gap-2">
        <Link
          href="/sign-up"
          className="text-sm text-primaryTextDarkBlue font-bricolage font-normal border border-primaryTextDarkBlue/10 px-4 sm:px-6 py-3 rounded-xl hover:bg-primaryTextDarkBlue/5 whitespace-nowrap transition-colors"
        >
          Sign Up
        </Link>
        <Link
          href="/sign-in"
          className="text-sm font-bricolage font-normal bg-primaryPurple/90 px-4 sm:px-6 py-3 rounded-xl text-white shadow-inner-button hover:bg-primaryPurple transition-colors whitespace-nowrap"
        >
          Log In
        </Link>
      </div>
    </section>
  );
};

export default Header;
