import React, { useMemo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import API_URL from './config'
import TodoList from './TodoList'
import TodoService from './commons/TodoService'

export default function TodoListPage() {
  const [todoService, setTodoService] = useState()
  useEffect(() => {
        //TODO: Instantiate the todoService. Note: the api_url is available in the config file
  }, [])

  return (
    <>
      {todoService ? (
        <TodoListInstantiated todoService={todoService} />
      ) : (
        <p>loading</p>
      )}
    </>
  );
}


function TodoListInstantiated({ todoService }) {
  const [todos, setTodos] = useState([])
  const { filter } = useParams()
  const navigate = useNavigate();

  useEffect(() => {
    if (["", "all", "completed", "active"].indexOf(filter) === -1) {
      navigate("/all");
    } else {
      todoService.fetch(filter).then(setTodos)
    }
  }, [filter, todoService])

  const createTodo = (title,author,tag) =>
    todoService.add(title, author, tag).then(setTodos)
  const deleteTodo = todo => todoService.delete(todo).then(setTodos)
  const clearTodos = filter =>
    todoService.deleteMany(filter).then(setTodos)
  const switchTodoCompletedStatus = todo => {
    todoService.switchTodoCompletedStatus(todo).then(setTodos)
  }
  const getAuthorAndTag = todo => {
    return todoService.getAuthorAndTag(todo)
  }

  return <TodoList
    todos={todos}
    createTodo={createTodo}
    deleteTodo={deleteTodo}
    clearTodos={clearTodos}
    switchTodoCompletedStatus={switchTodoCompletedStatus}
    getAuthorAndTag={getAuthorAndTag}
    filter={filter}
  />
}