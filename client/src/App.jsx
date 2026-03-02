import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing/Landing";
import SignIn from "./Pages/Auth/SignIn";
import Signup from "./pages/Auth/Signup";
import { AuthProvider } from "./context/AuthContext";
import SessionDetail from "./Pages/Session/SessionDetails";

function App() {
  return (
    <BrowserRouter>
     <AuthProvider>
      <Routes>
          <Route path="/" element={<SessionDetail />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<div>dashboard</div>} />
          {/* <Route path="/dashboard/session/:id" element={SessionDetail} /> */}
          
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;