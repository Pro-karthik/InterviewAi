import { useRef } from "react";
import { useLiveInterview } from "../context/LiveInterviewContext";

import useTabSecurity from "../../../../hooks/useTabSecurity";
import useFaceMonitoring from "../../../../hooks/useFaceMonitoring";
import useHeartbeat from "../../../../hooks/useHeartbeat";

const InterviewLayout = () => {

  const videoRef = useRef(null);

  const { session } = useLiveInterview();

  useTabSecurity();
  useFaceMonitoring(videoRef);
  useHeartbeat(session.id);

  return (
    <div className="h-screen grid grid-cols-2">

      {/* Camera */}
      <div className="bg-black flex items-center justify-center">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* Question panel */}
      <div className="p-6">
        Interview running...
      </div>

    </div>
  );
};

export default InterviewLayout;