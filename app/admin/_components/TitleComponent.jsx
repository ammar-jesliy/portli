"use client";

import { useState, useEffect, useContext } from "react";
import ComponentMenuBar from "./ComponentMenuBar";
import { AlignCenter, AlignLeft, AlignRight, Trash, Move } from "lucide-react";
import { components } from "../../../utils/schema";
import { db } from "../../../utils";
import { eq } from "drizzle-orm";
import { AdminContext } from "../../_context/AdminContext";

const TitleComponent = ({ id, remove }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { componentData, updateComponentData } = useContext(AdminContext);
  
  const [localTitle, setLocalTitle] = useState(componentData[id]?.title || "")

  let timeoutId;

  useEffect(() => {
    setLocalTitle(componentData[id]?.title || "")
  }, [componentData, id])

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
      updateComponentData(id, data);
    }
  };

  const handleAlignmentChange = async (alignment) => {
    const data = {
      title: componentData[id]?.title,
      alignment: alignment,
    };

    const result = await db
      .update(components)
      .set({ data: JSON.stringify(data) })
      .where(eq(components.componentId, id));

    if (result) {
      updateComponentData(id, { alignment });
    }
  };

  const handleTitleInput = async (title) => {
      const data = {
        title: title,
        alignment: componentData[id]?.alignment,
      };

      const result = await db
        .update(components)
        .set({ data: JSON.stringify(data) })
        .where(eq(components.componentId, id));

      if (result) {
        updateComponentData(id, { title });
      }
  };

  return (
    <>
      <div className="hover:border border-base-300 hover:shadow bg-base-100 transition-all w-full h-full flex items-center justify-center rounded-[25px] px-4 py-1 group">
        <ComponentMenuBar orientation={"horizontal"} subMenuVisible={modalVisible}>
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
              handleAlignmentChange("left");
            }}
          >
            <AlignLeft size={16} />
          </button>
          <button
            className="btn btn-ghost btn-sm text-gray-800"
            onClick={() => {
              handleAlignmentChange("center");
            }}
          >
            <AlignCenter size={16} />
          </button>
          <button
            className="btn btn-ghost btn-sm text-gray-800"
            onClick={() => {
              handleAlignmentChange("right");
            }}
          >
            <AlignRight size={16} />
          </button>
          <div className="w-[1px] h-[16px] bg-gray-300 rounded-full mx-1"></div>
          <button
            className="btn btn-ghost btn-sm text-red-600"
            onClick={() => setModalVisible(!modalVisible)}
          >
            <Trash size={16} />
          </button>
          {modalVisible && (
            <div className="absolute bottom-0 right-0 -translate-y-[185%] w-full h-full z-50 flex items-center justify-center">
              <div className="bg-white p-3 rounded-[10px] shadow">
                <p className="text-xs text-black">
                  Are you sure you want to delete this component?
                </p>
                <div className="flex gap-4 mt-2 justify-end">
                  <button
                    className="btn btn-xs w-12 bg-slate-700 text-white border-none"
                    onClick={() => setModalVisible(false)}
                  >
                    No
                  </button>
                  <button
                    className="btn btn-xs w-12 bg-red-600 hover:bg-red-800 text-white border-none"
                    onClick={() => {
                      remove(id);
                      setModalVisible(false);
                    }}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}
        </ComponentMenuBar>

        <input
          type="text"
          placeholder="Title..."
          className="input w-full input-sm focus:outline-none hover:bg-base-200 text-lg font-bold rounded-[9px]"
          style={{ textAlign: componentData[id]?.alignment }}
          value={localTitle}
          onChange={(e) => setLocalTitle(e.target.value)}
          onBlur={(e) => handleTitleInput(e.target.value)}
        />
      </div>
    </>
  );
};

export default TitleComponent;
