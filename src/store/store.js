import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/themeSlice"
import buttonReducer from "../features/button/buttonSlice"

export const store = configureStore({
    reducer:{
        theme:themeReducer,
        button: buttonReducer
    }
})