import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTodo, getTodo } from "../features/TodoSlice";

function InputTask() {
  const dispatch = useDispatch()
  const [task, setTask] = useState("")

  const { loadingTodo, errorTodo } = useSelector((state) => state.todo);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(loadingTodo) return

    try {
      const result = await dispatch(createTodo({task}));
      setTask("")
      dispatch(getTodo())
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className="my-5 text-sm">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="w-3/4 text-black rounded-s-md py-1 pl-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSubmit}
        type="button"
        className="bg-sky-900 hover:bg-sky-800 rounded-r-md w-1/4 py-1 font-semibold"
      >
        + Add
      </button>
    </div>
  );
}

export default InputTask;
