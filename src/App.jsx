import './App.css'
import NavBar from './Components/NavBar'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Components/Footer'

function App() {
  const location = useLocation();
  const noHeaderFooter = location.pathname.includes('signIn') || location.pathname.includes('signUp');

  return (
    <div className='space-y-5'>
      <header className='sticky top-0 z-50 bg-white shadow-md'>
        {noHeaderFooter || <NavBar></NavBar>}
      </header>
      <main className='w-11/12 mx-auto min-h-screen'>
        <Outlet></Outlet>
      </main>
      <footer>
        {noHeaderFooter || <Footer></Footer>}
      </footer>
    </div>
  )
}

export default App
