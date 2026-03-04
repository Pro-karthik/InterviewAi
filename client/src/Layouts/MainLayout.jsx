import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

function MainLayout({ children }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main
        className={`transition-all duration-300
          ${isOpen ? "ml-72" : "ml-16"}
          p-8`}
      >
        {children}
      </main>
    </div>
  );
}

export default MainLayout;