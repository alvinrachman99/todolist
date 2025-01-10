import { FaPencilAlt, FaTrash } from "react-icons/fa";
import React from "react";

function ListTask() {
  return (
    <div className="my-5 text-sm">
      <ul>
        {/* 
            to do: bg-gray-500 & text gray-400
            doing: bg&text yellow-500, 
            done: bg-gray-600 & text gray-500
        */}
        <li className="flex p-3 columns-2 gap-2 font-semibold border-b">
          <div className="w-3/4 py-1 text-gray-400">
            Lorem ipsum dolor sit amet
          </div>
          <div className="flex columns-3 gap-2 items-center justify-center w-1/4">
            <button className="p-1 bg-gray-500 rounded-sm">To Do</button>
            <button className="py-1.5 text-base text-sky-500 hover:text-sky-400">
              <FaPencilAlt />
            </button>
            <button className="py-1.5 text-base text-red-500 hover:text-red-400">
              <FaTrash />
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default ListTask;
