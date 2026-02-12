import React from 'react'
import underInterview from '../../../assets/illustrations/under_interview.png'
import working from '../../../assets/illustrations/Working.png'
import filledBuld from '../../../assets/icons/filled_bulb.png'
import arrow from '../../../assets/icons/arrow.png'
import bulb from '../../../assets/icons/bulb.png'
import star from '../../../assets/icons/star.png'
import computer from '../../../assets/icons/computer.png'
import globe from '../../../assets/icons/globe.png'
import pencil from '../../../assets/icons/pencil.png'
import circle from '../../../assets/icons/circle.png'


const Obeservation = () => {
    return (
        <div className='w-full font-body mt-[80px] relative'>
            
            <img className='absolute w-[90px] h-[90px] left-8 top-[-30px]' src={filledBuld} alt="filled buld" />
            <img className='absolute w-[110px] h-[110px] right-8 top-[-30px]' src={arrow} alt="filled buld" />

            <h1 className='text-3xl text-center font-bold mb-10' >WHY THIS EXISTS?</h1>

            <div className='w-full bg-background-muted flex flex-col items-center pt-6'>
                <div className='w-[80%] flex flex-col justify-center'>

                    <div className='flex justify-evenly w-full'>
                        <div className='bg-primary-dark text-white px-6 py-9 rounded-lg h-[300px] '>
                            <h2 className='text-[26px] text-center '>What they notice?</h2>
                            <ul className='flex flex-col gap-4 mt-4'>
                                <li className='font-semibold text-[16px]'> Eye Contact with the Camera</li>
                                <li className='font-semibold text-[16px]'>Facial Confidence While Thinking</li>
                                <li className='font-semibold text-[16px]'>Posture & Body Language</li>
                                <li className='font-semibold text-[16px]'>Nervous Habbits</li>

                            </ul>
                        </div>
                        <div >
                            <img src={underInterview} alt="under_interview" />
                        </div>
                        <div className='bg-primary-dark text-white px-6 py-9 rounded-lg h-[300px] '>
                            <h2 className='text-[26px] text-center '>What they Observe?</h2>
                            <ul className='flex flex-col gap-4 mt-4'>
                                <li className='font-semibold text-[16px]'>Voice Stability under Pressure</li>
                                <li className='font-semibold text-[16px]'>Facial Confidence While Thinking</li>
                                <li className='font-semibold text-[16px]'>Focus Loss during the Follow-ups</li>
                                <li className='font-semibold text-[16px]'>Nervous Habbits</li>

                            </ul>
                        </div>
                    </div>

                <div className='w-full flex '>
                    <div className='w-1/2 relative'>

                       <img className='h-[400px]'  src={working} alt="working image" />
                       {/* elements */}

                        <img className='absolute h-[60px] w-[60px] top-0 left-0' src={bulb} alt="bulb" />
                        <img className='absolute h-[60px] w-[60px] top-0 right-[40%]' src={star} alt="star" />
                        <img className='absolute h-[60px] w-[60px] top-[35%] left-[-10%]' src={computer} alt="computer" />

                        <img className='absolute h-[50px] w-[50px] bottom-5 right-[32%]' src={circle} alt="circle" />
                        <img className='absolute h-[60px] w-[60px] top-[50%] right-[30%]' src={pencil} alt="pencil" />


                        <img className='absolute h-[80px] w-[80px] bottom-10 left-[-10%]' src={globe} alt="globe" />
                       

                    </div>
                    <div className='text-3xl font-semibold text-black w-1/2 flex flex-col gap-2 justify-center items-start'>   
                        <h1>Okay... <span className='text-accent-light'>But Why</span></h1>
                       <h1>has no one helped you with this</h1>
                       <h1>till now</h1>

                       <div className='text-3xl font-semibold text-black mt-10 flex flex-col gap-2 justify-center'> 
                        <h1>That's Exactly Why We Built</h1>
                        <h1 className='text-accent-light'>InterviewAI</h1>
                       </div>
                    </div>
                </div>

                </div>
            </div>
        </div>
    )
}

export default Obeservation;