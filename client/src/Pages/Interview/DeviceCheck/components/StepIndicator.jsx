const StepIndicator = ({ step }) => {
  return (
    <div className="flex justify-center gap-6 mb-8">
      <div className={step === 1 ? "font-bold" : ""}>
        1️⃣ Camera
      </div>
      <div className={step === 2 ? "font-bold" : ""}>
        2️⃣ Audio
      </div>
      <div className={step === 3 ? "font-bold" : ""}>
        3️⃣ Ready
      </div>
    </div>
  );
};

export default StepIndicator;