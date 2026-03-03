import { useState } from "react";
import useCameraStream from "../../../hooks/useCameraStream";
import CameraCheck from "./components/CameraCheck";
import AudioCheck from "./components/AudioCheck";
import StepIndicator from "./components/StepIndicator";

const steps = [
  { id: 1, label: "Camera Check" },
  { id: 2, label: "Audio Check" },
  { id: 3, label: "Ready" },
];

const DeviceCheckPage = () => {
  const { stream, error } = useCameraStream();
  const [step, setStep] = useState(2);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] px-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center max-w-md w-full">
          <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-red-50 text-red-500 mb-4 text-xl font-semibold">
            !
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Permission Required
          </h2>
          <p className="text-sm text-gray-500">
            Camera or microphone access was denied. Please allow permissions
            and refresh the page to continue.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] px-6 py-14">

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Device Setup
        </h1>
        <p className="text-gray-500 text-sm max-w-2xl">
          Before starting your interview, let's ensure your camera and
          microphone are working properly.
        </p>
      </div>

      {/* Layout */}
      <div className="max-w-6xl mx-auto flex gap-16">

        {/* LEFT - Vertical Stepper */}
        <StepIndicator steps={steps} currentStep={step} />

        {/* RIGHT - Content */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 min-h-[450px]">

            {step === 1 && stream && (
              <CameraCheck
                stream={stream}
                onNext={() => setStep(2)}
              />
            )}

            {step === 2 && (
              <AudioCheck
                onNext={() => setStep(3)}
              />
            )}

            {step === 3 && (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-[#F4ECF7] text-[#5B2C6F] text-2xl font-bold">
                  ✓
                </div>

                <h2 className="text-2xl font-semibold text-gray-900">
                  All Checks Completed
                </h2>

                <p className="text-gray-500 text-sm max-w-md mx-auto">
                  Your camera and microphone are ready. You're all set to begin
                  your AI-powered interview session.
                </p>

                <button className="mt-6 px-8 py-3 bg-[#5B2C6F] hover:bg-[#4A235A] text-white rounded-xl font-semibold shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#5B2C6F]/30">
                  Start Interview
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceCheckPage;