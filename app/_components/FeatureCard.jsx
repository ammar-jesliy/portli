import { Puzzle } from "lucide-react";
import React from "react";

const FeatureCard = ({ title, highlightedText, text, image, icon }) => {
  return (
    <div className="w-full max-w-[900px] bg-primaryPurple/15 rounded-2xl border border-black/15 p-4 sm:p-10 flex flex-col gap-3 sm:gap-6">
      <div className="flex items-center gap-2 sm:gap-8">
        {icon}
        <h3 className="text-base font-medium font-poppins sm:text-xl tracking-tight">
          {title}
        </h3>
      </div>
      <div className="mx-auto w-[80%] aspect-[1.8/1] rounded-2xl overflow-hidden relative">
        {image}
        <div className="absolute top-0 w-full h-full bg-gradient-to-b from-white/0 to-[#d7dcff] via-white/0 z-10"></div>
      </div>
      <p className="text-xs font-poppins font-medium sm:text-lg leading-[1.3] tracking-tight">
        <span className="text-primaryBlue">{highlightedText}</span> {text}
      </p>
    </div>
  );
};

export default FeatureCard;
