"use client";

import { useContext } from "react";
import { UserPageContext } from "../_context/UserPageContext";
import Profile from "./_components/Profile";

const UserPage = () => {
  const { userDetails, socials, layouts, userComponents } =
    useContext(UserPageContext);

  console.log(socials);
  console.log(layouts);
  console.log(userComponents);

  if (userDetails.length === 0) {
    return <div>User not found</div>;
  }

  return (
    <div className="w-full min-h-screen">
      <Profile name={userDetails[0]?.name} bio={userDetails[0]?.bio} image={userDetails[0]?.profileImage} socialLinks={socials} />
    </div>
  );
};

export default UserPage;
