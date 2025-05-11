import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Description from '../components/Description'
import Steps from '../components/Steps'
import Footer from '../components/Footer'
import Contact from '../components/Contact'
import About from '../components/About'
import WhatWeOffer from '../components/WhatWeOffer'

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-cover bg-center'>
      <Navbar></Navbar>
      <Header></Header>
      <WhatWeOffer></WhatWeOffer>
      <About></About>
      <Steps></Steps>
      <Description></Description>
      <Contact></Contact>
      <Footer></Footer>
    </div>
  )
}

export default Home
