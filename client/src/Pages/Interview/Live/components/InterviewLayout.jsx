import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLiveInterview } from "../context/LiveInterviewContext";

import useProctoringEngine from "../../../../hooks/useProctoringEngine";

import HiddenCameraEngine from "./camera/HiddenCameraEngine";
import CameraDialog from "./camera/CameraDialog";
import CameraToggleButton from "./camera/CameraToggleButton";

import InterviewWorkspace from "./workspace/InterviewWorkspace";
import QuestionNavigator from "./navigator/QuestionNavigator";

const InterviewLayout = () => {

  const { session } = useLiveInterview();

  const videoRef = useRef(null);
  const navigate = useNavigate();

  const [cameraOpen, setCameraOpen] = useState(false);

  const {
    isReady,
    isLoading,
    cameraStatus,
    statusMessage
  } = useProctoringEngine(videoRef, session?.id);

  /*
  =================================
  Auto open camera when violation
  =================================
  */
  useEffect(() => {

    if (cameraStatus && cameraStatus !== "OK") {
      setCameraOpen(true);
    }

  }, [cameraStatus]);

  /*
  =================================
  Interview termination listener
  =================================
  */
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
    <div className="grid grid-cols-[120px_1fr] h-screen relative">

      {/* Hidden camera for monitoring */}
      <HiddenCameraEngine videoRef={videoRef} />

      {/* Question navigator */}
      <QuestionNavigator />

      {/* Workspace */}
      <div className="relative">

        <CameraToggleButton
          onClick={() => setCameraOpen((prev) => !prev)}
        />

        <InterviewWorkspace
          isReady={isReady}
          isLoading={isLoading}
        />

      </div>

      {/* Camera dialog */}
      <CameraDialog
        videoRef={videoRef}
        open={cameraOpen}
        status={cameraStatus}
        message={statusMessage}
        onClose={() => setCameraOpen(false)}
      />

    </div>
  );
};

export default InterviewLayout;