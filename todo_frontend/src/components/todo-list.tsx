"use client"

import { useState } from "react"
import { useQuery, useMutation } from "@apollo/client"
import {
  GetTodosDocument,
  CreateTodoDocument,
  UpdateTodoDocument,
  DeleteTodoDocument,
  ToggleTodoDocument,
  type GetTodosQuery,
  type CreateTodoMutation,
  type UpdateTodoMutation,
  type DeleteTodoMutation,
  type ToggleTodoMutation,
} from "@/generated/graphql"
import TodoItem from "./todo-item"
import AddTodoForm from "./add-todo-form"

export default function TodoList() {
  const { data, loading, error, refetch } = useQuery<GetTodosQuery>(GetTodosDocument)
  
  const [createTodo] = useMutation<CreateTodoMutation>(CreateTodoDocument, {
    onCompleted: () => refetch(),
  })
  
  const [updateTodo] = useMutation<UpdateTodoMutation>(UpdateTodoDocument, {
    onCompleted: () => refetch(),
  })
  
  const [deleteTodo] = useMutation<DeleteTodoMutation>(DeleteTodoDocument, {
    onCompleted: () => refetch(),
  })
  
  const [toggleTodo] = useMutation<ToggleTodoMutation>(ToggleTodoDocument, {
    onCompleted: () => refetch(),
  })

  const handleCreateTodo = async (title: string) => {
    try {
      await createTodo({
        variables: {
          input: { title }
        }
      })
    } catch (error) {
      console.error('Error creating todo:', error)
    }
  }

  const handleUpdateTodo = async (id: string, title: string) => {
    try {
      await updateTodo({
        variables: {
          input: { id, title }
        }
      })
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo({
        variables: {
          input: { id }
        }
      })
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  const handleToggleTodo = async (id: string) => {
    try {
      await toggleTodo({
        variables: {
          input: { id }
        }
      })
    } catch (error) {
      console.error('Error toggling todo:', error)
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error loading todos
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error.message}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const todos = data?.todos || []

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Add New Todo</h2>
        <AddTodoForm onSubmit={handleCreateTodo} />
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Your Todos ({todos.length})
        </h2>
        
        {todos.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No todos</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new todo.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onUpdate={handleUpdateTodo}
                onDelete={handleDeleteTodo}
                onToggle={handleToggleTodo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}