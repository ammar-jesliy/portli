import { useState } from "react";
import DeleteComponentModal from "./DeleteComponentModal";
import ComponentMenuBar from "./ComponentMenuBar";
import { Move, Trash } from "lucide-react";

const SpacerComponent = ({ id, remove }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div className="hover:border border-base-300 hover:shadow bg-base-100 transition-all w-full h-full flex items-center justify-center rounded-[25px] px-4 py-1 group opacity-30 hover:opacity-100">
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
          className="btn btn-sm btn-ghost px-2 text-red-600"
          onClick={() => setModalVisible(!modalVisible)}
        >
          <Trash size={16} />
        </button>
        {modalVisible && (
          <div className="absolute bottom-0 right-0 -translate-y-[210%] w-full h-full z-50 flex items-center justify-center">
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
      <p className="text-base-content/65 font-medium text-sm">Spacer</p>
    </div>
  );
};

export default SpacerComponent;
