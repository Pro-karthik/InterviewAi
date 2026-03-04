const ImprovementPlan = ({ plan }) => {

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">

      <h3 className="text-lg font-semibold text-gray-900">
        Recommended Learning Plan
      </h3>

      <p className="text-gray-600 mt-3">
        {plan}
      </p>

    </div>
  );
};

export default ImprovementPlan;