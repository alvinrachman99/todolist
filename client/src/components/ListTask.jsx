import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from 'react-redux'
import { getTodo, deleteTodo } from "../features/TodoSlice";

function ListTask() {
  const dispatch = useDispatch();
  const { dataTodo, loadingTodo } = useSelector((state) => state.todo);

  useEffect(() => {
    dispatch(getTodo());
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null)

  const toggleModal = (e) => {
    const id = e === "undefined" ? null : e.currentTarget.getAttribute('data-id')
    
    setSelectedId(id)
    setIsModalOpen(!isModalOpen);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteTodo(id)).unwrap(); // Menggunakan unwrap
      dispatch(getTodo());
  } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="my-5 text-sm">
        <ul>
          {
            dataTodo.length > 0 && !loadingTodo && (
              dataTodo.map((item, i) => (
                <li key={i} className="flex p-3 columns-2 gap-2 font-semibold border-b">
                  <div className={`w-3/4 py-1
                    ${item.is_completed === 0 ? "text-gray-400" 
                      : item.is_completed === 1 ? "text-yellow-500" 
                      : "text-green-500"}`}
                  >
                    {item.task}
                  </div>
                  <div className="flex columns-3 gap-2 items-center justify-center w-1/4">
                    <button className={`p-1 rounded-sm
                      ${item.is_completed === 0 ? "bg-gray-500" 
                        : item.is_completed === 1 ? "bg-yellow-500" 
                        : "bg-green-600"}`}
                    >
                      {
                        item.is_completed === 0 ? "Todo" 
                        : item.is_completed === 1 ? "Doing" 
                        : "Done"
                      }
                    </button>
                    <button
                      onClick={toggleModal}
                      data-id={item.id}
                      className="py-1.5 text-base text-sky-500 hover:text-sky-400"
                    >
                      <FaPencilAlt />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="py-1.5 text-base text-red-500 hover:text-red-400"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </li>
              ))
            )
          }
        </ul>
        {loadingTodo && <p>Loading...</p>}
      </div>

      {isModalOpen && 
        <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} toggleModal={toggleModal} selectedId={selectedId} />
      }
    </>
  );
}

export default ListTask;
