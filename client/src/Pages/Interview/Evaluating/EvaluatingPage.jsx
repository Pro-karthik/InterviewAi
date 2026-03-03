import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
const steps = [
  "Analyzing your responses...",
  "Evaluating technical depth...",
  "Calculating overall score...",
  "Preparing detailed feedback..."
];

const EvaluatingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        return prev;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-purple-50 flex flex-col items-center justify-center px-6">

      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-2xl p-16 max-w-2xl w-full text-center">

        {/* Animated Loader */}
        <div className="flex justify-center mb-8">
          <HashLoader color="#4D2C5E" size={60} />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">
          Evaluating Your Interview
        </h1>

        <p className="text-gray-500 mb-10">
          Our AI is carefully analyzing your answers to generate insights and a detailed report.
        </p>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`text-lg transition-all duration-300 ${
                index === currentStep
                  ? "text-[#6D3C82] font-semibold"
                  : "text-gray-400"
              }`}
            >
              {step}
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

export default EvaluatingPage;