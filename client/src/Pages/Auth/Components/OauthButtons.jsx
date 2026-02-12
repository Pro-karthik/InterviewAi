import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

function OauthButtons() {
  return (
    <div className="flex flex-col space-y-4 mt-4">
      <button className="w-full bg-background-muted text-black p-3 rounded-lg hover:bg-background-light transition flex items-center justify-center">
        <FcGoogle className="w-5 h-5 mr-2" />
        Sign in with Google
      </button>
      <button className="w-full bg-background-muted text-black p-3 rounded-lg hover:bg-background-light transition flex items-center justify-center">
        <FaGithub className="w-5 h-5 mr-2" />
        Sign in with GitHub
      </button>
    </div>
  )
}

export default OauthButtons