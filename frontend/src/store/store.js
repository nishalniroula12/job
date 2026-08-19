import { configureStore } from "@reduxjs/toolkit";
import { redux } from "../Redux/redux.js";

export const store =configureStore({
    reducer:{
        data:redux.reducer
    }
})