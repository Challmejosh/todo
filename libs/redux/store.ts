import { configureStore } from "@reduxjs/toolkit";
import todos from "./slice/todoSlice"
export const store = configureStore({
    reducer:{
        todos: todos
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType <typeof store.dispatch>;