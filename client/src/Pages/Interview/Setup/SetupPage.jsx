import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InstructionList from "./components/InstructionList";
import DeclarationBox from "./components/DeclarationBox";

const SetupPage = () => {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  const handleContinue = () => {
    if (!agreed) return;
    navigate('/interview/device-check/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 mt-5">
      <div className="max-w-3xl w-full bg-white border rounded-xl shadow-sm p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Interview Instructions
        </h2>
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm p-3 rounded-lg">
  ⚠️ This is a monitored and AI-proctored interview session.
</div>
        <InstructionList />

        <DeclarationBox checked={agreed} onChange={setAgreed} />

        <button
          onClick={handleContinue}
          disabled={!agreed}
          className="w-full bg-gradient-to-r from-[#4D2C5E] to-[#6D3C82] text-white py-3 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.01] disabled:opacity-50 transition-all duration-200"
        >
          Continue to Device Check
        </button>
      </div>
    </div>
  );
};

export default SetupPage;
