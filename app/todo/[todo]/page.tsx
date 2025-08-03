"use client"

import { RootState } from "@/libs/redux/store";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export interface Todo {
  userId?: number,
  id: number | string,
  title: string,
  completed: boolean
}

const TodoDetailPage = () => {
  const params = useParams()
  const id = params.todo
  const allTodos = useSelector((state: RootState) => state.todos.todo)
  const todo = allTodos.find(todo => String(todo.id) === String(id))
  if (!todo) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Todo not found</h1>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Todos
          </Link>
        </div>
      </div>
    )
  }


  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-700 transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to Todos
        </Link>
        
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-xl overflow-hidden border border-purple-100">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
              <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${
                todo?.completed 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-yellow-100 text-yellow-600'
              }`}>
                {todo?.completed ? (
                  <span className="text-2xl">✅</span>
                ) : (
                  <span className="text-2xl">⏳</span>
                )}
              </div>
              
              <div className="flex-grow">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    {todo?.title}
                  </h1>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    todo?.completed 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {todo?.completed ? 'Completed' : 'Pending'}
                  </span>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Details</h2>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">ID</p>
                          <p className="font-medium">{todo?.id}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Status</p>
                          <p className="font-medium">
                            {todo?.completed ? '✅ Done' : '⏳ In Progress'}
                          </p>
                        </div>
                        {todo?.userId && (
                          <div>
                            <p className="text-sm text-gray-500">User ID</p>
                            <p className="font-medium">{todo?.userId}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Description</h2>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-gray-600">
                        {todo?.title}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 pt-4">
                    <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-0.5 rounded-lg">
                      <button className="w-full bg-white hover:bg-gray-50 transition-colors rounded-md px-4 py-2 font-medium">
                        Edit Todo
                      </button>
                    </div>
                    <div className="bg-gradient-to-r from-blue-400 to-cyan-400 p-0.5 rounded-lg">
                      <button className="w-full bg-white hover:bg-gray-50 transition-colors rounded-md px-4 py-2 font-medium">
                        {todo?.completed ? 'Mark as Pending' : 'Mark as Completed'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        
        </div>

      </div>
    </div>
  )
}

export default TodoDetailPage;
