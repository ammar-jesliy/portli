"use client";

import React, { useContext } from "react";
import { useUser } from "@clerk/nextjs";
import { AdminContext } from "../../_context/AdminContext";
import { toast } from "react-toastify";
import { userInfo } from "../../../utils/schema";
import { db } from "../../../utils";
import { eq } from "drizzle-orm";
import { Pencil } from "lucide-react";
import Socials from "./Socials";

const Profile = () => {
  const { userDetails, displayMode, refreshUserDetails } = useContext(AdminContext);
  const { user } = useUser();
  let timeoutId;


  const handleBioInput = (bio) => {
    const lineCount = bio.split(/\r\n|\r|\n/).length;

    if (bio.length === 120) {
      toast.info("Max length is 150 characters", {
        position: "top-right",
      });
      return;
    } else if (lineCount === 5) {
      toast.warn("A maximum of 4 lines is recommended for the bio", {
        position: "top-right",
      });
      return;
    }

    clearTimeout(timeoutId);
    timeoutId = setTimeout(async () => {
      console.log("Updating bio...");

      const result = await db.update(userInfo)
      .set({ 'bio': bio })
      .where(eq(userInfo.email, user?.primaryEmailAddress.emailAddress));

      if (result) {
        refreshUserDetails();
        toast.success("Bio updated successfully", {
          position: "top-right",
        });
      } else {
        toast.error("Failed to update bio", {
          position: "top-right",
        });
      }

    }, 3000);

  }


  return (
    <>
      <div className="absolute w-full h-[250px] top-0 left-0 bg-neutral z-0"></div>
      <div
        className={`max-w-[1000px] w-[90%] min-h-[300px] bg-base-300 relative z-10 translate-x-[-50%] left-1/2 top-16 rounded-[35px] flex p-7 gap-3 ${
          displayMode === "mobile"
            ? "flex-col p-7 pr-7 top-9"
            : `lg:h-[350px] flex-col sm:flex-row sm:pr-10`
        } `}
      >
        <div
          className={`flex flex-[2] items-center ${
            displayMode === "mobile" ? `justify-start` : `sm:justify-center`
          }`}
        >
          <div
            className={`w-[130px] h-[130px] bg-base-100 rounded-full relative group ${
              displayMode === "mobile"
                ? `mt-0`
                : `lg:h-[200px] lg:w-[200px] sm:w-[175px] sm:h-[175px]`
            }`}
          >
            <div className="h-[30px] w-[30px] bg-base-100 absolute top-[85%] left-[85%] translate-x-[-50%] translate-y-[-50%] rounded-full sm:hidden group-hover:flex items-center justify-center drop-shadow-md flex">
              <Pencil size={16}/>
            </div>
          </div>
        </div>
        <div className="flex flex-[3] flex-col justify-center">
          <p
            className={`text-xl font-normal font-poppins ${
              displayMode === "mobile" ? `text-xl` : `sm:text-2xl sm:py-2`
            }`}
          >
            {user?.fullName}
          </p>
          <textarea
            className={`textarea textarea-ghost font-poppins p-0 mb-4 rounded-lg leading-tight text-sm max-w-[500px] overflow-clip font-normal opacity-70 bg-base-300 .scrollbar-hidden ${displayMode === "mobile" ? `text-sm` : `sm:text-base`}`}
            placeholder="Bio..."
            defaultValue={userDetails[0]?.bio}
            rows={4}
            maxLength={150}
            onChange={(e) => handleBioInput(e.target.value)}
          ></textarea>
          <Socials />
        </div>
      </div>
    </>
  );
};

export default Profile;
