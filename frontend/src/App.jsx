import { useEffect, useState } from 'react'
import './App.css'
import { BeatLoader, ClipLoader } from 'react-spinners'

function App() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)
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
    setLoading(true)
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
    setLoading(false)
  }

  const handleDelete = async(id) => {
    setLoading(true)
    const res = await fetch(`https://to-do-app-production-76b3.up.railway.app/todos/${id}`, {
      method: "DELETE",
    })
    setTodos(todos.filter(item => item.id !== id))
    setLoading(false)
  }
  const handlePut = async(id, done,task) => {
    setLoading(true)
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
    setLoading(false)
  }

  return (
  <div className='bg-[#110E6D] h-screen font-mons flex flex-col justify-center'>
    <div className='bg-white  w-[95%] md:w-[60%] lg:w-[50%] mx-auto rounded-3xl px-10 md:px-20 py-10'>
      <h1 className='font-bold text-xl md:text-2xl
whitespace-nowrap mb-[38px] text-center'>My To-Do List</h1>
      <div className='flex flex-col sm:flex-row gap-2 items-center justify-center mb-10'>

        <input type="text" onChange={e => setToInput(e.target.value)} value={ToInput} placeholder='add your task here' className='bg-[#EDEEF0] w-full py-3 px-4 md:py-5 md:px-7 outline-none rounded-4xl' onKeyDown={e => e.key === 'Enter' && handleSubmit()}/>
        
        <button onClick={handleSubmit} className='bg-[#1D60B7] w-full sm:w-auto px-8 py-3 text-white rounded-2xl hover:scale-105 transform transition-all self-center'>{loading ? <BeatLoader color="white" size={15}/> : "Add"}</button>
      </div>

      {todos.map(item => (
        <ul key={item.id} className='flex-1 flex flex-wrap gap-x-2 justify-between rounded-xl shadow-md mb-3 py-3 px-4 items-center'>
          <div className={item.done ? "cursor-pointer rounded-full w-6 h-6 border-2 text-white flex items-center justify-center border-[#1D60B7] bg-[#1D60B7]" : "cursor-pointer rounded-full w-6 h-6 border-2 border-[#1D60B7]"} onClick={() => handlePut(item.id, item.done, item.task)}>
            {item.done ? '✔' : ""}
          </div>
          <li className={item.done ? 'line-through text-gray-400 flex-1 break-words min-w-0' : 'text-sm font-semibold flex-1 break-words min-w-0'}>
            {item.task}
          </li>
          <div className='w-full flex gap-2 mt-1'>
            <p className='text-[10px] text-gray-400'>
              🕐 created: {new Date(item.created_at).toLocaleString('ru-RU')} |
            </p>

            <p className='text-[10px] text-gray-400'>
              ✅ finished: {new Date(item.update_at).toLocaleString('ru-RU')}
            </p>
          </div>

          <button
            onClick={() => handleDelete(item.id)}
            className="inline-flex items-center px-2 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110 ml-auto"
          >
            <svg
              stroke="currentColor"
              viewBox="0 0 24 24"
              fill="none"
              class="h-5 w-5"
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
