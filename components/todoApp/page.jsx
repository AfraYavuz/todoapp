"use client";
import { useEffect, useState } from "react";
import { getAPI, postAPI, putAPI, deleteAPI } from "@/services/fetchAPI";
import { TiPlusOutline } from "react-icons/ti";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin2Fill } from "react-icons/ri";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [category, setCategory] = useState("toStart");
  const [selectedCategory, setSelectedCategory] = useState("toStart");

  const filteredTodos = todos.filter(
    (todo) => todo.category === selectedCategory
  );

  useEffect(() => {
    async function fetchTodos() {
      const data = await getAPI("/get");
      if (data && data.status === "success") {
        setTodos(data.data);
      }
    }
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (newTitle.trim() && newDescription.trim()) {
      try {
        const response = await postAPI("/post", {
          title: newTitle,
          description: newDescription,
          isCompleted: false,
        });
        console.log("API yanıtı:", response);
        if (response.status === "success") {
          setNewTitle("");
          setNewDescription("");
          // Refresh the list
          const data = await getAPI("/get");
          if (data && data.status === "success") {
            setTodos(data.data);
          }
        } else {
          console.error("Todo eklenemedi:", response.error);
        }
      } catch (error) {
        console.error("POST isteği sırasında hata:", error);
      }
    }
  };

  const handleUpdateTodo = async (id, updatedTitle, updatedDescription) => {
    await putAPI(`/put/${id}`, {
      title: updatedTitle,
      description: updatedDescription,
    });
    // Refresh the list
    const data = await getAPI("/get");
    if (data && data.status === "success") {
      setTodos(data.data);
    }
  };

  const handleDeleteTodo = async (id) => {
    await deleteAPI(`/delete/${id}`);
    // Refresh the list
    const data = await getAPI("/get");
    if (data && data.status === "success") {
      setTodos(data.data);
    }
  };

  return (
    <main className="flex flex-row min-h-screen gap-5 p-10">
      <div className="flex flex-col  text-start">
        <h1 className="text-4xl font-bold m-5 uppercase truncate">Todo List</h1>
        <div className="flex flex-col mb-4">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="p-2 border rounded bg-white text-black mb-2"
            placeholder="Add a new title"
          />
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="p-2 border rounded bg-white text-black mb-2"
            placeholder="Add a description"
          />
          <div className=" flex justify-end mt-2">
            <button
              onClick={handleAddTodo}
              className="p-2 bg-amber-300 text-black rounded hover:bg-red-400"
            >
              <TiPlusOutline />
            </button>
          </div>
        </div>
      </div>{" "}
      <div className="flex  w-full ml-20 mt-5">
        <ul className="flex flex-col gap-4 w-60 h-60">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className="flex flex-col p-2 bg-white text-black rounded shadow mb-2"
            >
              <span
                className={`${
                  todo.isCompleted ? "line-through" : ""
                } font-bold`}
              >
                {todo.title}
              </span>
              <p className="text-gray-700">{todo.description}</p>
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => {
                    const updatedTitle = prompt("Update title", todo.title);
                    const updatedDescription = prompt(
                      "Update description",
                      todo.description
                    );
                    if (updatedTitle !== null && updatedDescription !== null) {
                      handleUpdateTodo(
                        todo.id,
                        updatedTitle,
                        updatedDescription
                      );
                    }
                  }}
                  className="ml-2 p-2 bg-teal-400 text-black rounded shadow-md hover:bg-teal-600"
                >
                  <GrEdit />
                </button>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="ml-2 p-2 bg-red-400 text-black rounded shadow-md hover:bg-red-600"
                >
                  <RiDeleteBin2Fill />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
