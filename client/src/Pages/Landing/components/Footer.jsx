import React from 'react'
import pimai from '../../../assets/illustrations/pimai-icon.png'

function Footer() {
  return (
    <div className='w-full font-heading bg-background-muted text-[#606060] text-sm'>

      <div className='max-w-7xl mx-auto px-10 py-10 flex flex-wrap gap-10 justify-between'>

        <div className='flex-1 min-w-[200px] '>
          <img src={pimai} alt="Pimai Logo" className='w-40' />
          <p className='mt-4'>
            InterviewAI is a personalized AI interview platform that simulates real
            interviews, analyzes behavior, and delivers actionable feedback.
            Train smarter. Interview with confidence.
          </p>
        </div>

        <div className='flex-1 min-w-[150px] ml-4'>
          <h3 className='font-semibold text-black mb-4'>Use Cases</h3>
          <p className='mb-3'>For Students</p>
          <p className='mb-3'>For Freshers</p>
          <p className='mb-3'>For Job Seekers</p>
          <p className='mb-3'>For Internship preparation</p>
        </div>

        <div className='flex-1 min-w-[150px]'>
          <h3 className='font-semibold text-black mb-4'>Developers</h3>
          <p className='mb-3'>Github repo</p>
          <p className='mb-3'>Tech Stack</p>
          <p className='mb-3'>System Design</p>
          <p className='mb-3'>Road Map</p>
        </div>

        <div className='flex-1 min-w-[150px]'>
          <h3 className='font-semibold text-black mb-4'>Product</h3>
          <p className='mb-3'>Why This Exists?</p>
          <p className='mb-3'>Personalized Solution</p>
          <p className='mb-3'>How it Works</p>
        </div>

        <div className='flex-1 min-w-[200px]'>
          <h3 className='font-semibold text-black mb-4'>Contact Info</h3>
          <p className='mb-3'>Email: contact@interviewai.com</p>
          <p className='mb-3'>Phone: +1 (123) 456-7890</p>
          <p className='mb-3'>Address: 123 AI Street, Tech City, USA</p>
        </div>

      </div>

      <p className='text-center border-t border-black py-4 text-sm'>
        © 2024 InterviewAI. All rights reserved.
      </p>

    </div>
  )
}

export default Footer
