import React from "react";

const DeleteComponentModal = ({ setModalVisible, remove, id }) => {
  return (
    <div className="bg-white absolute left-0 bottom-0 -translate-x-[105%] w-[120px] rounded-lg shadow flex flex-col items-center justify-center p-2 gap-3">
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
            remove(id);
            setModalVisible(false);
          }}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default DeleteComponentModal;
