const HiddenCameraEngine = ({ videoRef }) => {
  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      style={{ display: "none" }}
    />
  );
};

export default HiddenCameraEngine;