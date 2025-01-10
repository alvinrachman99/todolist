import React from "react";
import { FaSave, FaTimes } from "react-icons/fa";

function Modal({isModalOpen, toggleModal}) {
  const handleSave = () => {
    toggleModal;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-sky-950 rounded-md text-slate-100 p-5 shadow-lg w-3/4 md:w-2/4 lg:w-1/4">
        <h2 className="text-lg font-bold mb-4">Edit Task</h2>
        <div className="flex flex-col gap-3">
          <div className="">
            <label className="block mb-2 text-sm font-medium">Task Text</label>
            <input
              type="text"
              className="w-full p-2 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 w-1/2">
            <label className="block mb-2 text-sm font-medium">Status</label>
            <select className="w-full p-2 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="To Do">To Do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={toggleModal}
            className="px-4 py-2 bg-gray-500 rounded-md hover:bg-gray-400"
          >
            <FaTimes />
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <FaSave />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
