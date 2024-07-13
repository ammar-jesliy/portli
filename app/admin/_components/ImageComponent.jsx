"use client";

import { useState, useContext, useEffect } from "react";
import ComponentMenuBar from "./ComponentMenuBar";
import { Move, Pencil, Trash, Image as ImageIcon } from "lucide-react";
import { AdminContext } from "../../_context/AdminContext";
import { ref, uploadBytes, deleteObject } from "firebase/storage";
import { storage } from "../../../utils/firebaseConfig";
import { toast } from "react-toastify";
import { components } from "../../../utils/schema";
import { db } from "../../../utils";
import { eq } from "drizzle-orm";
import Image from "next/image";

const ImageComponent = ({ id }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BASE_URL;

  const [isDragging, setIsDragging] = useState(false);
  const [image, setImage] = useState();

  const { userDetails } = useContext(AdminContext);

  useEffect(() => {
    getImage();
  }, [image]);

  const getImage = async () => {
    const result = await db
      .select()
      .from(components)
      .where(eq(components.userId, userDetails[0].id))
      .where(eq(components.componentId, id));

    if (result.length > 0) {
      const data = result[0].data;
      setImage(data.filename + "?alt=media");
    }
  };

  const handleFileUpload = async (e) => {
    // // Delete existing profile image
    // if (image) {
    //   const existingRef = ref(storage, image.split("?")[0]);

    //   deleteObject(existingRef)
    //     .then(() => {
    //       console.log("Deleted existing image");
    //     })
    //     .catch((error) => {
    //       console.error("Error deleting existing image", error);
    //     });

    //   console.log(image);
    // }

    // Upload new profile image
    const file = e.target.files[0];

    const filename =
      userDetails[0]?.username + "-" + id + "." + file.type.split("/")[1];

    console.log(filename);
    const dataJson = { filename: filename };

    const storageRef = ref(storage, filename);

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file).then(async (snapshot) => {
      console.log("Uploaded a blob or file!");

      const result = await db.insert(components).values({
        userId: userDetails[0].id,
        componentId: id,
        type: "image",
        data: JSON.stringify(dataJson),
      }).onConflictDoUpdate({
        target: components.componentId,
        set: {
          data: JSON.stringify(dataJson),
        },
      })
      ;

      if (result) {
        setImage(filename + "?alt=media");
        toast.success("Image updated successfully", {
          position: "top-right",
        });
      } else {
        toast.error("Failed to update image", {
          position: "top-right",
        });
      }
    });
  };

  return (
    <div className="w-full h-full rounded-[25px] flex items-center justify-center group bg-base-300">
      <ComponentMenuBar orientation={"vertical"}>
        <button
          className={`btn btn-sm btn-ghost px-2 drag-handle text-gray-800 ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
        >
          <Move size={16} />
        </button>
        <label htmlFor={id + "Upload"} className="btn btn-sm btn-ghost px-2 text-gray-800">
          <Pencil size={16} />
        </label>
        <div className="h-[1px] w-[16px] bg-gray-300 rounded-full my-1"></div>
        <button className="btn btn-sm btn-ghost px-2 text-red-600">
          <Trash size={16} />
        </button>
      </ComponentMenuBar>

      <label htmlFor={id + "Upload"} className="btn btn-primary shadow">
        <ImageIcon size={24} />
        Upload
      </label>
      <input
        type="file"
        id={id + "Upload"}
        className="hidden"
        accept="image/png, image/gif, image/jpeg"
        onChange={handleFileUpload}
      />
      {image && (
        <Image
          src={BASE_URL + image}
          alt="Image"
          fill
          className="rounded-[25px] object-cover"
        />
      )}
    </div>
  );
};

export default ImageComponent;
