import { useEffect } from "react";
import useSpeechVerification from "../../../../hooks/useSpeechVerification";

const sentence =
  "The quick brown fox jumps over the lazy dog";

const AudioCheck = ({ onSuccess }) => {
  const {
    transcript,
    isListening,
    isVerified,
    error,
    startRecording,
    stopRecording,
    retry,
  } = useSpeechVerification(sentence);

  useEffect(() => {
    if (isVerified) {
      onSuccess();
    }
  }, [isVerified, onSuccess]);

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-4">
        Step 2: Audio Verification
      </h2>

      <p className="mb-6 font-medium">{sentence}</p>

      {!isListening ? (
        <button
          onClick={startRecording}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          Start Recording
        </button>
      ) : (
        <button
          onClick={stopRecording}
          className="px-6 py-2 bg-red-600 text-white rounded-lg"
        >
          Stop Recording
        </button>
      )}

      {transcript && (
        <p className="mt-4 text-gray-600">
          You said: {transcript}
        </p>
      )}

      {error && (
        <div className="mt-4">
          <p className="text-red-600">{error}</p>
          <button
            onClick={retry}
            className="mt-2 px-4 py-1 bg-gray-400 text-white rounded"
          >
            Try Again
          </button>
        </div>
      )}

      {isVerified && (
        <p className="mt-4 text-green-600 font-semibold">
          ✅ Voice Verified
        </p>
      )}
    </div>
  );
};

export default AudioCheck;