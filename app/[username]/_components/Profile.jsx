import React from "react";
import Image from "next/image";
import iconData from "../../_data/iconData";

const Profile = ({ name, bio, image, socialLinks }) => {
  const iconMap = iconData;
  const BASE_URL = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BASE_URL;

  return (
    <>
      <div className="absolute w-full h-[250px] top-0 left-0 bg-neutral z-0"></div>
      <div className="max-w-[320px] w-[90%] min-h-[300px] bg-base-300 relative z-10 translate-x-[-50%] left-1/2 top-9 rounded-[35px] flex p-7 gap-3 lg:min-h-[350px] flex-col lg:flex-row lg:pr-10 lg:top-16 lg:max-w-[916px]">
        <div
          className={`flex flex-[2] items-center lg:justify-center justify-start`}
        >
          <div
            className={`w-[130px] h-[130px] bg-base-100 rounded-full relative group lg:h-[200px] lg:w-[200px]`}
          >
            {image && (
              <Image
                src={BASE_URL + image}
                alt="Profile Image"
                fill
                sizes="(max-width: 640px) 130px, (max-width: 1024px) 175px, 200px"
                className="rounded-full object-cover"
                priority
              />
            )}
          </div>
        </div>
        <div className="flex flex-[3] flex-col justify-center">
          <p className={`text-xl font-normal font-poppins lg:text-2xl lg:py-2`}>
            {name}
          </p>
          <p className="font-poppins leading-tight text-sm max-w-[500px] lg:text-base opacity-70 font-normal min-h-12 h-24 mb-4">
            {bio}
          </p>

          <div className="flex flex-wrap sm:gap-3 gap-2">
            {socialLinks.map((social) => {
              const IconComponent = iconMap[social.platform].icon;
              return (
                social.link !== "" && (
                  <a
                    href={social.link}
                    target="_blank"
                    key={social.platform}
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: iconMap[social.platform].color }}
                  >
                    <IconComponent color="#ffffff" size={18} />
                  </a>
                )
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
