"use client";
import { putAPI, deleteAPI } from "@/services/fetchAPI"; // API işlemleri
import { useState } from "react";
import { FaEdit, FaTrash, FaCheck, FaUndo } from "react-icons/fa"; // İkonlar

export default function TodoItem({
  id,
  title,
  isCompleted,
  onDelete,
  onUpdate,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  const handleToggleCompleted = async () => {
    try {
      const updatedTodo = await putAPI(`/todos/${id}`, {
        isCompleted: !isCompleted,
      });
      onUpdate(id, updatedTodo); // Arayüzde güncelleme
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const updatedTodo = await putAPI(`/todos/${id}`, {
        title: editTitle,
      });
      onUpdate(id, updatedTodo);
      setIsEditing(false); // Düzenleme modundan çıkış
    } catch (error) {
      console.error("Failed to edit todo:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAPI(`/todos/${id}`);
      onDelete(id); // Arayüzden silme işlemi
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <button onClick={handleSaveEdit}>Save</button>
        </>
      ) : (
        <>
          <span
            style={{
              textDecoration: isCompleted ? "line-through" : "none",
            }}
          >
            {title}
          </span>
          <button onClick={() => setIsEditing(true)}>
            <FaEdit /> {/* Edit ikonu */}
          </button>
        </>
      )}
      <button onClick={handleToggleCompleted}>
        {isCompleted ? (
          <>
            <FaUndo /> Mark as Not Completed
          </>
        ) : (
          <>
            <FaCheck /> Mark as Completed
          </>
        )}
      </button>
      <button onClick={handleDelete}>
        <FaTrash /> {/* Delete ikonu */}
      </button>
    </li>
  );
}
