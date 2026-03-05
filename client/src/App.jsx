import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing/Landing";
import SignIn from "./Pages/Auth/SignIn";
import Signup from "./Pages/Auth/Signup";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import InterviewLayout from "./Layouts/InterviewLayout";
import SessionDetail from "./Pages/Session/SessionDetails";
import ToastProvider from "./components/ToastProvider";
import HistoryPage from "./Pages/History/HistoryPage";
import Forgot from "./Pages/Auth/Forgot"
import VerifyOtp from "./Pages/Auth/VerifyOtp";
import NotFound from "./Pages/NotFound";
import ResetPassword from "./Pages/Auth/ResetPassword";
import DeviceCheckPage from "./Pages/Interview/DeviceCheck/DeviceCheckPage";
import CreateInterview from "./Pages/Interview/Create/CreateInterview";
import SetupPage from "./Pages/Interview/Setup/SetupPage";
import TerminatedPage from "./Pages/Interview/Terminated/TerminatedPage";
import EvaluatingPage from "./Pages/Interview/Evaluating/EvaluatingPage";
import Settings from "./Pages/Settings/Settings"
import ResultsPage from "./Pages/Results/ResultsPage";

import LiveInterviewPage from "./Pages/Interview/Live/LiveInterviewPage";

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
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/verifyotp" element={<VerifyOtp />} />          
          <Route path="/resetpassword" element={<ResetPassword />}/>

         
          <Route path="/settings" element={<Settings/>}/>

          <Route path="/interview" element={<InterviewLayout />}>
            <Route path="start" element={<CreateInterview />} />
            <Route path="setup/instructions" element={<SetupPage />} />
            <Route path="device-check" element={<DeviceCheckPage />} />
            <Route path="live/:id" element={<LiveInterviewPage />} />
            <Route path="evaluating" element={<EvaluatingPage />} />
            <Route path="terminated" element={<TerminatedPage />} />
            <Route path="results" element={<ResultsPage />} />  
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;