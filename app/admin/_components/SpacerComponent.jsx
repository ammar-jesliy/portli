import { useState } from "react";
import DeleteComponentModal from "./DeleteComponentModal";
import ComponentMenuBar from "./ComponentMenuBar";
import { Move, Trash } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const SpacerComponent = ({ id, remove }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div className="hover:border border-base-300 hover:shadow bg-base-100 transition-all w-full h-full flex items-center justify-center rounded-[25px] px-4 py-1 group opacity-30 hover:opacity-100">
      <ComponentMenuBar
        orientation={"horizontal"}
        subMenuVisible={modalVisible}
      >
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
        <AnimatePresence>
          {modalVisible && (
            <motion.div
              className="absolute top-[-5px] left-1/2 w-[250px] h-full z-50 flex items-center justify-center"
              initial={{ opacity: 0, y: "-70%", x: "-50%" }}
              animate={{ opacity: 1, y: "-100%", x: "-50%" }}
              exit={{ opacity: 0, y: "-70%", x: "-50%" }}
              transition={{
                duration: 0.2,
                type: "spring",
                stiffness: 700,
                damping: 30,
              }}
            >
              <div className="bg-white rounded-[10px] shadow flex items-center justify-around w-full h-full">
                <p className="text-xs text-black">Are you sure?</p>
                <div className="flex gap-4 items-center">
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
            </motion.div>
          )}
        </AnimatePresence>
      </ComponentMenuBar>
      <p className="text-base-content/65 font-medium text-sm">Spacer</p>
    </div>
  );
};

export default SpacerComponent;
