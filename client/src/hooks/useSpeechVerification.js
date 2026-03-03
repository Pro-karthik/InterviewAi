import { useRef, useState } from "react";

const useSpeechVerification = (expectedSentence) => {
  const recognitionRef = useRef(null);

  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");

  const startRecording = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = true;

    recognitionRef.current = recognition;

    setTranscript("");
    setIsVerified(false);
    setError("");
    setIsListening(true);

    recognition.onresult = (event) => {
      const spokenText = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(" ");

      setTranscript(spokenText);
    };

    recognition.start();
  };

  const stopRecording = () => {
    if (!recognitionRef.current) return;

    recognitionRef.current.stop();
    setIsListening(false);

    const match = isExactSentenceMatch(
      transcript,
      expectedSentence
    );

    if (match) {
      setIsVerified(true);
    } else {
      setError("Sentence does not match. Please try again.");
    }
  };

  const retry = () => {
    setTranscript("");
    setIsVerified(false);
    setError("");
  };

  return {
    transcript,
    isListening,
    isVerified,
    error,
    startRecording,
    stopRecording,
    retry,
  };
};

const normalizeText = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .trim()
    .split(/\s+/);
};

const isExactSentenceMatch = (spoken, expected) => {
  const spokenWords = normalizeText(spoken);
  const expectedWords = normalizeText(expected);

  if (spokenWords.length !== expectedWords.length) {
    return false;
  }

  for (let i = 0; i < expectedWords.length; i++) {
    if (spokenWords[i] !== expectedWords[i]) {
      return false;
    }
  }

  return true;
};

export default useSpeechVerification;