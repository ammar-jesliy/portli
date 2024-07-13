import React, { useState } from "react";
import ComponentMenuBar from "./ComponentMenuBar";
import { Move, Trash, Minus, X } from "lucide-react";

const TextComponent = ({ id }) => {
  const [bgColor, setBgColor] = useState("bg-base-300");
  const [isDragging, setIsDragging] = useState(false);
  const [titleVisible, setTitleVisible] = useState(true);
  const [colorMenuVisible, setColorMenuVisible] = useState(false);

  return (
    <div
      className={`${bgColor} w-full h-full rounded-[25px] group flex items-center justify-center transition-colors duration-300 p-4 flex-col gap-3`}
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
              setBgColor("bg-primary");
              setColorMenuVisible(false);
            }}
          >
            <div className="h-4 w-7 rounded-lg bg-primary"></div>
          </button>
          <button
            className="btn btn-xs btn-ghost px-2"
            onClick={() => {
              setBgColor("bg-secondary");
              setColorMenuVisible(false);
            }}
          >
            <div className="h-4 w-7 rounded-lg bg-secondary"></div>
          </button>
          <button
            className="btn btn-xs btn-ghost px-2"
            onClick={() => {
              setBgColor("bg-accent");
              setColorMenuVisible(false);
            }}
          >
            <div className="h-4 w-7 rounded-lg bg-accent"></div>
          </button>
          <button
            className="btn btn-xs btn-ghost px-2"
            onClick={() => {
              setBgColor("bg-base-300");
              setColorMenuVisible(false);
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
            <div className={`h-4 w-4 rounded-full ${bgColor}`}></div>
          )}
        </button>
        <div className="h-[1px] w-[16px] bg-gray-300 rounded-full my-1"></div>
        <button className="btn btn-sm btn-ghost px-2 text-red-600">
          <Trash size={16} />
        </button>
      </ComponentMenuBar>

      {titleVisible && (
        <div
          className={`w-full hover:bg-base-content/20 rounded-[9px] relative ${
            bgColor === "bg-accent"
              ? "text-primary-content"
              : "text-" + bgColor.split("-")[1] + "-content"
          }`}
        >
          <button
            className="btn btn-xs border-none bg-white/75 hover:bg-white tooltip tooltip-top text-warning absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full hidden group-hover:flex "
            onClick={() => setTitleVisible(false)}
            data-tip="Remove Title"
          >
            <X size={12} />
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
