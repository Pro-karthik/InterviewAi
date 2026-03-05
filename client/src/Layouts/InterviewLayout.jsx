import { Outlet } from "react-router-dom";
import { InterviewProvider } from "../context/InterviewContext";

const InterviewLayout = () => {
 
  
  return (
    <InterviewProvider>
      <Outlet />
    </InterviewProvider>
  );
};

export default InterviewLayout;