"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { UserPageContext } from "../_context/UserPageContext";
import { db } from "../../utils";
import {
  userInfo,
  userSocials,
  userLayouts,
  components,
} from "../../utils/schema";
import { eq } from "drizzle-orm";

const UserPageProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState([]);
  const [socials, setSocials] = useState([]);
  const [layouts, setLayouts] = useState([]);
  const [userComponents, setUserComponents] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const pathname = usePathname();

  useEffect(() => {
    getUserDetails();
  }, [pathname]);

  useEffect(() => {
    userDetails.length > 0 && getUserSocials();
    userDetails.length > 0 && getUserLayouts();
    userDetails.length > 0 && getUserComponents();
  }, [userDetails]);

  const getUserDetails = async () => {
    setIsFetching(true);
    const result = await db
      .select()
      .from(userInfo)
      .where(eq(userInfo.username, pathname.split("/")[1]));

    if (result.length > 0) {
      setUserDetails(result);
    }
    setIsFetching(false);
  };

  const getUserSocials = async () => {
    const result = await db
      .select()
      .from(userSocials)
      .where(eq(userSocials.userId, userDetails[0].id));

    if (result.length > 0) {
      setSocials(result);
    }
  };

  const getUserLayouts = async () => {
    const result = await db
      .select()
      .from(userLayouts)
      .where(eq(userLayouts.userId, userDetails[0].id));

    if (result.length > 0) {
      setLayouts(result);
    }
  };

  const getUserComponents = async () => {
    const result = await db
      .select()
      .from(components)
      .where(eq(components.userId, userDetails[0].id));

    if (result.length > 0) {
      setUserComponents(result);
    }
  };

  return (
    <UserPageContext.Provider
      value={{ userDetails, socials, layouts, userComponents, isFetching }}
    >
      <div data-theme={userDetails[0]?.theme}>{children}</div>
    </UserPageContext.Provider>
  );
};

export default UserPageProvider;
