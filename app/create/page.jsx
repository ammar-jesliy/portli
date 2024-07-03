"use client"

import { useState, useEffect} from "react";
import { ArrowRight } from 'lucide-react';
import { toast } from "react-toastify";
import { db } from "../../utils";
import { eq } from "drizzle-orm";
import { userInfo } from "../../utils/schema";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const createPage = () => {

  const router = useRouter();
  const { user } = useUser();
  const [sitename, setSitename] = useState('');

  useEffect(() => {
    user && checkUser();
  }, [user]);

  const checkUser = async () => {
    const result = await db
      .select()
      .from(userInfo)
      .where(eq(userInfo.email, user?.primaryEmailAddress.emailAddress));

    if (result.length > 0) {
      router.replace("/admin");
    }
  };

  const checkValidUsername = (sitename) => {
    const allowedChars = /^[a-zA-Z0-9-_]+$/;
    return allowedChars.test(sitename);
  }

  const checkUsernameExists = async (sitename) => {
    const result = await db.select().from(userInfo).where(eq(userInfo.username, sitename));

    return result.length > 0;
  }

  const onCreateButtonClick = async () => {
    if (sitename.length > 30) {
      toast.error("Site-name must be less than 30 characters", {
        position: "top-right"
      });

      return ;
    } else if (!checkValidUsername(sitename)) {
      toast.error("Site-name can only contain letters, numbers, and hyphens", {
        position: "top-right"
      });

      return ;
    } else if (await checkUsernameExists(sitename)) {
      toast.error("Site-name already exists", {
        position: "top-right"
      });
    }

    const result = await db.insert(userInfo)
    .values({
      name: user?.fullName,
      email: user?.primaryEmailAddress.emailAddress,
      username: sitename
    })

    if (result) {
      toast.success("Site created successfully", {
        position: "top-right"
      });

      router.replace("/admin");
    }

  }

  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center font-poppins">
        <div className="flex items-center flex-col gap-14 px-5 pb-8">
          <div className="flex flex-col items-center gap-4">
            <h4 className="text-xl font-semibold tracking-tight text-center leading-9">
              First, let’s choose a name for your site
            </h4>
            <p className="text-md font-normal text-gray-500 tracking-tight text-center leading-snug">
              Pick a name that represents you or your brand.
            </p>
          </div>
          <div className="flex gap-2">
            <label className="input flex items-center gap-[2px] bg-base-300 min-w-52 max-w-80 w-[70vw]">
              portli.me/
              <input 
                type="text" 
                className="grow" 
                placeholder="site-name"
                spellCheck="false"
                onChange={(e) => setSitename(e.target.value)} 
              />
            </label>
            <button 
              disabled={!sitename} 
              className="btn btn-primary"
              onClick={() => onCreateButtonClick()}
            ><ArrowRight /></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default createPage;
