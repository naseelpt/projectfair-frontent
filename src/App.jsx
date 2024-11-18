

import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Project from './pages/Project'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Pagenotfound from './pages/Pagenotfound'
import Footer from './component/Footer'
import Header from './component/Header'
import { useContext } from 'react'
import { loginResponseContext } from './context/Contextshare'






function App() {
  const {loginrespose} = useContext(loginResponseContext)
  

  return (
    <>
    {/* <Header/> */}
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/projects' element={loginrespose?<Project/>:<Pagenotfound/>}/>
    <Route path='/login' element={<Auth/>}/>
    <Route path='/register' element={<Auth register={true}/>}/>
    <Route path='/dashboard' element={loginrespose?<Dashboard/>:<Pagenotfound/>}/>
    <Route path='/*' element={<Pagenotfound/>}/>
    


    </Routes>
    <Footer/>
      
    </>
  )
}

export default App
