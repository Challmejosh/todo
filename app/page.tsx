"use client"
import { addTodo, assignTodos, completeEdit, deleteTodo, titleEdit,  } from "@/libs/redux/slice/todoSlice";
import { RootState } from "@/libs/redux/store";
import { Todo } from "@/utils/types";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const allTodos = useSelector((state:RootState)=>state.todos.todo)
  const dispatch = useDispatch()
  const [newTodo, setNewTodo] = useState("");
  const [id,setId] = useState<number|undefined|string>(undefined)
  const [edit,setEdit] = useState<string>("")
  // const [editBool,setEditBool] = useState<boolean>(false)
  const [currentPage,setCurrentPage] = useState<number>(1)
    const handleAddTodo = async (e:FormEvent) => {
      e.preventDefault()
      const new_todo:Todo ={
        title:newTodo,
        id: uuidv4(),
        completed: false,
      }
      await dispatch(addTodo(new_todo))
      setNewTodo("")
    }
    const handleUpdate = async (id:number|string,text?:string)=>{
        const find = allTodos?.find(item=>item.id===id?{...item,title: text}:item)
        if(!find) return
        await dispatch(titleEdit(find))
        setId(undefined)
        return
      }
    const changeStatus = async (id:string|number)=>{
      const find = allTodos.map(item=>item.id===id?{...item,completed:!item.completed}:item)
      if(find)return
      await dispatch(completeEdit(find))
    }
    const itemsPerPage = 10
    const totalPages = Math.ceil(allTodos?.length / itemsPerPage)
    const paginated = allTodos?.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    )

    const handlePagination = (op: "minus" | "plus") => {
      setCurrentPage(prev => {
        if (op === "plus") return Math.min(prev + 1, totalPages)
        if (op === "minus") return Math.max(prev - 1, 1)
        return prev
      })
    }

  return (
      <div className="p-3 flex flex-col gap-5 items-center justify-center ">
        <div className="max-w-md mx-auto w-full sm:w-[800px] mt-10 p-4 border rounded shadow">
          <h1 className="text-2xl font-bold mb-4">Todo List</h1>
          <form onSubmit={handleAddTodo} className="flex mb-4">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add new todo"
              className="flex-grow border border-gray-300 rounded px-3 py-2 mr-2"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add
            </button>
          </form>
        </div>
        <div className="overflow-auto [&::-webkit-scrollbar]:hidden scrollbar h-[400px] w-full sm:w-[600px] border rounded-lg ">
          <table className="min-w-full text-left border-collapse bg-white shadow-sm rounded-lg">
            <thead className="bg-blue-100 text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-3">Todo</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Edit</th>
                <th className="px-4 py-3">toggle</th>
                <th className="px-4 py-3">view</th>
                <th className="px-4 py-3">Delete</th>
              </tr>
            </thead>
            <tbody>
              {allTodos?.length===0?(
                <tr className="">
                  <td colSpan={6} className=" ">
                    <p className="w-full flex items-center justify-center ">
                      todo is empty
                    </p>
                  </td>
                </tr>
              ):(
                <>
                  {paginated?.map((todo) => (
                    <tr key={todo.id} className="border-b hover:bg-blue-50 transition">
                      {id !== todo.id ? (
                        <>
                          <td className="px-4 py-3 text-sm">{todo.title}</td>

                          {/* ✅ Status Toggle */}
                          <td
                            className={`px-4 py-3 text-sm font-medium cursor-pointer`}
                          >
                            {todo.completed ? "Completed ✅" : "Pending ⏳"}
                          </td>

                          <td
                            onClick={() => {
                              setEdit(todo.title);
                              setId(todo.id);
                            }}
                            className="px-4 py-3 text-blue-500 cursor-pointer hover:underline"
                          >
                            Edit
                          </td>

                          <td
                            onClick={() => changeStatus(todo.id)}
                            className={`px-4 py-3 cursor-pointer hover:underline
                            ${todo.completed?"text-yellow-200":
                            "text-green-200"
                            }  
                            `}
                          >
                            {todo?.completed?"Mark as Pending":"Mark as Completed"}
                          </td>
                          <td
                            className="px-4 py-3  cursor-pointer hover:underline"
                          >
                            <Link href={`/todo/${todo.id}`} className="bg-green-50 w-fit p-2 rounded-md">
                              view
                            </Link>
                          
                          </td>
                          <td
                            onClick={() => dispatch(deleteTodo(todo))}
                            className="px-4 py-3 text-red-500 cursor-pointer hover:underline"
                          >
                            <Trash2 />
                          </td>
                        </>
                      ) : (
                        <>
                          <td colSpan={4} className="px-4 py-3">
                            <div className="flex flex-col sm:flex-row gap-2 items-center">
                              <input
                                onChange={(e) => setEdit(e.target.value)}
                                type="text"
                                className="w-full sm:w-auto flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                placeholder={todo.title}
                                value={edit}
                              />
                              <button
                                onClick={() => handleUpdate(todo.id, edit)}
                                className="text-white bg-blue-500 hover:bg-blue-600 text-sm px-4 py-2 rounded-md transition"
                              >
                                Confirm
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </>
              )}
            </tbody>
            <tfoot className=" text-sm">
              <tr>
                <td colSpan={6} className="px-4 py-3">
                  <div className="flex justify-center items-center gap-6">
                    <button 
                    disabled={currentPage===1}
                    onClick={()=>handlePagination("minus")}
                    className="text-blue-500 hover:underline">
                    <ChevronLeft />
                    </button>
                    <p className="">
                      {currentPage} / {totalPages}
                    </p>
                    <button
                    onClick={()=>handlePagination("plus")}
                    className="text-blue-500 hover:underline">
                      <ChevronRight />
                    </button>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>


      </div>
    );
}
