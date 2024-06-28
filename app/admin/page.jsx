"use client";

import { useUser, UserButton } from "@clerk/nextjs";
import { db } from "../../utils";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { userInfo } from "../../utils/schema";

const admin = () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    user && checkUser();
  }, [user]);

  const checkUser = async () => {
    const result = await db
      .select()
      .from(userInfo)
      .where(eq(userInfo.email, user?.primaryEmailAddress.emailAddress));

    if (result.length === 0) {
      router.replace("/create");
    }
  };

  return (
    <div>
      <h1>Admin page</h1>
      <p>{user?.primaryEmailAddress.emailAddress}</p>
      <p>{user?.fullName}</p>
      <UserButton />
    </div>
  );
};

export default admin;
