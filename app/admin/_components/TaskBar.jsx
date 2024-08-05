"use client";

import React, { useState, useContext } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutPanelTop,
  LineChart,
  Component,
  Smartphone,
  Monitor,
  ChevronDown,
  Brush,
  House,
  X,
} from "lucide-react";
import Themes from "./Themes";
import Items from "./Items";
import Settings from "./Settings";
import { AdminContext } from "../../_context/AdminContext";
import { toast } from "react-toastify";

const TaskBar = () => {
  const [showItems, setShowItems] = useState(false);
  const [showThemes, setShowThemes] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { user } = useUser();

  const { displayMode, setDisplayMode, addComponent, userDetails } =
    useContext(AdminContext);

  const isActive = (path) => {
    return pathname === path;
  };

  const copyToClipboard = async () => {
    const url = "https://portli.vercel.app/" + userDetails[0]?.username;

    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to Clipboard", {
        position: "top-right",
      });
    } catch (error) {
      console.log("failed to copy text: ", error);
    }
  };

  return (
    <div className="flex items-center fixed bottom-7 h-[60px] w-max bg-base-100 left-1/2 translate-x-[-50%] rounded-2xl shadow-[0px_5px_9px_0px_rgba(0,0,0,0.25)] border-1 border-base-300 sm:px-5 px-[10px] sm:gap-1 gap-1 z-10">
      {showItems && <Items onItemClick={addComponent} />}

      {showThemes && <Themes />}

      {showSettings && <Settings />}

      {pathname === "/admin" ? (
        <>
          <div className="hidden lg:flex gap-1">
            <button
              className={`btn btn-sm ${
                displayMode === "desktop" ? `btn-neutral bg-black` : `btn-ghost`
              }`}
              onClick={() => setDisplayMode("desktop")}
            >
              <Monitor size={20} />
            </button>

            <button
              className={`btn btn-sm ${
                displayMode === "mobile" ? `btn-neutral bg-black` : `btn-ghost`
              }`}
              onClick={() => setDisplayMode("mobile")}
            >
              <Smartphone size={20} />
            </button>
          </div>
          <div className="hidden lg:block h-1/3 w-[3px] bg-base-300 rounded-full mx-1"></div>

          <button
            className="btn btn-neutral bg-black btn-sm w-[75px] sm:w-[110px] flex-nowrap px-2 sm:px-3"
            onClick={() => {
              setShowItems(!showItems);
              setShowThemes(false);
              setShowSettings(false);
            }}
          >
            {showItems ? (
              <>
                <ChevronDown size={16} />
                <p>Close</p>
              </>
            ) : (
              <>
                <Component size={14} />
                <p className="text-nowrap text-xs font-poppins">
                  Add <span className="sm:inline hidden">Item</span>
                </p>
              </>
            )}
          </button>

          <button
            className={`btn btn-sm ${
              showThemes ? `btn-neutral bg-black` : `btn-ghost`
            }  sm:tooltip tooltip-top px-1 sm:px-2 transition`}
            data-tip="Themes"
            onClick={() => {
              setShowThemes(!showThemes);
              setShowItems(false);
              setShowSettings(false);
            }}
          >
            {showThemes ? (
              <ChevronDown className="w-5 sm:w-6" />
            ) : (
              <Brush className="w-5 sm:w-6" />
            )}
          </button>
        </>
      ) : (
        <button
          className="btn btn-sm btn-ghost sm:tooltip tooltip-top px-1 sm:px-2"
          data-tip="Home"
          onClick={() => {
            router.push("/admin");
          }}
        >
          <House className="w-5 sm:w-6" />
        </button>
      )}

      <button
        className={`btn btn-sm sm:tooltip tooltip-top px-1 sm:px-2 ${
          isActive("/admin/analytics") ? "btn-neutral bg-black" : "btn-ghost"
        }`}
        data-tip="Analytics"
        onClick={() => {
          setShowItems(false);
          setShowThemes(false);
          setShowSettings(false);
          router.push("/admin/analytics");
        }}
      >
        <LineChart className="w-5 sm:w-6" />
      </button>

      <button
        className={`btn btn-sm sm:tooltip tooltip-top px-1 sm:px-2 ${
          isActive("/admin/templates") ? "btn-neutral bg-black" : "btn-ghost"
        }`}
        data-tip="Templates"
        onClick={() => {
          setShowItems(false);
          setShowThemes(false);
          setShowSettings(false);
          router.push("/admin/templates");
        }}
      >
        <LayoutPanelTop className="w-5 sm:w-6" />
      </button>

      <div className="h-1/3 w-[3px] bg-base-300 rounded-full sm:mx-1"></div>

      <button
        className="btn btn-sm px-2 sm:px-3 font-poppins text-xs bg-primaryLightBlue text-white hover:bg-primaryLightBlue/80 mx-1"
        onClick={copyToClipboard}
      >
        Copy Link
      </button>

      <button
        className={`rounded-full w-7 h-7 flex items-center justify-center hover:opacity-90 ${showSettings && 'bg-black'}`}
        onClick={() => {
          setShowSettings(!showSettings)
          setShowItems(false)
          setShowThemes(false)
        }}
      >
        {showSettings ? (
          <ChevronDown size={20} color="white" />
        ) : (
          <img
            src={user?.imageUrl}
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        )}
      </button>

      {/* <UserButton /> */}
    </div>
  );
};

export default TaskBar;
