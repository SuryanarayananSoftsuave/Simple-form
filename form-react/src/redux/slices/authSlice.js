import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* ------------------------------------------------------------------ */
/* 1. FAKE API (replace with axios calls to your real backend later)  */
/* ------------------------------------------------------------------ */
const fakeApi = {
  login: ({ email, password }) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password.length >= 4) {
          resolve({
            user: { id: 1, name: email.split("@")[0], email },
            token: "fake-jwt-token-" + Date.now(),
          });
        } else {
          reject(new Error("Invalid email or password"));
        }
      }, 700);
    }),

  register: ({ name, email, password }) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password.length >= 4) {
          resolve({
            user: { id: 2, name, email },
            token: "fake-jwt-token-" + Date.now(),
          });
        } else {
          reject(new Error("Please fill all fields (password >= 4 chars)"));
        }
      }, 700);
    }),
};

/* ------------------------------------------------------------------ */
/* 2. ASYNC THUNKS                                                    */
/* A thunk is a special action that can run async code (API calls).   */
/* RTK auto-generates 3 actions for each thunk:                       */
/*   pending  -> loading = true                                       */
/*   fulfilled-> success, save data                                   */
/*   rejected -> error                                                */
/* ------------------------------------------------------------------ */
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const data = await fakeApi.login(credentials);
      // Persist token so user stays logged in after refresh
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      return data; // becomes action.payload in `fulfilled`
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, thunkAPI) => {
    try {
      const data = await fakeApi.register(formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

/* ------------------------------------------------------------------ */
/* 3. INITIAL STATE                                                   */
/* We hydrate from localStorage so refresh doesn't log the user out.  */
/* ------------------------------------------------------------------ */
const tokenFromStorage = localStorage.getItem("token");
const userFromStorage = localStorage.getItem("user");

const initialState = {
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  token: tokenFromStorage || null,
  loading: false,
  error: null,
};

/* ------------------------------------------------------------------ */
/* 4. THE SLICE                                                       */
/* ------------------------------------------------------------------ */
const authSlice = createSlice({
  name: "auth",
  initialState,
  // "reducers" = synchronous state updates (logout, clearError, etc.)
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  // "extraReducers" = how the slice reacts to thunk actions
  extraReducers: (builder) => {
    builder
      // ---- LOGIN ----
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
      // ---- REGISTER ----
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Register failed";
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
