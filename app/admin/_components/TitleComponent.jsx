"use client";

import { useState, useEffect } from "react";
import ComponentMenuBar from "./ComponentMenuBar";
import { AlignCenter, AlignLeft, AlignRight, Trash, Move } from "lucide-react";
import { toast } from "react-toastify";
import { components } from "../../../utils/schema";
import { db } from "../../../utils";
import { eq } from "drizzle-orm";

const TitleComponent = ({ id }) => {
  const [alignment, setAlignment] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [title, setTitle] = useState("");

  let timeoutId;

  useEffect(() => {
    getTitle();
  }, []);


  const getTitle = async () => {
    const result = await db
      .select()
      .from(components)
      .where(eq(components.componentId, id));
    
    if (result.length > 0) {
      const data = result[0].data;
      setTitle(data?.title);
      setAlignment(data?.alignment);
    }
  };

  const handleAlignmentChange = async (alignment) => {
    const data = {
      title: title,
      alignment: alignment,
    };

    const result = await db
      .update(components)
      .set({ data: JSON.stringify(data) })
      .where(eq(components.componentId, id));

    if (result) {
      toast.success("Alignment updated successfully", {
        position: "top-right",
      });
    } else {
      toast.error("Failed to update alignment", {
        position: "top-right",
      });
    }
  };

  const handleTitleInput = (title) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(async () => {
      console.log("Updating Title...");

      const data = {
        title: title,
        alignment: alignment,
      };

      const result = await db
        .update(components)
        .set({ data: JSON.stringify(data) })
        .where(eq(components.componentId, id));

      if (result) {
        setTitle(title);
        toast.success("Title updated successfully", {
          position: "top-right",
        });
      } else {
        toast.error("Failed to update title", {
          position: "top-right",
        });
      }
    }, 3000);
  }

  return (
    <>
      <div className="hover:border border-base-300 hover:shadow bg-base-100 transition-all w-full h-full flex items-center justify-center rounded-[25px] px-4 py-1 group">
        <ComponentMenuBar orientation={"horizontal"}>
          <button
            className={`btn btn-ghost btn-sm text-gray-800 drag-handle ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
          >
            <Move size={16} />
          </button>
          <button
            className="btn btn-ghost btn-sm text-gray-800"
            onClick={() => {
              setAlignment("left")
              handleAlignmentChange("left");
            }}
          >
            <AlignLeft size={16} />
          </button>
          <button
            className="btn btn-ghost btn-sm text-gray-800"
            onClick={() => {
              setAlignment("center")
              handleAlignmentChange("center");
            }}
          >
            <AlignCenter size={16} />
          </button>
          <button
            className="btn btn-ghost btn-sm text-gray-800"
              onClick={() => {
                setAlignment("right")
                handleAlignmentChange("right");
              }}
          >
            <AlignRight size={16} />
          </button>
          <div className="w-[1px] h-[16px] bg-gray-300 rounded-full mx-1"></div>
          <button className="btn btn-ghost btn-sm text-red-600">
            <Trash size={16} />
          </button>
        </ComponentMenuBar>

        <input
          type="text"
          placeholder="Title..."
          className="input w-full input-sm focus:outline-none hover:bg-base-200 text-lg font-bold rounded-[9px]"
          style={{ textAlign: alignment }}
          defaultValue={title}
          onChange={(e) => handleTitleInput(e.target.value)}
        />
      </div>
    </>
  );
};

export default TitleComponent;
