import React, { useState } from "react";
import ComponentMenuBar from "./ComponentMenuBar";
import { Move, Trash, Minus } from "lucide-react";

const TextComponent = ({ id }) => {
  const [bgColor, setBgColor] = useState("bg-base-300");
  const [isDragging, setIsDragging] = useState(false);
  const [titleVisible, setTitleVisible] = useState(true);

  return (
    <div
      className={`${bgColor} w-full h-full rounded-[25px] group flex items-center justify-start transition-colors duration-300 p-4 flex-col gap-3`}
    >
      <ComponentMenuBar>
        <button
          className={`btn btn-sm btn-ghost drag-handle text-gray-800 ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
        >
          <Move size={16} />
        </button>
        <button
          className="btn btn-sm btn-ghost"
          onClick={() => setBgColor("bg-primary")}
        >
          <div className="h-4 w-4 rounded-full bg-primary"></div>
        </button>
        <button
          className="btn btn-sm btn-ghost"
          onClick={() => setBgColor("bg-secondary")}
        >
          <div className="h-4 w-4 rounded-full bg-secondary"></div>
        </button>
        <button
          className="btn btn-sm btn-ghost"
          onClick={() => setBgColor("bg-accent")}
        >
          <div className="h-4 w-4 rounded-full bg-accent"></div>
        </button>
        <button
          className="btn btn-sm btn-ghost"
          onClick={() => setBgColor("bg-base-300")}
        >
          <div className="h-4 w-4 rounded-full bg-base-300"></div>
        </button>
        <div className="w-[1px] h-[16px] bg-gray-300 rounded-full mx-1"></div>
        <button className="btn btn-sm btn-ghost text-red-600">
          <Trash size={16} />
        </button>
      </ComponentMenuBar>

      {titleVisible && (
        <div
          className={`w-full hover:bg-base-content/20 group-[title]: rounded-[9px] relative ${
            bgColor === "bg-accent"
              ? "text-primary-content"
              : "text-" + bgColor.split("-")[1] + "-content"
          }`}
        >
          <button
            className="btn btn-sm border-none bg-white/75 hover:bg-white tooltip tooltip-top text-warning absolute right-0 rounded-[9px] hidden group-[title] group-hover:flex "
            onClick={() => setTitleVisible(false)}
            data-tip="Remove Title"
          >
            <Minus size={12} />
          </button>

          <input
            type="text"
            placeholder="Add title..."
            spellCheck="false"
            className={`input input-sm w-full focus:outline-none bg-transparent text-base font-bold`}
          />
        </div>
      )}

      <div
        className={`flex-1 w-full resize-none min-h-0 hover:bg-base-content/20 rounded-[9px] ${
          bgColor === "bg-accent"
            ? "text-primary-content"
            : "text-" + bgColor.split("-")[1] + "-content"
        }`}
      >
        <textarea
          name="text"
          id="text"
          placeholder="Add text"
          spellCheck="false"
          className="w-full h-full textarea resize-none bg-transparent px-3 py-0 text-sm focus:outline-none rounded-[9px]"
        ></textarea>
      </div>
    </div>
  );
};

export default TextComponent;
