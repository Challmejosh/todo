import { Todo } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface TODO {
    todo: Todo[]
}
const initialState: TODO = {
    todo: []
}
const todoSlice = createSlice({
    name:"todo",
    initialState,
    reducers:{
        addTodo(state, action: PayloadAction<Todo>) {
            // Get existing todos from localStorage
            const existingTodos = JSON.parse(localStorage.getItem("local-todo") || "[]");

            // Add new todo to the beginning
            const updatedTodos = [action.payload, ...existingTodos];

            // Save updated list to localStorage
            localStorage.setItem("local-todo", JSON.stringify(updatedTodos));

            // Update Redux state
            state.todo = [action.payload, ...state.todo];
        },
        titleEdit: (state,action:PayloadAction<Todo>)=>{
            const local = localStorage.getItem("local-todo")
            if(local){
                const parsed:Todo[] = JSON.parse(local)
                const update = parsed.map(item=>item.id===action.payload.id?{
                ...item,title: todo.title,
                 }:item)
                localStorage.setItem("local-todo",JSON.stringify(update))
            }
            const todo = action.payload
            state.todo.map(item=>item.id===todo.id?{
                ...item,title: todo.title,
            }:item)
        },
        completeEdit: (state,action:PayloadAction<Todo>)=>{
            const todo = action.payload
            const local = localStorage.getItem("local-todo")
            if(local){
                const parsed:Todo[] = JSON.parse(local)
                const update = parsed.map(item=>item.id===todo.id?{
                ...item,completed: todo.completed,
                 }:item)
                localStorage.setItem("local-todo",JSON.stringify(update))
            }
            state.todo.map(item=>item.id===todo.id?{
                ...item,completed: todo.completed
            }:item)
        },
        assignTodos: (state,action:PayloadAction<Todo[]>)=>{
            const newTodos = action.payload
            newTodos.flat()
            state.todo=newTodos
        },
        deleteTodo:(state,action:PayloadAction<Todo>)=>{
            const todo = action.payload
            const local = localStorage.getItem("local-todo")
            if(local){
                const parsed:Todo[] = JSON.parse(local)
                const update = parsed.filter(item=>item.id!==todo.id)
                localStorage.setItem("local-todo",JSON.stringify(update))
            }
            state.todo.filter(item=>item.id!==todo.id)
        }
    }
})

export default todoSlice.reducer
export const { addTodo,titleEdit, assignTodos, deleteTodo, completeEdit } = todoSlice.actions;