"use client";

import { useUser, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { AdminContext } from "../_context/AdminContext";
import SiteContent from "./_components/SiteContent";

const admin = () => {
  const { user } = useUser();
  const router = useRouter();

  const { displayMode, userDetails } = useContext(AdminContext);

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
          className="min-h-screen w-screen"
          data-theme="light"
        >
          <SiteContent />
        </div>
      ) : (
        <div className="flex justify-center bg-base-200 min-h-screen">
          <div 
            className="w-[400px] h-[80vh] mt-[5vh] border-4 bg-base border-black rounded-3xl"
            data-theme="light"
          >
            <SiteContent />
          </div>
        </div>
      )}

    </div>
  );
};

export default admin;
