import React from 'react'
import { Route,Routes } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import Login from './pages/Login'
import VerifyEmail from './pages/VerifyEmail'
import ResetPassword from './pages/ResetPassword'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import BuyAPlan from './pages/BuyAPlan'
import MiddlePage from './components/MiddlePage'
const App = () => {
  
  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-organge-50' >
      <ToastContainer></ToastContainer>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/email-verify' element={<VerifyEmail></VerifyEmail>}></Route>
        <Route path='/reset-password' element={<ResetPassword></ResetPassword>}></Route>
        <Route path='/buy' element={<BuyAPlan></BuyAPlan>}></Route>
        <Route path='/middle' element={<MiddlePage></MiddlePage>}></Route>


      
         
      </Routes>
    </div>
  
  )
}

export default App
