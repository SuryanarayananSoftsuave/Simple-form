import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import todoReducer from "./slices/todoSlice";
import movieReducer from "./slices/movieSlice";

// Each key here becomes a slice of state:
//   state.auth   -> managed by authReducer
//   state.todos  -> managed by todoReducer
export const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todoReducer,
    movies: movieReducer,
  },
});
