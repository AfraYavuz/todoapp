"use client";
import { useState, useEffect } from "react";
import { getAPI, postAPI } from "@/services/fetchAPI";
import TodoItem from "@/components/todoItem/page";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    async function fetchTodos() {
      try {
        const data = await getAPI("/todos");
        setTodos(data);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    }
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (newTodo.trim() === "") return;
    try {
      const createdTodo = await postAPI("/todos", {
        title: newTodo,
        isCompleted: false,
      });
      setTodos([...todos, createdTodo]);
      setNewTodo("");
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleUpdateTodo = (id, updatedTodo) => {
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
  };

  return (
    <div>
      <h1>Todo App</h1>

      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add new todo"
      />
      <button onClick={handleAddTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            isCompleted={todo.isCompleted}
            onDelete={handleDeleteTodo}
            onUpdate={handleUpdateTodo}
          />
        ))}
      </ul>
    </div>
  );
}
