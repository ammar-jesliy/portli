"use client";

import React, { useState, useEffect, useContext } from "react";
import {
  SiYoutube,
  SiInstagram,
  SiGithub,
  SiLinkedin,
  SiFacebook,
  SiDribbble,
  SiMedium,
  SiX,
  SiSnapchat,
  SiTiktok,
} from "@icons-pack/react-simple-icons";
import { Share2, Plus } from "lucide-react";
import { db } from "../../../utils";
import { useUser } from "@clerk/nextjs";
import { userInfo, userSocials } from "../../../utils/schema";
import { eq, and } from "drizzle-orm";
import { toast } from "react-toastify";
import { AdminContext } from "../../_context/AdminContext";
import iconData from "../../_data/iconData";

const Socials = () => {
  const [socialLinks, setSocialLinks] = useState({});
  const { user } = useUser();
  const { userDetails } = useContext(AdminContext);

  const iconMap = iconData;

  useEffect(() => {
    user && getExistingSocials();
  }, [user]);

  const getExistingSocials = async () => {
    // Fetch social links from the database
    const result = await db
      .select()
      .from(userSocials)
      .innerJoin(userInfo, eq(userInfo.id, userSocials.userId))
      .where(eq(userInfo.email, user?.primaryEmailAddress.emailAddress));

    if (result) {
      const newSocialLinks = result.reduce(
        (acc, social) => {
          // Accumulate updates in a temporary object
          acc[social.user_socials.platform] = social.user_socials.link;
          return acc;
        },
        { ...socialLinks }
      ); // Start with a copy of the current state

      setSocialLinks(newSocialLinks); // Update the state once with all changes
    }
  };

  const handleChange = (platform, link) => {
    setSocialLinks({ ...socialLinks, [platform]: link });
  };

  const handleSaveSocials = async () => {
    try {
      const operations = Object.keys(socialLinks).map((platform) => {
        const updateOrInsert = async () => {
          const social = await db
            .select()
            .from(userSocials)
            .where(
              and(
                eq(userDetails[0]?.id, userSocials.userId),
                eq(userSocials.platform, platform)
              )
            );
          if (social.length > 0) {
            return db
              .update(userSocials)
              .set({ link: socialLinks[platform] })
              .where(
                and(
                  eq(userDetails[0]?.id, userSocials.userId),
                  eq(userSocials.platform, platform)
                )
              );
          } else {
            return db.insert(userSocials).values({
              userId: userDetails[0]?.id,
              platform: platform,
              link: socialLinks[platform],
            });
          }
        };
        return updateOrInsert();
      });

      await Promise.all(operations);
      getExistingSocials();
      toast.success("Social links saved successfully", {
        position: "top-right",
      });
    } catch (error) {
      console.error("Failed to save social links", error);
      // Handle error appropriately
    }
  };

  return (
    <div className="flex flex-wrap sm:gap-3 gap-2">
      {Object.entries(socialLinks).map(([platform, link]) => {
        const IconComponent = iconMap[platform].icon;
        return (
          link !== "" && (
            <a
              href={link}
              target="_blank"
              key={platform}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: iconMap[platform].color }}
            >
              <IconComponent color="#ffffff" size={18} />
            </a>
          )
        );
      })}

      {/* Add socials modal */}
      <button
        className="btn btn-sm btn-neutral py-0 h-10 rounded-full flex items-center justify-center"
        onClick={() => document.getElementById("socials_modal").showModal()}
      >
        <Plus size={18} />
        <p className="font-bold font-sans">Edit Socials</p>
      </button>
      {/* Open the modal*/}
      <dialog id="socials_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Paste Your Social Links</h3>
          <div className="form-control pt-4 flex flex-col gap-3">
            <label className="input input-bordered flex items-center gap-2 overflow-hidden">
              <div className="flex items-center justify-start gap-2 w-28">
                <SiInstagram size={20} />
                <p className="font-semibold">Instagram</p>
              </div>
              <input
                type="text"
                name="instagram"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                defaultValue={socialLinks.instagram}
                className="grow text-blue-600"
                autoCorrect="off"
                placeholder="https://instagram.com/youraccount"
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 overflow-hidden">
              <div className="flex items-center justify-start gap-2 w-28">
                <SiYoutube size={20} />
                <p className="font-semibold">Youtube</p>
              </div>
              <input
                type="text"
                name="youtube"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                defaultValue={socialLinks.youtube}
                className="grow text-blue-600"
                autoCorrect="off"
                placeholder="https://youtube.com/youraccount"
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 overflow-hidden">
              <div className="flex items-center justify-start gap-2 w-28">
                <SiX size={20} />
                <p className="font-semibold">X</p>
              </div>
              <input
                type="text"
                name="x"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                defaultValue={socialLinks.x}
                className="grow text-blue-600"
                autoCorrect="off"
                placeholder="https://x.com/youraccount"
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 overflow-hidden">
              <div className="flex items-center justify-start gap-2 w-28">
                <SiFacebook size={20} />
                <p className="font-semibold">Facebook</p>
              </div>
              <input
                type="text"
                name="facebook"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                defaultValue={socialLinks.facebook}
                className="grow text-blue-600"
                autoCorrect="off"
                placeholder="https://facebook.com/youraccount"
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 overflow-hidden">
              <div className="flex items-center justify-start gap-2 w-28">
                <SiTiktok size={20} />
                <p className="font-semibold">TikTok</p>
              </div>
              <input
                type="text"
                name="tiktok"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                defaultValue={socialLinks.tiktok}
                className="grow text-blue-600"
                autoCorrect="off"
                placeholder="https://tiktok.com/youraccount"
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 overflow-hidden">
              <div className="flex items-center justify-start gap-2 w-28">
                <SiLinkedin size={20} />
                <p className="font-semibold">LinkedIn</p>
              </div>
              <input
                type="text"
                name="linkedin"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                defaultValue={socialLinks.linkedin}
                className="grow text-blue-600"
                autoCorrect="off"
                placeholder="https://linkedin.com/youraccount"
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 overflow-hidden">
              <div className="flex items-center justify-start gap-2 w-28">
                <SiGithub size={20} />
                <p className="font-semibold">Github</p>
              </div>
              <input
                type="text"
                name="github"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                defaultValue={socialLinks.github}
                className="grow text-blue-600"
                autoCorrect="off"
                placeholder="https://github.com/youraccount"
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 overflow-hidden">
              <div className="flex items-center justify-start gap-2 w-28">
                <SiDribbble size={20} />
                <p className="font-semibold">Dribbble</p>
              </div>
              <input
                type="text"
                name="dribbble"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                defaultValue={socialLinks.dribbble}
                className="grow text-blue-600"
                autoCorrect="off"
                placeholder="https://dribbble.com/youraccount"
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 overflow-hidden">
              <div className="flex items-center justify-start gap-2 w-28">
                <SiMedium size={20} />
                <p className="font-semibold">Medium</p>
              </div>
              <input
                type="text"
                name="medium"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                defaultValue={socialLinks.medium}
                className="grow text-blue-600"
                autoCorrect="off"
                placeholder="https://medium.com/youraccount"
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 overflow-hidden">
              <div className="flex items-center justify-start gap-2 w-28">
                <SiSnapchat size={20} />
                <p className="font-semibold">SnapChat</p>
              </div>
              <input
                type="text"
                name="snapchat"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                defaultValue={socialLinks.snapchat}
                className="grow text-blue-600"
                autoCorrect="off"
                placeholder="https://snapchat.com/youraccount"
              />
            </label>
          </div>
          <div className="modal-action">
            <form method="dialog" className="flex gap-3">
              <button className="btn">Close</button>
              <button className="btn btn-success" onClick={handleSaveSocials}>
                Save
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Socials;
