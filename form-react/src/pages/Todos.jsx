import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo } from "../redux/slices/todoSlice";

function Todos() {
  const [text, setText] = useState("");

  // READ from the store
  const todos = useSelector((state) => state.todos.todos);

  // Get dispatch function to SEND actions
  const dispatch = useDispatch();

  const handleAdd = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(addTodo(text));   // payload = text string
    setText("");
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));  // payload = id number
  };

  return (
    <div style={styles.wrapper}>
      <h2>My Todo List</h2>

      <form onSubmit={handleAdd} style={styles.form}>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.addBtn}>Add</button>
      </form>

      {todos.length === 0 ? (
        <p style={{ color: "#888" }}>No todos yet. Add one above!</p>
      ) : (
        <ul style={styles.list}>
          {todos.map((todo) => (
            <li key={todo.id} style={styles.item}>
              <span>{todo.text}</span>
              <button
                onClick={() => handleDelete(todo.id)}
                style={styles.deleteBtn}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <p style={{ marginTop: 20, color: "#666", fontSize: 13 }}>
        Total todos: {todos.length}
      </p>
    </div>
  );
}

const styles = {
  wrapper: { padding: "20px", maxWidth: "500px", margin: "0 auto" },
  form: { display: "flex", gap: "8px", marginBottom: "16px" },
  input: { flex: 1, padding: "10px", fontSize: "14px" },
  addBtn: { padding: "10px 20px", cursor: "pointer", background: "#4CAF50", color: "white", border: "none" },
  list: { listStyle: "none", padding: 0 },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    background: "#f4f4f4",
    marginBottom: "6px",
    borderRadius: "4px",
  },
  deleteBtn: { padding: "4px 10px", cursor: "pointer", background: "#e74c3c", color: "white", border: "none" },
};

export default Todos;
