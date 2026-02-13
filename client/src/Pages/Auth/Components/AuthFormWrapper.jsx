import React from "react";

function AuthFormWrapper({ children }) {
  return (
    <div className="w-full mx-auto p-6 rounded-lg max-w-md ">
      {children}
    </div>
  );
}

export default AuthFormWrapper;
