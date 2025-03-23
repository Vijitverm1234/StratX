import React from 'react'
import { Route,Routes } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import Login from './pages/Login'
import VerifyEmail from './pages/VerifyEmail'
import ResetPassword from './pages/ResetPassword'

const App = () => {
  return (
    <div >
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/email-verify' element={<VerifyEmail></VerifyEmail>}></Route>
        <Route path='/reset-password' element={<ResetPassword></ResetPassword>}></Route>
    
         
      </Routes>
    </div>
  
  )
}

export default App
