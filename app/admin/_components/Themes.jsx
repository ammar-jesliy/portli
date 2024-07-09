"use client"

import { useContext } from "react";
import themes from "../../../app/_data/themeData";
import { AdminContext } from "../../_context/AdminContext";

const Themes = () => {

  const { setTheme } = useContext(AdminContext);

  return (
    <div className="absolute grid grid-cols-2 lg:grid-cols-3 px-2 sm:px-4 py-3 w-full max-h-80 overflow-y-scroll bg-base-100 left-0 top-[-10px] translate-y-[-100%] rounded-2xl border-2 border-base-300 animate-slide-up z-[-1] scrollbar-hidden">
      {themes.map((theme, index) => (
        <button 
          key={index} 
          className="btn rounded-md px-[1px] m-1 text-xs lg:text-sm " 
          data-theme={theme.name}
          onClick={() => setTheme(theme.name)}
        >
          <div className="flex gap-[2px]">
            <div
              className="w-2 h-6 rounded-full"
              style={{ backgroundColor: theme.primary }}
            ></div>
            <div
              className="w-2 h-6 rounded-full"
              style={{ backgroundColor: theme.secondary }}
            ></div>
            <div
              className="w-2 h-6 rounded-full"
              style={{ backgroundColor: theme.accent }}
            ></div>
            <div
              className="w-2 h-6 rounded-full"
              style={{ backgroundColor: theme["base-100"] }}
            ></div>
          </div>
          <p className="w-[55px] text-left" >{theme.name}</p>
        </button>
      ))}
    </div>
  );
};

export default Themes;
