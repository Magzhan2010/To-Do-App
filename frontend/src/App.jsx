import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [ToInput, setToInput] = useState('')
  useEffect(() => {
    fetch('https://to-do-app-production-76b3.up.railway.app/todos')
      .then(res => res.json())
      .then(data => setTodos(data))
  }, [])
  const handleSubmit = async() => {
    if (ToInput === ' ' || ToInput === null) {
      return null
    }

    const res = await fetch('https://to-do-app-production-76b3.up.railway.app/todos', {
      method: "POST",
      headers: {  'Content-Type': 'application/json'},
      body: JSON.stringify({ task: ToInput })
    })
    setToInput('')
    const res2 = await fetch('https://to-do-app-production-76b3.up.railway.app/todos', {
      method: "GET",
    })
    const data = await res2.json()
    setTodos(data)
  }

  const handleDelete = async(id) => {
    const res = await fetch(`https://to-do-app-production-76b3.up.railway.app/todos/${id}`, {
      method: "DELETE",
    })
    setTodos(todos.filter(item => item.id !== id))
  }
  const handlePut = async(id, done,task) => {
    await fetch(`https://to-do-app-production-76b3.up.railway.app/${id}`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: task,done: !done })
    })
    setTodos(todos.map(item => {
      if(item.id === id) {
        return { ...item,done: !done, update_at: new Date() }
      } else {
        return {...item}
      }
    }))
  }

  return (
  <div className='bg-[#110E6D] h-screen font-mons flex flex-col justify-center'>
    <div className='bg-white w-[60%] mx-auto rounded-3xl px-30 py-5'>
      <h1 className='font-bold text-4xl mb-[38px] text-center'>My To-Do List</h1>
      <div className='flex items-center justify-center mb-10'>
        <input type="text" onChange={e => setToInput(e.target.value)} value={ToInput} placeholder='add your task here' className='bg-[#EDEEF0] flex-1 py-5 px-7 outline-none rounded-4xl' onKeyDown={e => e.key === 'Enter' && handleSubmit()}/>
        
        <button onClick={handleSubmit} className='bg-[#1D60B7] px-8 py-3 text-white rounded-2xl hover:scale-105 transform transition-all self-center'>Add</button>
      </div>
      {todos.map(item => (
        <ul key={item.id} className='flex-1 flex gap-x-3 rounded-xl shadow-md mb-3 py-3 px-4 items-center'>
          <div className={item.done ? "cursor-pointer rounded-full w-6 h-6 border-2 text-white flex items-center justify-center border-[#1D60B7] bg-[#1D60B7]" : "cursor-pointer rounded-full w-6 h-6 border-2 border-[#1D60B7]"} onClick={() => handlePut(item.id, item.done, item.task)}>
            {item.done ? '✔' : ""}
          </div>
          <li className={item.done ? 'line-through text-gray-400' : 'text-md font-semibold'}>{item.task}</li>
          <p className='text-xs text-gray-400'>
            created: {new Date(item.created_at).toLocaleString('ru-RU')} |
          </p>
          <p className='text-xs text-gray-400'>
            finished: {new Date(item.update_at).toLocaleString('ru-RU')}
          </p>
          <button
            onClick={() => handleDelete(item.id)}
            className="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110 ml-auto"
          >
            <svg
              stroke="currentColor"
              viewBox="0 0 24 24"
              fill="none"
              class="h-5 w-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                stroke-width="2"
                stroke-linejoin="round"
                stroke-linecap="round"
              ></path>
            </svg>
          </button>
        </ul>
      ))}
      <div className='text-right mt-6 text-gray-300 text-sm font-bold'>
        by Magzhan
      </div>
    </div>
  </div>
  )
}

export default App
