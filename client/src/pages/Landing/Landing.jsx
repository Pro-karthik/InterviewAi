import React from 'react'
import Hero from './components/Hero';
import Features from './components/Features';
import Obeservation from './components/Obeservation';
import Interviewer from './components/Interviewer';
import Working from './components/Working';
import Footer from './components/Footer';
const Landing = () => {
  return (<>
    <div className=' w-full flex items-center flex-col'>
      <div className='w-[80vw]'>
        <Hero />
        <Features />
      </div>
      <div className='w-full flex flex-col items-center'>
        <Obeservation />
        <Interviewer />
        <Working />
        <Footer />
      </div>
    </div>
  </>

  )
}

export default Landing;