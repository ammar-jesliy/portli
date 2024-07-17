"use client";

import { useEffect, useState } from "react";
import { AdminContext } from "../_context/AdminContext";
import { db } from "../../utils";
import { components, userInfo, userLayouts } from "../../utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../../utils/firebaseConfig";

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

  useEffect(() => {
    userDetails.length > 0 && getLayouts();
    userDetails.length > 0 && getTheme();
  }, [userDetails]);

  useEffect(() => {
    userDetails.length > 0 && saveLayouts();
  }, [desktopLayout, mobileLayout]);

  useEffect(() => {
    userDetails.length > 0 && saveTheme();
  }, [theme]);

  const getUserDetails = async () => {
    const result = await db
      .select()
      .from(userInfo)
      .where(eq(userInfo.email, user?.primaryEmailAddress.emailAddress));

    setUserDetails(result);
  };

  const refreshUserDetails = () => {
    getUserDetails();
  };

  const getTheme = async () => {
    if (userDetails.length > 0) {
      setTheme(userDetails[0].theme);
    }
  };

  const saveTheme = async () => {
    if (userDetails.length > 0) {
      const result = await db
        .update(userInfo)
        .set({ theme: theme })
        .where(eq(userInfo.email, user?.primaryEmailAddress.emailAddress));
    }
  };

  const addComponent = async (component) => {
    setDesktopLayout([...desktopLayout, component]);
    setMobileLayout([...mobileLayout, component]);

    const result = await db
      .insert(components)
      .values({
        userId: userDetails[0].id,
        componentId: component.i,
        type: component.i.split("-")[0],
      });

    if (result) {
      console.log("Component added successfully");
    } else {
      console.log("Error adding component");
    }
  };

  const removeComponent = async (componentId, image) => {
    setDesktopLayout(desktopLayout.filter((item) => item.i !== componentId));
    setMobileLayout(mobileLayout.filter((item) => item.i !== componentId));

    if (componentId.split("-")[0] === "image" && image) {

      // Delete image from storage
      const storageRef = ref(storage, image.split("?")[0]);

      deleteObject(storageRef)
      .then(() => {
        console.log("Deleted image");
      })
      .catch((error) => {
        console.error("Error deleting image", error); 
      })

    }

    const result = await db
      .delete(components)
      .where(eq(components.componentId, componentId));

    if (result) {
      console.log("Component removed successfully");
    } else {
      console.log("Error removing component");
    }
  }

  const getLayouts = async () => {
    const result = await db
      .select()
      .from(userLayouts)
      .where(eq(userLayouts.userId, userDetails[0].id));

    if (result.length > 0) {
      setDesktopLayout(result[0].desktopLayout);
      setMobileLayout(result[0].mobileLayout);
    } else {
      console.log("No layouts found");
    }
  };

  const saveLayouts = async () => {
    const mobileLayoutJson = mobileLayout ? JSON.stringify(mobileLayout) : "[]";
    const desktopLayoutJson = desktopLayout
      ? JSON.stringify(desktopLayout)
      : "[]";

    if (userDetails.length > 0) {
      const result = await db
        .insert(userLayouts)
        .values({
          userId: userDetails[0].id,
          desktopLayout: desktopLayoutJson,
          mobileLayout: mobileLayoutJson,
        })
        .onConflictDoUpdate({
          target: userLayouts.userId,
          set: {
            desktopLayout: desktopLayoutJson,
            mobileLayout: mobileLayoutJson,
          },
        });

      if (result) {
        console.log("Layouts saved successfully");
      } else {
        console.log("Error saving layouts");
      }
    }
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
        removeComponent,
        desktopLayout,
        setDesktopLayout,
        mobileLayout,
        setMobileLayout,
      }}
    >
      <div>{children}</div>
    </AdminContext.Provider>
  );
};

export default AdminProvider;
