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

  const checkUser = async () => {
    if (userDetails === 0) {
      router.replace("/create");
    }
  };

  return (
    <div>
      {displayMode === "desktop" ? (
        <div 
          className="min-h-screen w-screen transition-all duration-500"
          data-theme={theme}
        >
          <SiteContent />
        </div>
      ) : (
        <div className="sm:flex sm:justify-center sm:bg-base-200 min-h-screen w-screen transition-all duration-700 overflow-hidden">
          <div 
            className="sm:w-[440px] sm:h-[80vh] sm:max-h-[850px] sm:mt-[5vh] sm:rounded-[32px] sm:shadow-xl transition-all duration-500 sm:overflow-x-auto scrollbar-hidden"
            data-theme={theme}
          >
            <SiteContent />
          </div>
        </div>
      )}

    </div>
  );
};

export default admin;
