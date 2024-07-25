import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import layout from "../../public/layout.svg";
import Image from "next/image";

const Cta = () => {
  return (
    <div>
      <div className="h-[420px] md:max-h-[500px] md:h-[50vw] px-2 flex flex-col md:flex-row-reverse md:gap-5 overflow-hidden md:pt-5 full-bleed bg-primaryTextDarkBlue">
        <div className="w-[250px] md:flex-1 flex flex-col items-center md:justify-center gap-2 md:gap-3 mx-auto py-10">
          <h3 className="text-white font-bricolage font-semibold leading-none text-lg md:text-2xl text-center">
            Start building today!
          </h3>
          <p className="text-white text-center font-poppins text-xs leading-[1.2] font-normal md:text-md">
            Transform your vision into reality with our user-friendly builder.
            Sign up now to begin.
          </p>
          <Link
            href={"/sign-up"}
            className="flex items-center justify-between w-[135px] md:w-[185px] bg-primaryPurple hover:bg-primaryPurple/90 rounded-full py-3 px-5 md:py-4 md:px-6 shadow-inner-button mt-3 md:mt-6"
          >
            <p className="text-white font-bricolage font-semibold text-xs md:text-base">
              Start now
            </p>
            <ChevronRight strokeWidth={3} className="h-4 w-4 md:w-6 md:h-6 text-white" />
          </Link>
        </div>
        <div className="md:flex-1">
          <svg className="w-full md:h-[120%]"
            width="246"
            height="293"
            viewBox="0 0 246 293"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="1"
              y="44.2784"
              width="117.095"
              height="118.384"
              rx="11.5"
              stroke="white"
              strokeOpacity="0.22"
              strokeWidth="2"
            />
            <rect
              x="1"
              y="173.616"
              width="117.095"
              height="118.384"
              rx="11.5"
              stroke="white"
              strokeOpacity="0.22"
              strokeWidth="2"
            />
            <rect
              x="1"
              y="1"
              width="244"
              height="32.3243"
              rx="11.5"
              stroke="white"
              strokeOpacity="0.22"
              strokeWidth="2"
            />
            <rect
              x="127.905"
              y="44.2784"
              width="117.095"
              height="48.7402"
              rx="11.5"
              stroke="white"
              strokeOpacity="0.22"
              strokeWidth="2"
            />
            <rect
              x="127.905"
              y="103.973"
              width="117.095"
              height="142.759"
              rx="11.5"
              stroke="white"
              strokeOpacity="0.22"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Cta;
