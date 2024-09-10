"use client";
import { useEffect, useState } from "react";
import { getAPI, postAPI, putAPI, deleteAPI } from "@/services/fetchAPI";
import { FaEdit, FaTrash, FaCheck, FaUndo } from "react-icons/fa";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

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
    if (newTodo.trim()) {
      await postAPI("/post", { task: newTodo, isCompleted: false });
      setNewTodo("");
      // Refresh the list
      const data = await getAPI("/get");
      if (data && data.status === "success") {
        setTodos(data.data);
      }
    }
  };

  const handleUpdateTodo = async (id, updatedTask) => {
    await putAPI(`/put/${id}`, { task: updatedTask });
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
  const handleToggleCompleted = async (id, isCompleted) => {
    await handleUpdateTodo(id, { isCompleted: !isCompleted });
  };

  const handleSaveEdit = async (id) => {
    await handleUpdateTodo(id, { title: editTitle });
    setEditingId(null);
    setEditTitle("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8">Todo List</h1>
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="p-2 border rounded bg-white text-black shadow-md"
          placeholder="Add a new todo"
        />
        <button
          onClick={handleAddTodo}
          className="ml-2 p-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600"
        >
          Add Todo
        </button>
      </div>
      <ul className="w-full max-w-md">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center p-2 bg-white rounded shadow mb-2"
          >
            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="p-2 border rounded bg-white text-black shadow-md"
                />
                <button
                  onClick={() => handleSaveEdit(todo.id)}
                  className="ml-2 p-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="ml-2 p-2 bg-gray-500 text-white rounded shadow-md hover:bg-gray-600"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span className={`${todo.isCompleted ? "line-through" : ""}`}>
                  {todo.title}
                </span>
                <button
                  onClick={() => {
                    setEditingId(todo.id);
                    setEditTitle(todo.title);
                  }}
                  className="ml-2 p-2 bg-yellow-500 text-white rounded shadow-md hover:bg-yellow-600"
                >
                  <FaEdit />
                </button>
              </>
            )}
            <button
              onClick={() => handleToggleCompleted(todo.id, todo.isCompleted)}
              className="ml-2 p-2 bg-green-500 text-white rounded shadow-md hover:bg-green-600"
            >
              {todo.isCompleted ? <FaUndo /> : <FaCheck />}
            </button>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="ml-2 p-2 bg-red-500 text-white rounded shadow-md hover:bg-red-600"
            >
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
