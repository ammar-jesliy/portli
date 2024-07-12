'use client';

import { useState } from "react";
import ComponentMenuBar from "./ComponentMenuBar";
import { AlignCenter, AlignLeft, AlignRight, Trash, Move } from "lucide-react";

const TitleComponent = ({ id }) => {

  const [alignment, setAlignment] = useState("left");
  const [isDragging, setIsDragging] = useState(false);

  return (
    <>
      <div className="hover:border border-base-300 hover:shadow bg-base-100 transition-all w-full h-full flex items-center justify-center rounded-[25px] px-4 py-1 group">
        <ComponentMenuBar>
          <button 
            className={`btn btn-ghost btn-sm text-gray-800 drag-handle ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}

          >
            <Move size={16} />
          </button>
          <button 
            className="btn btn-ghost btn-sm text-gray-800" 
            onClick={() => setAlignment("left")}
          >
            <AlignLeft size={16} />
          </button>
          <button 
            className="btn btn-ghost btn-sm text-gray-800" 
            onClick={() => setAlignment("center")}
          >
            <AlignCenter size={16} />
          </button>
          <button
            className="btn btn-ghost btn-sm text-gray-800"
            onClick={() => setAlignment("right")}
          >
            <AlignRight size={16} />
          </button>
          <div className="w-[1px] h-[16px] bg-gray-300 rounded-full mx-1"></div>
          <button className="btn btn-ghost btn-sm text-red-600">
            <Trash size={16} />
          </button>
        </ComponentMenuBar>

        <input type="text" placeholder="Title..." className="input w-full input-sm focus:outline-none hover:bg-base-200 text-lg font-bold rounded-[9px]" style={{textAlign: alignment}} />
      </div>
    </>
  );
};

export default TitleComponent;
