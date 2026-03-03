import { useState } from "react";
import useCameraStream from "../../../hooks/useCameraStream";
import CameraCheck from "./components/CameraCheck";
import AudioCheck from "./components/AudioCheck";
import StepIndicator from "./components/StepIndicator";

const DeviceCheckPage = () => {
  const { stream, error } = useCameraStream();
  const [step, setStep] = useState(1);

  if (error) {
    return <p>Camera/Microphone access denied</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <StepIndicator step={step} />

      {step === 1 && stream && (
        <CameraCheck
          stream={stream}
          onSuccess={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <AudioCheck
          onSuccess={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            ✅ All Checks Completed
          </h2>
          <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg">
            Start Interview
          </button>
        </div>
      )}
    </div>
  );
};

export default DeviceCheckPage;