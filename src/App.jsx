import { useState } from 'react'
import './App.css'
import NavBar from './Components/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-white dark:bg-black space-y-3'>
      <header>
        <NavBar></NavBar>
      </header>
      <main className='w-11/12 mx-auto min-h-screen'>
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  )
}

export default App
