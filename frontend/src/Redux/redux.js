import { createSlice } from "@reduxjs/toolkit";

// =========================================================
// GET USER FROM LOCAL STORAGE SAFELY
// =========================================================

let saveUser = null;

try {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    saveUser = JSON.parse(storedUser);
  }
} catch (error) {
  console.error("Invalid user data in localStorage:", error);
  localStorage.removeItem("user");
  saveUser = null;
}

// =========================================================
// INITIAL STATE
// =========================================================

const initialState = {
  user: saveUser || null,
  isAuthenticate: Boolean(saveUser),
};

// =========================================================
// REDUX SLICE
// =========================================================

export const redux = createSlice({
  name: "post",
  initialState,
  reducers: {
    // =====================================================
    // LOGIN
    // =====================================================
    logindata: (state, action) => {
      console.log("LOGIN PAYLOAD:", action.payload);

      state.user = action.payload?.users || null;
      state.isAuthenticate = true;

      try {
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload?.users)
        );
      } catch (error) {
        console.error("Failed to save user to localStorage:", error);
      }
    },

    // =====================================================
    // LOGOUT
    // =====================================================
    logoutdata: (state) => {
      state.user = null;
      state.isAuthenticate = false;

      try {
        localStorage.removeItem("user");
      } catch (error) {
        console.error("Failed to remove user from localStorage:", error);
      }
    },
  },
});

// =========================================================
// EXPORT ACTIONS & REDUCER
// =========================================================

export const { logindata, logoutdata } = redux.actions;

export default redux.reducer;