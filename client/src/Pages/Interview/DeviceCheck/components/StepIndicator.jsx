const StepIndicator = ({ steps, currentStep }) => {
  return (
    <div className="w-64">
      <div className="relative">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start relative pb-10">
            
            {/* Vertical Line */}
            {index !== steps.length - 1 && (
              <div className="absolute left-5 top-10 w-[2px] h-full bg-gray-200">
                <div
                  className={`w-full bg-[#5B2C6F] transition-all duration-500 ${
                    currentStep > step.id ? "h-full" : "h-0"
                  }`}
                />
              </div>
            )}

            {/* Circle */}
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold z-10 transition-all duration-300
              ${
                currentStep >= step.id
                  ? "bg-[#5B2C6F] text-white shadow-md"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step.id}
            </div>

            {/* Text */}
            <div className="ml-4">
              <p
                className={`text-sm font-semibold ${
                  currentStep >= step.id
                    ? "text-gray-900"
                    : "text-gray-400"
                }`}
              >
                {step.label}
              </p>

              {currentStep === step.id && (
                <p className="text-xs text-gray-500 mt-1">
                  In progress
                </p>
              )}

              {currentStep > step.id && (
                <p className="text-xs text-green-600 mt-1">
                  Completed
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;