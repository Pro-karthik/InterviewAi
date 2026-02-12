import React from 'react'

const Working = () => {
  return (
    <div className='w-full'>
      <h1 className='text-3xl text-center font-bold mb-2'>HOW IT WORKS</h1>
      <p className='text-text-secondary text-center mb-4'>How The AI Interviewer Works</p>

      <div className='w-full flex flex-wrap justify-center gap-12'>

        <div className='w-[26%] bg-white shadow-soft rounded-xl p-6 h-[300px] flex flex-col gap-3'>
          <div className='flex gap-6 w-full'>
            <div className='p-5 rounded-[50%] bg-accent-dark w-[60px] h-[60px] inline-flex justify-center items-center'>
              <h1 className='text-white text-2xl'>1</h1>
            </div>
            <div>
              <h1 className='text-[24px] text-start font-bold'>CHOOSE YOUR INTERVIEW</h1>
            </div>
          </div>
          <p className='text-text-secondary text-base'>
            Pick your job role, tech stack, and experience level. The AI builds an interview specifically for you — not generic, not random
          </p>
        </div>

        <div className='w-[25%] bg-white shadow-soft rounded-xl p-6 h-[300px] flex flex-col gap-3'>
          <div className='flex gap-6 w-full'>
            <div className='p-5 rounded-[50%] bg-accent-dark w-[60px] h-[60px] inline-flex justify-center items-center'>
              <h1 className='text-white text-2xl'>2</h1>
            </div>
            <div>
              <h1 className='text-[24px] text-start font-bold'>START THE INTERVIEW</h1>
            </div>
          </div>
          <p className='text-text-secondary text-base'>
            Turn on your camera and microphone. The timer starts, focus is monitored, and behavior tracking begins — just like a real interview setup.
          </p>
        </div>

        <div className='w-[25%] bg-white shadow-soft rounded-xl p-6 h-[300px] flex flex-col gap-3'>
          <div className='flex gap-6 w-full'>
            <div className='p-5 rounded-[50%] bg-accent-dark w-[60px] h-[60px] inline-flex justify-center items-center'>
              <h1 className='text-white text-2xl'>3</h1>
            </div>
            <div>
              <h1 className='text-[24px] text-start font-bold'>ANSWER & ADAPT</h1>
            </div>
          </div>
          <p className='text-text-secondary text-base'>
           Answer using voice or text. Based on your responses, the AI asks follow-up questions that test depth, clarity, and confidence.
          </p>
        </div>

        <div className='w-[25%] bg-white shadow-soft rounded-xl p-6 h-[300px] flex flex-col gap-3'>
          <div className='flex gap-6 w-full'>
            <div className='p-5 rounded-[50%] bg-accent-dark w-[60px] h-[60px] inline-flex justify-center items-center'>
              <h1 className='text-white text-2xl'>4</h1>
            </div>
            <div>
              <h1 className='text-[24px] text-start font-bold'>GET DETAILED FEEDBACK</h1>
            </div>
          </div>
          <p className='text-text-secondary text-base'>
          Receive a complete interview report covering technical skills, communication clarity, confidence, eye contact, and focus — with clear areas to improve.
          </p>
        </div>

      </div>
    </div>
  )
}

export default Working
