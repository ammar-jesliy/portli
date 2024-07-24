import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="flex flex-col items-center gap-24 w-full mt-16 sm:mt-[100px]">
      <div className="flex items-center flex-col justify-center gap-8 sm:gap-10">
        <h1 className="max-w-[320px] font-bricolage text-center font-medium text-primaryTextDarkBlue text-3xl leading-[1] tracking-tight sm:text-[85px] sm:max-w-[665px]">
          Craft your unique microsite
          <br />{" "}
          <span className="bg-gradient-to-r from-primaryLightBlue to-primaryBlue text-transparent bg-clip-text">
            with ease
          </span>
        </h1>
        <Link
          href="/sign-up"
          className="w-[150px] h-[48px] sm:w-[210px] sm:h-[66px] group flex items-center rounded-full bg-primaryPurple relative shadow-inner-button"
        >
          <div className="w-10 h-10 sm:w-[54px] sm:h-[54px] flex items-center justify-center rounded-full bg-gradient-to-b from-white to-[#D9D9D9] absolute left-1 sm:left-[6px] group-hover:w-[calc(100%-8px)] sm:group-hover:w-[calc(100%-12px)] transition-all duration-500 origin-left shadow">
            <ArrowRight
              strokeWidth={3}
              className="text-primaryPurple w-4 h-4 sm:w-6 sm:h-6"
            />
          </div>
          <p className="text-sm font-semibold text-white pl-[52px] sm:pl-[78px] sm:text-base font-bricolage">
            Get Started
          </p>
        </Link>
      </div>
      <div className="w-full max-w-[1000px] aspect-[1.6/1] border border-black/10 rounded-[38px] flex items-center justify-center p-[10px]">
        <div className="w-full h-full rounded-[28px] border border-black/10 p-2 bg-black/5">
          <div className="w-full h-full rounded-[20px] border bg-white shadow-lg">

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
