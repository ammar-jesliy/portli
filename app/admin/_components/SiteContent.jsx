'use client'

import { useState, useEffect } from "react";
import Profile from "./Profile";
import Content from "./Content";
import MobileContent from "./MobileContent";

const SiteContent = ({ displayMode }) => {
  // const [isDesktop, setIsDesktop] = useState(false);

  // useEffect(() => {
  //   // Check if the code is running on the client side
  //   if (typeof window !== "undefined") {
  //     const handleResize = () => {
  //       setIsDesktop(window.innerWidth > 1024);
  //     };

  //     // Set initial state based on current window width
  //     handleResize();

  //     // Add resize event listener
  //     window.addEventListener("resize", handleResize);

  //     // Cleanup event listener on component unmount
  //     return () => {
  //       window.removeEventListener("resize", handleResize);
  //     };
  //   }
  // }, []);

  return (
    <div className="w-full min-h-screen relative">
      <Profile />
      <div className={` ${displayMode === "mobile" ? `block` : `lg:hidden`} `}>
        <MobileContent />
      </div>
      <div className={displayMode === "desktop" ? `lg:block hidden` : `hidden`}>
        <Content />
      </div>
    </div>
  );
};

export default SiteContent;
