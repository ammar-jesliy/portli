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

  const [localText, setLocalText] = useState(componentData[id]?.text || "");
  const [localTitle, setLocalTitle] = useState(componentData[id]?.title || "");

  useEffect(() => {
    setLocalText(componentData[id]?.text || "");
    setLocalTitle(componentData[id]?.title || "");
  }, [componentData, id]);

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
      <ComponentMenuBar
        orientation={"vertical"}
        subMenuVisible={colorMenuVisible || modalVisible}
      >
        <div
          className={`absolute w-max -left-[10px] top-1/2 -translate-y-1/2 -translate-x-[100%] rounded-[10px] bg-white overflow-y-auto scrollbar-hidden grid grid-cols-3 shadow p-1 ${
            !colorMenuVisible && "hidden"
          }`}
        >
          <button
            className="p-1"
            onClick={() => {
              setColorMenuVisible(false);
              handleChangeColor("bg-primary");
            }}
          >
            <div className="h-5 w-5 rounded-full bg-primary"></div>
          </button>
          <button
            className="p-1"
            onClick={() => {
              setColorMenuVisible(false);
              handleChangeColor("bg-secondary");
            }}
          >
            <div className="h-5 w-5 rounded-full bg-secondary"></div>
          </button>
          <button
            className="p-1"
            onClick={() => {
              setColorMenuVisible(false);
              handleChangeColor("bg-accent");
            }}
          >
            <div className="h-5 w-5 rounded-full bg-accent"></div>
          </button>
          <button
            className="p-1"
            onClick={() => {
              setColorMenuVisible(false);
              handleChangeColor("bg-base-300");
            }}
          >
            <div className="h-5 w-5 rounded-full bg-base-300"></div>
          </button>
          <button
            className="p-1"
            onClick={() => {
              setColorMenuVisible(false);
              handleChangeColor("bg-error");
            }}
          >
            <div className="h-5 w-5 rounded-full bg-error"></div>
          </button>
          <button
            className="p-1"
            onClick={() => {
              setColorMenuVisible(false);
              handleChangeColor("bg-info");
            }}
          >
            <div className="h-5 w-5 rounded-full bg-info"></div>
          </button>
          <button
            className="p-1"
            onClick={() => {
              setColorMenuVisible(false);
              handleChangeColor("bg-success");
            }}
          >
            <div className="h-5 w-5 rounded-full bg-success"></div>
          </button>
          <button
            className="p-1"
            onClick={() => {
              setColorMenuVisible(false);
              handleChangeColor("bg-neutral");
            }}
          >
            <div className="h-5 w-5 rounded-full bg-neutral"></div>
          </button>
          {/* <div className="color-container w-5 h-5 flex items-center justify-center m-1 rounded-full bg-black">
            <input type="color" name="" id="" className="color-picker" />
          </div> */}
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
          onClick={() => {
            setColorMenuVisible(!colorMenuVisible);
            setModalVisible(false);
          }}
        >
          {colorMenuVisible ? (
            <X size={16}  className="text-gray-800"/>
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
          onClick={() => {
            setModalVisible(!modalVisible);
            setColorMenuVisible(false);
          }}
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

      {(componentData[id]?.titleVisible || !componentData[id]) && (
        <div
          className={`w-full hover:bg-base-content/20 rounded-[9px] relative text-title ${
            componentData[id]?.color === "bg-accent"
              ? "text-primary-content"
              : "text-" + componentData[id]?.color?.split("-")[1] + "-content"
          }`}
        >
          <input
            type="text"
            placeholder="Add title..."
            spellCheck="false"
            value={localTitle}
            onChange={(e) => setLocalTitle(e.target.value)}
            onBlur={(e) => handleTitleInput(e.target.value)}
            className={`input input-sm w-full focus:outline-none bg-transparent text-base font-bold text-title-input`}
          />
          <button
            className="w-6 h-6 items-center justify-center border-none bg-white/75 hover:bg-white tooltip tooltip-top text-warning absolute left-[-10px] top-[-10px] rounded-full hidden remove-text-title"
            onClick={() => handleDeleteTitle()}
            data-tip="Remove Title"
          >
            <X size={12} strokeWidth={4} />
          </button>

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
          value={localText}
          onChange={(e) => setLocalText(e.target.value)}
          onBlur={(e) => handleTextInput(e.target.value)}
          className="w-full h-full font-medium textarea resize-none bg-transparent px-3 py-0 text-sm focus:outline-none rounded-[9px] leading-tight scrollbar-hidden whitespace-pre-wrap"
        ></textarea>
      </div>
    </div>
  );
};

export default TextComponent;
