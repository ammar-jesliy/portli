"use client";

import { useUser, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { AdminContext } from "../_context/AdminContext";
import SiteContent from "./_components/SiteContent";

const admin = () => {
  const { user } = useUser();
  const router = useRouter();

  const { displayMode, userDetails, theme } = useContext(AdminContext);

  useEffect(() => {
    user && checkUser();
  }, [user]);

  const checkUser = () => {
    if (userDetails === 0) {
      router.replace("/create");
    }
  };

  return (
    <div>
        <div 
          className={`min-h-screen w-full transition-all duration-300 lg:flex lg:justify-center ${displayMode === "desktop" || "sm:bg-base-200 overflow-hidden"}`}
          
        >
          <div className={displayMode === "desktop" ? "h-full w-full transition-all duration-300" : "lg:w-[400px] lg:h-[80vh] lg:max-h-[850px] lg:mt-[5vh] lg:rounded-[32px] lg:shadow-xl transition-all duration-300 lg:overflow-x-auto scrollbar-hidden"}
          data-theme={theme}
          >
            <SiteContent displayMode={displayMode}/>
          </div>
        </div>
    </div>
  );
};

export default admin;
