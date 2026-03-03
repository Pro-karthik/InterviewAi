import { useEffect, useState } from "react";

const useCameraStream = () => {
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mediaStream;

    const init = async () => {
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(mediaStream);
      } catch (err) {
        setError(err);
      }
    };

    init();

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return { stream, error };
};

export default useCameraStream;