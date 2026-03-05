import React from 'react'
import { Link } from "react-router-dom";

function GetStarted() {
  return (
    <div className='bg-orange-50 rounded-lg font-poppins text-[1rem] text-black py-20 m-10 text-center items-center flex flex-col gap-10'>
        <div className='max-w-7xl mx-auto px-20 flex flex-col items-center gap-8'>
            <h2 className='text-3xl font-bold text-black'>Ready to Ace Your Next <span className='text-accent-light'>Interview</span></h2>
            <p className='text-center max-w-2xl'>Join InterviewAI today and experience the future of interview preparation. With our personalized AI-driven platform, you can practice real interview scenarios, receive detailed feedback, and boost your confidence for your next big opportunity.</p>
            <Link to="/signin">
              <button className='bg-accent-light text-white font-semibold text-[1rem] px-6 py-3 rounded-md hover:bg-accent-dark transition duration-300'>Get Started</button>
            </Link>
        </div>
    </div>
  )
}

export default GetStarted