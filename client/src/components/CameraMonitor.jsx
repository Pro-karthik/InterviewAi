import { useRef } from "react";
import useFaceMonitoring from "../hooks/useFaceMonitoring";

const CameraMonitor = () => {
  const videoRef = useRef(null);

 useFaceMonitoring(videoRef);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>AI Camera Monitoring</h2>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          width: "320px",
          height: "280px",
          borderRadius: "12px",
          border: "2px solid #333",
          transform: "scaleX(-1)",
        }}
      />
    </div>
  );
};

export default CameraMonitor;
