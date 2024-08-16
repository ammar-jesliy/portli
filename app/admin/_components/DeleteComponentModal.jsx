import React from "react";
import { motion } from "framer-motion";

const DeleteComponentModal = ({ setModalVisible, remove, id, image }) => {
  return (
    <motion.div
      className="bg-white absolute -left-[10px] top-1/2 w-[120px] rounded-lg shadow flex flex-col items-center justify-center p-2 gap-3 -z-10"
      initial={{ opacity: 0, x: "-70%", y: "-50%" }}
      animate={{ opacity: 1, x: "-100%", y: "-50%" }}
      exit={{ opacity: 0, x: "-70%", y: "-50%" }}
      transition={{
        duration: 0.2,
        type: "spring",
        stiffness: 700,
        damping: 30,
      }}
    >
      <p className="text-black text-xs">
        Are you sure you want to delete this component?
      </p>
      <div className="flex gap-3">
        <button
          className="btn btn-xs w-12 bg-slate-700 text-white border-none"
          onClick={() => setModalVisible(false)}
        >
          No
        </button>
        <button
          className="btn btn-xs w-12 bg-red-600 hover:bg-red-800 text-white border-none"
          onClick={() => {
            remove(id, image);
            setModalVisible(false);
          }}
        >
          Yes
        </button>
      </div>
    </motion.div>
  );
};

export default DeleteComponentModal;
