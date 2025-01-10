import React from "react";

function InputTask() {
  return (
    <div className="my-5 text-sm">
      <input
        type="text"
        className="w-3/4 rounded-s-md py-1 pl-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="button"
        className="bg-sky-900 hover:bg-sky-800 rounded-r-md w-1/4 py-1 font-semibold"
      >
        + Add
      </button>
    </div>
  );
}

export default InputTask;
