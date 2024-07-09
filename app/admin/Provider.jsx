"use client";

import { useEffect, useState } from "react";
import { AdminContext } from "../_context/AdminContext";
import { db } from "../../utils";
import { userInfo } from "../../utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";

const AdminProvider = ({ children }) => {
  const [displayMode, setDisplayMode] = useState("desktop");
  const [theme, setTheme] = useState("light");
  const [userDetails, setUserDetails] = useState([]);
  const [desktopLayout, setDesktopLayout] = useState([]);
  const [mobileLayout, setMobileLayout] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    user && getUserDetails();
  }, [user]);

  const getUserDetails = async () => {
    const result = await db
      .select()
      .from(userInfo)
      .where(eq(userInfo.email, user?.primaryEmailAddress.emailAddress));

    setUserDetails(result);
  };

  const refreshUserDetails = () => {
    getUserDetails();
  }

  const addComponent = (component) => {
    setDesktopLayout([...desktopLayout, component]);
    setMobileLayout([...mobileLayout, component]);
  };

  return (
    <AdminContext.Provider
      value={{
        displayMode,
        setDisplayMode,
        setUserDetails,
        userDetails,
        theme,
        setTheme,
        refreshUserDetails,
        addComponent,
        desktopLayout,
        setDesktopLayout,
        mobileLayout,
        setMobileLayout
      }}
    >
      <div>{children}</div>
    </AdminContext.Provider>
  );
};

export default AdminProvider;
