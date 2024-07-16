"use client";

import { useContext } from "react";
import { UserPageContext } from "../_context/UserPageContext";
import Profile from "./_components/Profile";
import MobileContent from "./_components/MobileContent";
import DesktopContent from "./_components/DesktopContent";
import Footer from "./_components/Footer";

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
      
      <div className="block lg:hidden" >
        <MobileContent />
      </div>
      <div className="hidden lg:block" >
        <DesktopContent />
      </div>

      <Footer />
    </div>
  );
};

export default UserPage;
