import { useEffect } from "react";
import useSpeechVerification from "../../../../hooks/useSpeechVerification";

const sentence =
  "I am ready to begin my AI interview session with confidence";

const AudioCheck = ({ onNext }) => {
  const {
    transcript,
    isListening,
    isVerified,
    error,
    startRecording,
    stopRecording,
    retry,
  } = useSpeechVerification(sentence);
  console.log(isVerified,error)

  useEffect(() => {
    if (isVerified) {
      setTimeout(() => {
        onNext();
      }, 1200);
    }
  }, [isVerified, onNext]);

  return (
    <div className="w-full h-[520px] flex gap-12">

      {/* LEFT SIDE */}
      <div className="flex-1 flex flex-col justify-center space-y-8">

        {/* Header */}
        <div className="max-w-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Audio Verification
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Please read the sentence below clearly. This ensures your microphone
            is functioning properly and your voice is captured accurately.
          </p>
        </div>

        {/* Sentence Card */}
        <div className="max-w-lg bg-[#F4ECF7] border border-[#E8DAEF] rounded-2xl p-6">
          <p className="text-lg font-medium text-[#5B2C6F] leading-relaxed text-center">
            “{sentence}”
          </p>
        </div>

        {/* Transcript */}
        <div className="min-h-[60px] max-w-lg">
          {transcript && (
            <div className="text-sm">
              <span className="font-medium text-gray-800 block mb-1">
                You said:
              </span>
              <p className="text-gray-500">{transcript}</p>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-[380px] flex flex-col justify-center space-y-6">

        {/* Recording Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center space-y-6 shadow-sm">

          {/* Mic Indicator */}
          <div className="flex justify-center">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300
              ${
                isListening
                  ? "bg-[#F4ECF7] text-[#5B2C6F] animate-pulse"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              🎤
            </div>
          </div>

          {/* Button */}
          {!isListening ? (
            <button
              onClick={startRecording}
              className="w-full py-3 rounded-xl bg-[#5B2C6F] hover:bg-[#4A235A] text-white font-semibold transition-all duration-200 shadow-sm"
            >
              Start Recording
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-900 text-white font-semibold transition-all duration-200"
            >
              Stop Recording
            </button>
          )}

          {/* Status */}
          <div className="min-h-[24px] text-sm">
            {isListening && (
              <p className="text-[#5B2C6F] font-medium">
                Listening...
              </p>
            )}

            {isVerified && (
              <p className="text-[#5B2C6F] font-semibold">
                Voice Verified Successfully
              </p>
            )}
          </div>
        </div>

        {/* Error Card */}
        {error && (
          <div className="bg-[#FFF5F5] border border-[#F3DCDC] rounded-2xl p-4 text-sm text-gray-700 text-center">
            <p className="mb-3">{error}</p>
            <button
              onClick={retry}
              className="px-4 py-2 rounded-lg bg-gray-800 text-white text-xs font-medium"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioCheck;