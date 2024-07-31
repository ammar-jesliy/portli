"use client";

import React, { useContext, useEffect, useState } from "react";
import ComponentMenuBar from "./ComponentMenuBar";
import { Move, Trash, X } from "lucide-react";
import DeleteComponentModal from "./DeleteComponentModal";
import { components } from "../../../utils/schema";
import { db } from "../../../utils";
import { eq } from "drizzle-orm";
import { AdminContext } from "../../_context/AdminContext";

const TextComponent = ({ id, remove }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [colorMenuVisible, setColorMenuVisible] = useState(false);

  const { componentData, updateComponentData } = useContext(AdminContext);

  let timeoutId;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const result = await db
      .select()
      .from(components)
      .where(eq(components.componentId, id));

    if (result.length > 0) {
      const data = result[0].data;

      updateComponentData(id, data);

      if (!data) {
        const titleVisible = true;
        updateComponentData(id, { titleVisible });
      }
    }
  };

  const handleTitleInput = async (title) => {
    const data = {
      title: title,
      text: componentData[id]?.text,
      titleVisible: true,
      color: componentData[id]?.color,
    };

    const result = await db
      .update(components)
      .set({ data: JSON.stringify(data) })
      .where(eq(components.componentId, id));

    if (result) {
      updateComponentData(id, { title });
    }
  };

  const handleTextInput = async (text) => {
    const data = {
      title: componentData[id]?.title,
      text: text,
      titleVisible: componentData[id]?.titleVisible,
      color: componentData[id]?.color,
    };

    const result = await db
      .update(components)
      .set({ data: JSON.stringify(data) })
      .where(eq(components.componentId, id));

    if (result) {
      updateComponentData(id, { text });
    }
  };

  const handleDeleteTitle = async () => {
    const data = {
      title: "",
      text: componentData[id]?.text,
      titleVisible: false,
      color: componentData[id]?.color,
    };

    const result = await db
      .update(components)
      .set({ data: JSON.stringify(data) })
      .where(eq(components.componentId, id));

    if (result) {
      updateComponentData(id, data);
    }
  };

  const handleChangeColor = async (color) => {
    const data = {
      title: componentData[id]?.title,
      text: componentData[id]?.text,
      titleVisible: componentData[id]?.titleVisible,
      color: color,
    };

    const result = await db
      .update(components)
      .set({ data: JSON.stringify(data) })
      .where(eq(components.componentId, id));

    if (result) {
      updateComponentData(id, { color });
    }
  };

  return (
    <div
      className={`${
        componentData[id]?.color || "bg-base-300"
      } w-full h-full rounded-[25px] group flex items-center justify-center transition-colors duration-300 p-4 flex-col gap-3`}
    >
      <ComponentMenuBar orientation={"vertical"}>
        <div
          className={`absolute w-full h-full left-0 -translate-x-[120%] rounded-[10px] bg-white overflow-y-auto scrollbar-hidden flex flex-col items-center justify-around shadow ${
            !colorMenuVisible && "hidden"
          }`}
        >
          <button
            className="btn btn-xs btn-ghost px-2"
            onClick={() => {
              setColorMenuVisible(false);
              handleChangeColor("bg-primary");
            }}
          >
            <div className="h-4 w-7 rounded-lg bg-primary"></div>
          </button>
          <button
            className="btn btn-xs btn-ghost px-2"
            onClick={() => {
              setColorMenuVisible(false);
              handleChangeColor("bg-secondary");
            }}
          >
            <div className="h-4 w-7 rounded-lg bg-secondary"></div>
          </button>
          <button
            className="btn btn-xs btn-ghost px-2"
            onClick={() => {
              setColorMenuVisible(false);
              handleChangeColor("bg-accent");
            }}
          >
            <div className="h-4 w-7 rounded-lg bg-accent"></div>
          </button>
          <button
            className="btn btn-xs btn-ghost px-2"
            onClick={() => {
              setColorMenuVisible(false);
              handleChangeColor("bg-base-300");
            }}
          >
            <div className="h-4 w-7 rounded-lg bg-base-300"></div>
          </button>
        </div>
        <button
          className={`btn btn-sm btn-ghost drag-handle px-2 text-gray-800 ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
        >
          <Move size={16} />
        </button>
        <button
          className="btn btn-sm btn-ghost px-2"
          onClick={() => setColorMenuVisible(!colorMenuVisible)}
        >
          {colorMenuVisible ? (
            <X size={16} />
          ) : (
            <div
              className={`h-4 w-4 rounded-full ${
                componentData[id]?.color || "bg-base-300"
              }`}
            ></div>
          )}
        </button>
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
          />
        )}
      </ComponentMenuBar>

      {componentData[id]?.titleVisible && (
        <div
          className={`w-full hover:bg-base-content/20 rounded-[9px] relative ${
            componentData[id]?.color === "bg-accent"
              ? "text-primary-content"
              : "text-" + componentData[id]?.color?.split("-")[1] + "-content"
          }`}
        >
          <button
            className="btn btn-xs border-none bg-white/75 hover:bg-white tooltip tooltip-top text-warning absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full hidden group-hover:flex"
            onClick={() => handleDeleteTitle()}
            data-tip="Remove Title"
          >
            <X size={12} />
          </button>

          <input
            type="text"
            placeholder="Add title..."
            spellCheck="false"
            defaultValue={componentData[id]?.title}
            onBlur={(e) => handleTitleInput(e.target.value)}
            className={`input input-sm w-full focus:outline-none bg-transparent text-base font-bold`}
          />
        </div>
      )}

      <div
        className={`flex-1 w-full resize-none min-h-0 hover:bg-base-content/20 rounded-[9px] ${
          componentData[id]?.color === "bg-accent"
            ? "text-primary-content"
            : "text-" + componentData[id]?.color?.split("-")[1] + "-content"
        }`}
      >
        <textarea
          name="text"
          id="text"
          placeholder="Add text"
          spellCheck="false"
          defaultValue={componentData[id]?.text}
          onBlur={(e) => handleTextInput(e.target.value)}
          className="w-full h-full font-medium textarea resize-none bg-transparent px-3 py-0 text-sm focus:outline-none rounded-[9px] leading-tight scrollbar-hidden"
        ></textarea>
      </div>
    </div>
  );
};

export default TextComponent;
