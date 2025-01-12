import { useEffect, useState } from "react";
import { FaSave, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'
import { getTodo, getTodoById, updateTodo } from "../features/TodoSlice";

function Modal({isModalOpen, setIsModalOpen, toggleModal, selectedId}) {
  const dispatch = useDispatch();
  const { dataTodoById, loadingTodoById } = useSelector((state) => state.todo);

  useEffect(() => {
    if(isModalOpen){
      dispatch(getTodoById(selectedId));
    }
  }, [isModalOpen]);
  
  const [ todo, setTodo ] = useState({
    task: "",
    is_completed: "",
  })

  useEffect(()=>{
    if (dataTodoById, !loadingTodoById) {
      setTodo({
        task: dataTodoById.task || "",
        is_completed: dataTodoById.is_completed || 0
      })
    }
  }, [dataTodoById, loadingTodoById])

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setTodo({
      ...todo,
      [name]: name === 'is_completed' ? parseInt(value) : value,
    });
  };
  
  const handleSave = async (e) => {
    e.preventDefault();

    if(loadingTodoById) return
    
    try {
      await dispatch(updateTodo({id:selectedId, todo}))
      dispatch(getTodo())
      setIsModalOpen(!isModalOpen)
    } catch (error) {
      console.log(error)
    }
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
              name="task"
              value={todo.task}
              onChange={handleChange}
              className="w-full p-2 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 w-1/2">
            <label className="block mb-2 text-sm font-medium">Status</label>
            <select 
              name="is_completed"
              value={todo.is_completed}
              onChange={handleChange}
              className="w-full p-2 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="0">To Do</option>
              <option value="1">Doing</option>
              <option value="2">Done</option>
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
