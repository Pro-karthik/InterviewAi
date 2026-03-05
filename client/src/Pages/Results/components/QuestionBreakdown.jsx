import { FaBrain } from "react-icons/fa6";
const ScoreItem = ({ label, value }) => (
  <div className="bg-gray-50 rounded-md p-3">
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-sm font-semibold text-gray-900">
      {value ?? "—"}
    </p>
  </div>
);

const QuestionBreakdown = ({ answers = [] }) => {

  if (!answers.length) {
    return (
      <div className="bg-white border rounded-lg shadow-sm p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
        <FaBrain className="text-[#4D2C5E] inline-block w-5 h-5 mr-2" />
          Question Analysis 
        </h2>

        <div className="mt-6 text-gray-500 text-sm">
          No question data available.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-lg shadow-sm p-6 mt-6">

      <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
        <FaBrain className="text-[#4D2C5E] inline-block w-5 h-5 mr-2" />
        Question Analysis
      </h2>

      <div className="space-y-5">

        {answers.map((ans, index) => (

          <div
            key={ans.question_id}
            className="border rounded-md p-5"
          >

            {/* Header */}
            <div className="flex justify-between mb-4">

              <p className="font-medium text-gray-900">
                <strong>Question {index + 1}: &nbsp; </strong>

              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi tempore nam magnam nostrum voluptates laudantium fuga placeat ab provident sunt aliquam distinctio similique expedita incidunt, vitae accusantium, tempora nisi ipsam!z
              </p>

              <p className="text-sm font-semibold text-gray-900">
                Score: {ans.total_score ?? "—"}
              </p>

            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-5 gap-3 text-center mb-4">

              <ScoreItem label="Technical" value={ans.technical_score} />
              <ScoreItem label="Depth" value={ans.depth_score} />
              <ScoreItem label="Clarity" value={ans.clarity_score} />
              <ScoreItem label="Problem" value={ans.problem_solving_score} />
              <ScoreItem label="Communication" value={ans.communication_score} />

            </div>

            {/* Feedback */}
            <p className="text-sm text-gray-600 leading-relaxed">
              {ans.feedback || "—"}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
};

export default QuestionBreakdown;