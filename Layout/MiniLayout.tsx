import { assignTodos } from "@/libs/redux/slice/todoSlice"
import { Todo } from "@/utils/types"
import { useQuery } from "@tanstack/react-query"
import { ReactNode, useEffect, useState } from "react"
import { useDispatch } from "react-redux"

const MiniLayout = ({children}:{children:ReactNode})=>{
    const dispatch = useDispatch()
    const [todos,setTodos] = useState<Todo[]>([])
    const getTodos = async () =>{
    const todos = await fetch("https://jsonplaceholder.typicode.com/todos")
    if(!todos.ok){
        throw new Error("failed to fetch")
    }
    return todos.json()
    
    }
    const { data, error, isLoading } = useQuery({
        queryKey: ["todos"],
        queryFn: getTodos
    })
    useEffect(() => {
    try {
        const local = localStorage?.getItem("local-todo");
        const parsed: Todo[] = local ? JSON.parse(local) : [];

        const fromServer: Todo[] = Array.isArray(data) ? data.flat() : [];
        const allTodos = [...parsed, ...fromServer];

        setTodos(allTodos);
    } catch (err) {
        console.error("Error loading todos:", err);
    }

    if (error) {
        console.debug(error);
    }
    }, [data, error]);

useEffect(()=>{
    if(todos){
       dispatch(assignTodos(todos))
    }
},[todos])
    return(
        <>
        {children}
        </>
    )
}
export default MiniLayout