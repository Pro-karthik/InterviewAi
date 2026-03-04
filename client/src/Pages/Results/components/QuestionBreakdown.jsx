const QuestionBreakdown = ({ answers }) => {

  return (
    <div className="mt-12">

      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Question Analysis
      </h2>

      <div className="space-y-8">

        {answers.map((ans, index) => (

          <div
            key={ans.question_id}
            className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm"
          >

            {/* Question Header */}

            <div className="flex justify-between items-start mb-4">

              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  Question {index + 1}
                </p>

                <h4 className="text-lg font-medium text-gray-900 mt-1">
                  {ans.question || "Interview Question"}
                </h4>
              </div>

              <div className="bg-purple-50 text-[#4D2C5E] font-semibold px-4 py-2 rounded-lg">
                {ans.total_score} / 50
              </div>

            </div>

            {/* Score Table */}

            <div className="grid grid-cols-5 gap-4 text-center border border-gray-100 rounded-lg overflow-hidden">

              <div className="bg-gray-50 p-3">
                <p className="text-xs text-gray-500">Technical</p>
                <p className="font-semibold text-gray-800">
                  {ans.technical_score}
                </p>
              </div>

              <div className="bg-gray-50 p-3">
                <p className="text-xs text-gray-500">Depth</p>
                <p className="font-semibold text-gray-800">
                  {ans.depth_score}
                </p>
              </div>

              <div className="bg-gray-50 p-3">
                <p className="text-xs text-gray-500">Clarity</p>
                <p className="font-semibold text-gray-800">
                  {ans.clarity_score}
                </p>
              </div>

              <div className="bg-gray-50 p-3">
                <p className="text-xs text-gray-500">Problem Solving</p>
                <p className="font-semibold text-gray-800">
                  {ans.problem_solving_score}
                </p>
              </div>

              <div className="bg-gray-50 p-3">
                <p className="text-xs text-gray-500">Communication</p>
                <p className="font-semibold text-gray-800">
                  {ans.communication_score}
                </p>
              </div>

            </div>

            {/* Feedback */}

            <div className="mt-4">

              <p className="text-sm text-gray-500 uppercase tracking-wide">
                AI Feedback
              </p>

              <p className="text-gray-700 mt-1 leading-relaxed">
                {ans.feedback}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default QuestionBreakdown;