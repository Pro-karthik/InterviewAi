import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing/Landing";
import SignIn from "./Pages/Auth/SignIn";
import Signup from "./pages/Auth/Signup";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
     <AuthProvider>
      <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<div>dashboard</div>} />
          
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;