import React from 'react'
import Navbar from '../components/Navbar'
import { assets } from '../assets/assets.js'

const BuyAPlan = () => {
    const plans = [
    {
      id: 'Basic',
      price: 10,
      credits: 100,
      desc: 'Best for personal use.'
    },
    {
      id: 'Advanced',
      price: 50,
      credits: 500,
      desc: 'Best for business use.'
    },
    {
      id: 'Business',
      price: 250,
      credits: 5000,
      desc: 'Best for enterprise use.'
    },
  ]
  return (
    <div>
     <Navbar></Navbar>
      <div
    initial={{ opacity: 0.2, y: 100 }}
    transition={{ duration: 1 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }} className=' min-h-[80vh]  text-center pt-14 mb-10'>
     <button className='border border-gray-400 px-10 py-2 rounded-full mb-6 mt-6'>
      Our Plans
     </button>
     <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>Choose The Plan</h1>
     <div className='flex flex-wrap justify-center gap-6 text-left'>
      {plans.map((item,index)=>(
       <div key={index} className='bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500'>
        <img src={assets.logo_icon} alt=""  width={40}/>
        <p className='mt-3 mb-1 font-semibold'>{item.id}</p>
        <p className='text-sm'>{item.desc}</p>
        <p className='mt-6'> <span className='text-3xl font-medium'>${item.price}</span>/{item.credits} credits</p>
        <button className='w-full bg-gray-600 text-white mt-8 twxt-sm rounded-md py-2.5 min-w-52 ' >purchase</button>
       </div>
      ))}
     </div>
    </div>
    </div>
  )
}

export default BuyAPlan
