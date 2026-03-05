import { useRef } from "react";
import { useLiveInterview } from "../context/LiveInterviewContext";

import useProctoringEngine from "../../../../hooks/useProctoringEngine";

const InterviewLayout = () => {
  const { session } = useLiveInterview();

  const videoRef = useRef(null);

  const { isReady, isLoading } = useProctoringEngine(videoRef, session.id);

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