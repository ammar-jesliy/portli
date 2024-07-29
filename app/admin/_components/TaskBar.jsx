"use client";

import React, { useState, useContext } from "react";
import { UserButton } from "@clerk/nextjs";
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
} from "lucide-react";
import Themes from "./Themes";
import Items from "./Items";
import { AdminContext } from "../../_context/AdminContext";

const TaskBar = () => {
  const [showItems, setShowItems] = useState(false);
  const [showThemes, setShowThemes] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { displayMode, setDisplayMode, addComponent } =
    useContext(AdminContext);

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <div className="flex items-center fixed bottom-7 h-[60px] w-max bg-base-100 left-1/2 translate-x-[-50%] rounded-2xl shadow-[0px_5px_9px_0px_rgba(0,0,0,0.25)] border-2 border-base-300 sm:px-5 px-[10px] sm:gap-1 gap-[2px] z-10">
      {showItems && <Items onItemClick={addComponent} />}

      {showThemes && <Themes />}

      {pathname === "/admin" ? (
        <>
          <div className="hidden lg:flex gap-1">
            <button
              className={`btn btn-sm ${
                displayMode === "desktop" ? `btn-neutral` : `btn-ghost`
              }`}
              onClick={() => setDisplayMode("desktop")}
            >
              <Monitor size={20} />
            </button>

            <button
              className={`btn btn-sm ${
                displayMode === "mobile" ? `btn-neutral` : `btn-ghost`
              }`}
              onClick={() => setDisplayMode("mobile")}
            >
              <Smartphone size={20} />
            </button>
          </div>
          <div className="hidden lg:block h-1/3 w-[3px] bg-base-300 rounded-full mx-1"></div>

          <button
            className="btn btn-neutral btn-sm w-[85px] sm:w-[110px] flex-nowrap"
            onClick={() => {
              setShowThemes(false);
              setShowItems(!showItems);
            }}
          >
            {showItems ? (
              <>
                <ChevronDown size={16} />
                <p>Close</p>
              </>
            ) : (
              <>
                <Component size={16} />
                <p className="text-nowrap">
                  Add <span className="sm:inline hidden">Item</span>
                </p>
              </>
            )}
          </button>

          <button
            className={`btn btn-sm ${
              showThemes ? `btn-neutral` : `btn-ghost`
            }  sm:tooltip tooltip-top px-1 sm:px-2 transition`}
            data-tip="Themes"
            onClick={() => {
              setShowItems(false);
              setShowThemes(!showThemes);
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
          isActive("/admin/analytics") ? "btn-neutral" : "btn-ghost"
        }`}
        data-tip="Analytics"
        onClick={() => {
          setShowItems(false);
          setShowThemes(false);
          router.push("/admin/analytics");
        }}
      >
        <LineChart className="w-5 sm:w-6" />
      </button>

      <button
        className={`btn btn-sm sm:tooltip tooltip-top px-1 sm:px-2 ${
          isActive("/admin/templates") ? "btn-neutral" : "btn-ghost"
        }`}
        data-tip="Templates"
        onClick={() => {
          setShowItems(false);
          setShowThemes(false);
          router.push("/admin/templates");
        }}
      >
        <LayoutPanelTop className="w-5 sm:w-6" />
      </button>

      <div className="h-1/3 w-[3px] bg-base-300 rounded-full sm:mx-1 mx-[2px]"></div>
      <label className="grid cursor-pointer place-items-center mx-1">
        <input
          type="checkbox"
          value="dark"
          className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
        />
        <svg
          className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
        <svg
          className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </label>
      <UserButton />
    </div>
  );
};

export default TaskBar;
