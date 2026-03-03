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

  const isReady = isFaceDetected && isCentered && faceDirection === "straight";

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto">

      {/* Video Section */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl bg-black">

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover scale-x-[-1]"
        />

        {/* Center Guide Box */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className={`w-[60%] h-[70%] rounded-xl border-2 border-dashed transition-all duration-300
              ${
                isCentered
                  ? "border-green-500"
                  : "border-white/60"
              }`}
          />
        </div>
      </div>

      {/* Status Panel */}
      <div className="w-full bg-neutral-900 text-white rounded-xl p-5 space-y-3 shadow-lg">

        <StatusItem label="Face Detected" value={isFaceDetected} />
        <StatusItem label="Centered" value={isCentered} />
        <StatusItem
          label="Looking Straight"
          value={faceDirection === "straight"}
        />

        <div className="text-center text-sm mt-2 font-medium text-gray-300">
          {alignmentMessage}
        </div>

        {/* Next Step Button */}
        <button
          disabled={!isReady}
          onClick={onNext}
          className={`w-full mt-4 py-3 rounded-xl font-semibold transition-all duration-300
            ${
              isReady
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

const StatusItem = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-gray-300">{label}</span>
    <span
      className={`font-semibold ${
        value ? "text-green-500" : "text-red-500"
      }`}
    >
      {value ? "✓" : "✗"}
    </span>
  </div>
);

export default CameraCheck;