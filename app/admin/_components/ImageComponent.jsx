"use client";

import { useState, useContext, useEffect } from "react";
import ComponentMenuBar from "./ComponentMenuBar";
import { Move, Pencil, Trash, Image as ImageIcon, X, Plus } from "lucide-react";
import { AdminContext } from "../../_context/AdminContext";
import { ref, uploadBytes, deleteObject } from "firebase/storage";
import { storage } from "../../../utils/firebaseConfig";
import { toast } from "react-toastify";
import { components } from "../../../utils/schema";
import { db } from "../../../utils";
import { eq } from "drizzle-orm";
import Image from "next/image";
import DeleteComponentModal from "./DeleteComponentModal";

const ImageComponent = ({ id, remove }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BASE_URL;

  // const [image, setImage] = useState();
  const [isDragging, setIsDragging] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [labelVisible, setLabelVisible] = useState(false);
  const [label, setLabel] = useState("");

  const { userDetails, componentData, updateComponentData } =
    useContext(AdminContext);

  useEffect(() => {
    setLabelVisible(componentData[id]?.labelVisible || false);
    setLabel(componentData[id]?.label || "");
  }, [componentData, id]);

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    const result = await db
      .select()
      .from(components)
      .where(eq(components.userId, userDetails[0].id))
      .where(eq(components.componentId, id));

    if (result.length > 0) {
      const data = result[0].data;
      updateComponentData(id, data);
    }
  };

  const handleFileUpload = async (e) => {
    // Delete existing profile image
    if (componentData[id]?.filename) {
      const existingRef = ref(storage, componentData[id]?.filename);

      deleteObject(existingRef)
        .then(() => {
          console.log("Deleted existing image");
        })
        .catch((error) => {
          console.error("Error deleting existing image", error);
        });
    }

    // Upload new profile image
    const file = e.target.files[0];

    const filename =
      userDetails[0]?.username +
      "/" +
      id +
      "-" +
      Date.now().toString() +
      "." +
      file.type.split("/")[1];

    const data = {
      filename: filename,
      labelVisible: labelVisible,
      label: label,
    };

    const storageRef = ref(storage, filename);

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file).then(async (snapshot) => {
      console.log("Uploaded a blob or file!");

      const result = await db
        .update(components)
        .set({ data: JSON.stringify(data) })
        .where(eq(components.componentId, id));

      if (result) {
        updateComponentData(id, { filename });
      }
    });
  };

  const handleLabelInput = (e) => {
    setLabel(e.target.value);
    const chars = e.target.value.length + 6;
    e.target.style.width = chars + "ch";
  };

  const saveLabelToDb = async (label) => {
    const data = {
      filename: componentData[id]?.filename,
      labelVisible: componentData[id]?.labelVisible,
      label: label,
    };

    const result = await db
      .update(components)
      .set({ data: JSON.stringify(data) })
      .where(eq(components.componentId, id));

    if (result) {
      updateComponentData(id, { label });
      console.log("saved label");
    }
  };

  const handleLabelVisibility = async (labelVisible) => {


    const data = {
      filename: componentData[id]?.filename,
      labelVisible: labelVisible,
      label: "",
    };

    const result = await db
      .update(components)
      .set({ data: JSON.stringify(data) })
      .where(eq(components.componentId, id));

    if (result) {
      setLabel("")
      setLabelVisible(labelVisible);
      updateComponentData(id, { labelVisible, label: "" });
    } else {
      console.log("Error changing label visibilty")
    }
  };

  return (
    <div className="w-full h-full rounded-[25px] flex items-center justify-center group bg-base-300">
      <ComponentMenuBar orientation={"vertical"} subMenuVisible={modalVisible}>
        <button
          className={`btn btn-sm btn-ghost px-2 drag-handle text-gray-800 ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
        >
          <Move size={16} />
        </button>
        <label
          htmlFor={id + "Upload"}
          className="btn btn-sm btn-ghost px-2 text-gray-800"
        >
          <Pencil size={16} />
        </label>
        <div className="h-[1px] w-[16px] bg-gray-300 rounded-full my-1"></div>
        <button
          className="btn btn-sm btn-ghost px-2 text-red-600"
          onClick={() => setModalVisible(!modalVisible)}
        >
          <Trash size={16} />
        </button>
        {modalVisible && (
          <DeleteComponentModal
            setModalVisible={setModalVisible}
            id={id}
            remove={remove}
            image={componentData[id]?.filename}
          />
        )}
      </ComponentMenuBar>
      {!componentData[id]?.filename && (
        <label htmlFor={id + "Upload"} className="btn btn-primary shadow">
          <ImageIcon size={24} />
          Upload
        </label>
      )}

      <input
        type="file"
        id={id + "Upload"}
        className="hidden"
        accept="image/png, image/gif, image/jpeg"
        onChange={handleFileUpload}
      />
      {componentData[id]?.filename && (
        <>
          <Image
            src={
              BASE_URL +
              componentData[id]?.filename.replace("/", "%2f") +
              "?alt=media"
            }
            alt="Image"
            fill
            className="rounded-[25px] object-cover"
            unoptimized={true}
          />
          <div className="absolute left-4 bottom-4 flex items-center gap-1 w-full">
            {labelVisible ? (
              <>
                <input
                  type="text"
                  value={label}
                  placeholder="Caption..."
                  className="h-6 px-3 rounded-full text-xs font-semibold w-20 min-w-20 max-w-[55%]"
                  onChange={(e) => handleLabelInput(e)}
                  onBlur={(e) => saveLabelToDb(e.target.value)}
                />
                <button
                  className="w-6 h-6 bg-white items-center justify-center hidden group-hover:flex btn-warning rounded-full"
                  onClick={() => handleLabelVisibility(false)}
                >
                  <Trash size={14} className="text-red-600" />
                </button>
              </>
            ) : (
              <button
                className="w-6 h-6 bg-white items-center justify-center hidden group-hover:flex btn-warning rounded-full"
                onClick={() => handleLabelVisibility(true)}
              >
                <Plus size={14} className="text-black" />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageComponent;
