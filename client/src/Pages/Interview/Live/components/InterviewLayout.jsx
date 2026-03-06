import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLiveInterview } from "../context/LiveInterviewContext";

import useProctoringEngine from "../../../../hooks/useProctoringEngine";

const InterviewLayout = () => {

  const { session } = useLiveInterview();
  const sessionId = session?.id;

  const videoRef = useRef(null);
  const navigate = useNavigate();

  const { isReady, isLoading } =
    useProctoringEngine(videoRef, sessionId);

  useEffect(() => {

    const handler = () => {
      navigate("/interview/terminated");
    };

    window.addEventListener("INTERVIEW_TERMINATED", handler);

    return () => {
      window.removeEventListener("INTERVIEW_TERMINATED", handler);
    };

  }, [navigate]);

  return (
    <div className="grid grid-cols-2 h-screen">

      {/* Camera panel */}
      <div className="bg-black relative">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover scale-x-[-1]"
        />

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white">
            Preparing proctoring system...
          </div>
        )}

        {!isLoading && !isReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-red-400">
            Monitoring initialization failed
          </div>
        )}
      </div>

      {/* Interview panel */}
      <div className="p-6">
        {isReady ? "Interview Running" : "Initializing Interview..."}
      </div>

    </div>
  );
};

export default InterviewLayout;