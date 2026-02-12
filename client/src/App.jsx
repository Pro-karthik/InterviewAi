import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import SignIn from './Pages/Auth/SignIn'
import SignUp from './Pages/Auth/Signup'
import './App.css'

function App() {

  return (
    <>
      <div className="w-full h-screen">
         <SignUp/>
      </div>
        
    </>
  )
}

export default App
