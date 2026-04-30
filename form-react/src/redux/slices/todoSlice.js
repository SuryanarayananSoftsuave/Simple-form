import { createSlice } from "@reduxjs/toolkit";

export const TODO_STATUSES = ["Open", "In Progress", "Completed"];

const normalizeTodo = (raw) => {
  if (!raw || typeof raw !== "object") return null;
  const title = raw.title ?? raw.text ?? "";
  if (!title) return null;
  return {
    id: raw.id ?? Date.now() + Math.random(),
    title,
    description: raw.description ?? "",
    status: TODO_STATUSES.includes(raw.status) ? raw.status : "Open",
    creationDate: raw.creationDate ?? new Date().toISOString(),
    dueDate: raw.dueDate ?? "",
    userName: raw.userName ?? "",
    userEmail: raw.userEmail ?? "",
  };
};

const loadFromStorage = () => {
  try {
    const data = localStorage.getItem("todos");
    if (!data) return [];
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return [];
    const migrated = parsed.map(normalizeTodo).filter(Boolean);
    if (migrated.length !== parsed.length) {
      localStorage.setItem("todos", JSON.stringify(migrated));
    }
    return migrated;
  } catch {
    return [];
  }
};

const saveToStorage = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const initialState = {
  todos: loadFromStorage(),
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const payload = action.payload || {};
      state.todos.push({
        id: Date.now(),
        title: payload.title ?? "",
        description: payload.description ?? "",
        status: payload.status ?? "Open",
        creationDate: payload.creationDate ?? new Date().toISOString(),
        dueDate: payload.dueDate ?? "",
        userName: payload.userName ?? "",
        userEmail: payload.userEmail ?? "",
      });
      saveToStorage(state.todos);
    },

    updateTodo: (state, action) => {
      const { id, ...changes } = action.payload;
      const idx = state.todos.findIndex((t) => t.id === id);
      if (idx !== -1) {
        state.todos[idx] = { ...state.todos[idx], ...changes };
        saveToStorage(state.todos);
      }
    },

    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
      saveToStorage(state.todos);
    },
  },
});

export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
