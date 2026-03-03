import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing/Landing";
import SignIn from "./Pages/Auth/SignIn";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import SessionDetail from "./Pages/Session/SessionDetails";
import ToastProvider from "./components/ToastProvider";
import HistoryPage from "./Pages/History/HistoryPage";
import DeviceCheckPage from "./Pages/Interview/DeviceCheck/DeviceCheckPage";
import NotFound from "./Pages/NotFound";
import CreateInterview from "./Pages/Interview/Create/CreateInterview";
import SetupPage from "./Pages/Interview/Setup/SetupPage";
import TerminatedPage from "./Pages/Interview/Terminated/TerminatedPage";
import EvaluatingPage from "./Pages/Interview/Evaluating/EvaluatingPage";

function App() {
  return (
    <BrowserRouter>
     <AuthProvider>
      <ToastProvider />
      <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/session/:id" element={<SessionDetail />} />

          <Route path="/interview/start" element={<CreateInterview />} />
          <Route path="/interview/setup/instructions" element={<SetupPage />} />  

          <Route path="/interview/setup/instructions" element={<SetupPage />} />

          <Route path="/interview/evaluating" element={<EvaluatingPage />} />  
          <Route path="/interview/terminated" element={<TerminatedPage />} />





          <Route path="/devicecheck" element={<DeviceCheckPage />} />
           <Route path="*" element={<NotFound />} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;