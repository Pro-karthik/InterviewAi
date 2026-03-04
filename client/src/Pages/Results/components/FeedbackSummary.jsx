const FeedbackSummary = ({ strengths, weaknesses }) => {

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">

      <h3 className="text-lg font-semibold text-gray-900">
        Strengths
      </h3>

      <p className="text-gray-600 mt-2">
        {strengths}
      </p>

      <h3 className="text-lg font-semibold text-gray-900 mt-6">
        Areas for Improvement
      </h3>

      <p className="text-gray-600 mt-2">
        {weaknesses}
      </p>

    </div>
  );
};

export default FeedbackSummary;