import { useState } from "react";
import ComponentMenuBar from "./ComponentMenuBar";
import { Move, Pencil, Trash } from "lucide-react";

const ImageComponent = ({ id }) => {

  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="w-full h-full rounded-[25px] flex items-center justify-center group bg-base-300">
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
        <button className="btn btn-sm btn-ghost text-gray-800">
          <Pencil size={16} />
        </button>
        <div className="w-[1px] h-[16px] bg-gray-300 rounded-full mx-1"></div>
        <button className="btn btn-sm btn-ghost text-red-600">
          <Trash size={16} />
        </button>
      </ComponentMenuBar>
    </div>
  );
};

export default ImageComponent;
