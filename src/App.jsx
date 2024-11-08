import React, { useState } from "react"
import Navbar from "./components/Navbar"
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";


function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);
  // 1
  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id);
    setTodo(t[0].todo);

    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodos);
    saveTodos();
  }
  // 2
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodos);
    saveTodos();
  }
  // 3
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveTodos();
  }
  // 4
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  // 5
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveTodos();
  }
  // funtion to save the todos in local storage
  const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  // useEffect to get the todos from local storage
  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, [])

  // toggle Finished todos
  const toggleFinished = (e) => {
    setShowFinished(!showFinished);
  }

  return (
    <>
      <Navbar />
      <div className="md:container md:mx-auto mx-3 my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
      <h1 className="font-bold text-center text-2xl text-emerald-700">EasyDo - Manage Your Tasks Easily &hearts;</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <div className="flex">
          <input onChange={handleChange} value={todo} type="text" className="w-full rounded-full px-2 py-1" />
          <button onClick={handleAdd} disabled={todo.length<3} className="bg-emerald-700 hover:bg-emerald-800 p-4 py-1 
          text-sm font-bold text-white rounded-md disabled:bg-emerald-800 mx-2">Save</button>
          </div>
        </div>
        <input className="my-3" type="checkbox" onChange={toggleFinished} checked={showFinished} /> Show Finished Todos!!
        <h2 className="text-lg font-bold my-3">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos to display  !!</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between my-3">
              <div className="flex gap-5">
                <input type="checkbox" checked={item.isCompleted} onChange={handleCheckbox} name={item.id} id=""/>
                <div className={item.isCompleted?"line-through":""}> {item.todo} </div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }}
                  className="bg-emerald-700 hover:bg-emerald-800 p-3 py-1 text-sm font-bold text-white rounded-md mx-1"><FaEdit/></button>
                <button onClick={(e) => { handleDelete(e, item.id) }}
                  className="bg-emerald-700 hover:bg-emerald-800 p-3 py-1 text-sm font-bold text-white rounded-md mx-1"><AiFillDelete/></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
