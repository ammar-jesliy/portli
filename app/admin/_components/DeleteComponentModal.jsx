import React from "react";

const DeleteComponentModal = ({ setModalVisible, remove, id }) => {
  return (
    <div className="bg-base-100 absolute left-0 bottom-0 -translate-x-[105%] w-[120px] rounded-lg shadow flex flex-col items-center justify-center p-2 gap-3">
      <p className="text-black text-xs">
        Are you sure you want to delete this component?
      </p>
      <div className="flex gap-3">
        <button
          className="btn btn-xs w-12 btn-ghost"
          onClick={() => setModalVisible(false)}
        >
          No
        </button>
        <button
          className="btn btn-xs w-12 btn-error"
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
