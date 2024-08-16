import { SignOutButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { LogOut, Trash2 } from "lucide-react";
import React, { useContext } from "react";
import { db } from "../../../utils";
import {
  components,
  userInfo,
  userLayouts,
  userSocials,
} from "../../../utils/schema";
import { eq } from "drizzle-orm";
import { AdminContext } from "../../_context/AdminContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { storage } from "../../../utils/firebaseConfig";
import { deleteObject, getStorage, listAll, ref } from "firebase/storage";
import { motion } from "framer-motion";

const Settings = () => {
  const { user } = useUser();
  const { userDetails } = useContext(AdminContext);
  const router = useRouter();

  // Delete user image files from firebase storage
  const deleteUserFiles = async (username) => {
    const listRef = ref(storage, username);

    try {
      listAll(listRef).then((res) => {
        let filenames = [];
        res.items.map((item) => {
          filenames = [...filenames, item.fullPath];
        });
        console.log(filenames);

        filenames.map(async (file) => {
          let imageRef = ref(storage, file);

          deleteObject(imageRef)
            .then(() => {
              console.log(file + " has been deleted");
            })
            .catch((error) => {
              console.log("Error deleting " + file + " " + error);
            });
        });
        console.log("All files have been deleted");
      });
    } catch (error) {
      console.log("Error in deleting files", error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      router.replace("/");
      await deleteUserFiles(userDetails[0]?.username);

      await db
        .delete(userSocials)
        .where(eq(userDetails[0]?.id, userSocials.userId));
      await db
        .delete(components)
        .where(eq(userDetails[0].id, components.userId));
      await db
        .delete(userLayouts)
        .where(eq(userDetails[0].id, userLayouts.userId));
      await db.delete(userInfo).where(eq(userDetails[0].id, userInfo.id));

      await user.delete();

      toast.success(
        "Your account and all associated data have been deleted successfully",
        {
          position: "top-right",
        }
      );
    } catch (error) {
      console.log("Error Deleting Account", error);
      toast.error("There was an error deleting your account, Try again.", {
        position: "top-right",
      });
    }
  };

  return (
    <>
      <motion.div
        className="absolute px-2 sm:px-4 py-3 w-full max-h-80 overflow-y-scroll bg-base-100/80 backdrop-blur-[10px] left-0 top-[-10px] translate-y-[-100%] rounded-2xl border border-base-300 z-[-1] scrollbar-hidden"
        initial={{ opacity: 0, y: "-70%" }}
        animate={{ opacity: 1, y: "-100%" }}
        exit={{ opacity: 0, y: "-70%" }}
        transition={{
          duration: 0.2,
          type: "spring",
          stiffness: 700,
          damping: 30,
        }}
      >
        <div className="w-full h-full flex flex-col gap-5 justify-between">
          <div className="flex items-center gap-4 py-2 px-5">
            <img
              src={user?.imageUrl}
              alt="User profile"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-poppins text-base font-semibold text-black">
                {user?.fullName}
              </p>
              <p className="font-poppins text-xs font-medium text-black/650">
                {user?.primaryEmailAddress.emailAddress}
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="w-full h-[1px] bg-black/10"></div>
            <button
              className="btn btn-ghost px-7 text-red-600 justify-start"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              <div className="flex gap-10">
                <Trash2 size={18} />
                <p className="text-sm font-poppins font-medium">
                  Delete account
                </p>
              </div>
            </button>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg font-poppins">
                  Delete Account
                </h3>
                <p className="py-4 font-poppins">
                  Are you sure you want to delete your account? This action
                  cannot be undone.
                </p>
                <div className="modal-action">
                  <form method="dialog" className="flex gap-3">
                    <button className="btn font-poppins">Cancel</button>
                    <button
                      className="btn btn-error font-poppins"
                      onClick={handleDeleteAccount}
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
            <div className="w-full h-[1px] bg-black/10"></div>
            <SignOutButton className="flex justify-start items-center font-medium font-poppins gap-1 cursor-pointer btn btn-ghost px-7">
              <div>
                <div className="flex gap-10">
                  <LogOut size={18} />
                  <p className="text-sm font-poppins font-medium">Sign out</p>
                </div>
              </div>
            </SignOutButton>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Settings;
