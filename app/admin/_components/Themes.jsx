"use client";

import { useContext } from "react";
import themes from "../../../app/_data/themeData";
import { AdminContext } from "../../_context/AdminContext";
import { BadgeCheck } from "lucide-react";

const Themes = () => {
  const { setTheme, theme } = useContext(AdminContext);

  return (
    <div className="absolute grid grid-cols-2 lg:grid-cols-3 px-2 sm:px-4 py-3 w-full max-h-80 overflow-y-scroll bg-base-100 left-0 top-[-10px] translate-y-[-100%] rounded-2xl border-1 border-base-300 animate-slide-up z-[-1] scrollbar-hidden">
      {themes.map((themeData, index) => (
        <button
          key={index}
          className="btn rounded-md px-[1px] m-1 text-xs lg:text-sm relative overflow-hidden"
          data-theme={themeData.name}
          onClick={() => setTheme(themeData.name)}
        >
          {theme === themeData.name && (
            <div className="absolute right-0 w-1/3 flex items-center justify-center bg-green-400 h-full rounded-l-full ">
              <BadgeCheck size={24} color="white" />
            </div>
          )}
          <div className="flex gap-[2px]">
            <div
              className="w-2 h-6 rounded-full"
              style={{ backgroundColor: themeData.primary }}
            ></div>
            <div
              className="w-2 h-6 rounded-full"
              style={{ backgroundColor: themeData.secondary }}
            ></div>
            <div
              className="w-2 h-6 rounded-full"
              style={{ backgroundColor: themeData.accent }}
            ></div>
            <div
              className="w-2 h-6 rounded-full"
              style={{ backgroundColor: themeData["base-100"] }}
            ></div>
          </div>
          <p className="w-[55px] text-left">{themeData.name}</p>
        </button>
      ))}
    </div>
  );
};

export default Themes;
