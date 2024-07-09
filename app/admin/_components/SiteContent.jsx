import Profile from "./Profile";
import Content from "./Content";
import MobileContent from "./MobileContent";

const SiteContent = ({ displayMode }) => {

  return (
    <div className="w-full min-h-screen relative">
      <Profile />
      <div className={` ${displayMode === "mobile" ? `block` : `lg:hidden`} `}>
        <MobileContent />
      </div>
      <div className={displayMode === "desktop" ? `lg:block hidden` : `hidden`}>
        <Content />
      </div>
    </div>
  );
};

export default SiteContent;
