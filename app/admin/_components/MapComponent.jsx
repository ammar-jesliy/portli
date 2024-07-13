import { useState } from "react";
import ComponentMenuBar from "./ComponentMenuBar";
import { Move, Search, Trash } from "lucide-react";

const MapComponent = ({ id }) => {

  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="w-full h-full rounded-[25px] flex justify-center items-center bg-base-300 group">
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
        <button className="btn btn-sm btn-ghost px-2 text-gray-800">
          <Search size={16} />
        </button>
        <div className="h-[1px] w-[16px] bg-gray-300 rounded-full my-1"></div>
        <button className="btn btn-sm btn-ghost px-2 text-red-600">
          <Trash size={16} />
        </button>
      </ComponentMenuBar>
      Map
    </div>
  );
};

export default MapComponent;
