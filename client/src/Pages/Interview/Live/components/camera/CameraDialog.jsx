import { useEffect, useRef } from "react";

const CameraDialog = ({
  videoRef,
  open,
  faceBox,
  message,
  status,
  onClose
}) => {
  const previewRef = useRef(null);
  const canvasRef = useRef(null);

  /*
  =================================
  Copy stream from hidden video
  =================================
  */
  useEffect(() => {
    if (!open) return;

    const stream = videoRef.current?.srcObject;

    if (previewRef.current && stream) {
      previewRef.current.srcObject = stream;
    }
  }, [open, videoRef]);

  /*
  =================================
  Draw face bounding box
  =================================
  */
  useEffect(() => {
    if (!open) return;
    if (!faceBox) return;

    const canvas = canvasRef.current;
    const video = previewRef.current;

    if (!canvas || !video) return;

    const ctx = canvas.getContext("2d");

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    const scaleX = width / video.videoWidth;
    const scaleY = height / video.videoHeight;

    const x = faceBox.x * scaleX;
    const y = faceBox.y * scaleY;
    const w = faceBox.width * scaleX;
    const h = faceBox.height * scaleY;

    ctx.strokeStyle = status === "OK" ? "#22c55e" : "#ef4444";
    ctx.lineWidth = 2;

    ctx.strokeRect(x, y, w, h);
  }, [faceBox, status, open]);

  if (!open) return null;

  const isReady = status === "OK";

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">

      {/* Compact Dialog */}
      <div className="relative bg-white rounded-xl shadow-xl p-5 border border-gray-200 w-[360px]">

        {/* Close Icon */}
        <button
          onClick={onClose} disabled={!isReady}
          className="absolute top-1 right-2 text-gray-400 hover:text-gray-700 transition"
        >
          ✕
        </button>

        {/* Camera */}
        <div
          className={`relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 transition-all duration-300
          ${
            isReady
              ? "border-2 border-green-500 shadow-[0_0_18px_rgba(34,197,94,0.35)]"
              : "border-2 border-red-500 shadow-[0_0_18px_rgba(239,68,68,0.35)]"
          }`}
        >
          <video
            ref={previewRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover scale-x-[-1]"
          />

          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
          />

          {/* Guide Frame */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className={`w-[65%] h-[70%] rounded-lg border transition-all duration-300
              ${
                isReady
                  ? "border-green-500"
                  : "border-red-400"
              }`}
            />
          </div>

          {/* Status Pill */}
          <div className="absolute top-3 left-3">
            <div
              className={`px-2 py-0.5 text-[11px] rounded-full font-medium
              ${
                isReady
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {isReady ? "Good" : "Adjust"}
            </div>
          </div>
        </div>

        {/* Status Message */}
        <p className="mt-3 text-xs text-gray-500 text-center">
          {message || "Align your face inside the frame"}
        </p>

      </div>
    </div>
  );
};

export default CameraDialog;