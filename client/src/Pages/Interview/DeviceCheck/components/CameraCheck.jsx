import { useEffect, useRef } from "react";
import useCameraPositionCheck from "../../../../hooks/useCameraPositionCheck";

const CameraCheck = ({ stream, onNext }) => {
  const videoRef = useRef(null);

  const {
    isFaceDetected,
    isCentered,
    faceDirection,
    alignmentMessage,
  } = useCameraPositionCheck(videoRef);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const isReady =
    isFaceDetected &&
    isCentered &&
    faceDirection === "straight";

  return (
    <div className="w-full h-[520px] flex gap-10">

      {/* LEFT — Camera Section */}
      <div className="flex-1 flex flex-col justify-between">

        {/* Header */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Camera Setup
          </h2>
          <p className="text-sm text-gray-500 max-w-md">
            Ensure your face is clearly visible and positioned correctly.
            Proper alignment helps verify your identity securely.
          </p>
        </div>

        {/* Video */}
       <div
  className={`relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 transition-all duration-300
  ${
    isReady
      ? "border-2 border-green-500 shadow-[0_0_25px_rgba(34,197,94,0.35)]"
      : isFaceDetected
      ? "border-2 border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.35)]"
      : "border border-gray-200"
  }`}
>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover scale-x-[-1]"
          />

          {/* Guide Frame */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div
  className={`w-[65%] h-[75%] rounded-xl border-2 transition-all duration-300
  ${
    isReady
      ? "border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.35)]"
      : isFaceDetected
      ? "border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.35)]"
      : "border-gray-300"
  }`}
/>
          </div>

          {/* Status Pill */}
          <div className="absolute top-4 left-4">
            <div
              className={`px-3 py-1 text-xs rounded-full font-medium transition-all
              ${
                isReady
                  ? "bg-[#F4ECF7] text-[#5B2C6F]"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {isReady ? "Ready" : "Adjust Position"}
            </div>
          </div>
        </div>

        {/* Live Instruction */}
        <div className="text-sm text-gray-500 min-h-[24px]">
          {alignmentMessage ||
            "Position your face inside the frame and look directly at the camera."}
        </div>
      </div>

      {/* RIGHT — Checklist & Actions */}
      <div className="w-[380px] flex flex-col justify-between">

        {/* Status Card */}
        <div className="bg-[#F8F9FA] border border-gray-200 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            Verification Status
          </h3>

          <StatusItem label="Face detected" value={isFaceDetected} />
          <StatusItem label="Centered in frame" value={isCentered} />
          <StatusItem
            label="Looking straight"
            value={faceDirection === "straight"}
          />
        </div>

        {/* Guidelines */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-3">
          <h3 className="text-sm font-semibold text-gray-900">
            Guidelines
          </h3>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>• Ensure proper lighting on your face</li>
            <li>• Remove hats or face coverings</li>
            <li>• Avoid multiple people in frame</li>
            <li>• Keep camera at eye level</li>
          </ul>
        </div>

        {/* CTA */}
        <button
          disabled={!isReady}
          onClick={onNext}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-200
          ${
            isReady
              ? "bg-[#5B2C6F] hover:bg-[#4A235A] text-white shadow-sm"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Continue to Audio Check
        </button>
      </div>
    </div>
  );
};

const StatusItem = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-gray-600">{label}</span>
    <span
      className={`font-medium transition-colors
      ${
        value
          ? "text-[#5B2C6F]"
          : "text-gray-400"
      }`}
    >
      {value ? "Verified" : "Pending"}
    </span>
  </div>
);

export default CameraCheck;