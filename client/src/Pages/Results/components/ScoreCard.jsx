const ScoreCard = ({ score }) => {

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 flex justify-between items-center border border-gray-100">

      <div>
        <p className="text-gray-500 text-sm uppercase tracking-wide">
          Overall Interview Score
        </p>

        <h2 className="text-5xl font-bold text-[#4D2C5E] mt-2">
          {score}/50
        </h2>

        <p className="text-gray-500 mt-2">
          Based on technical knowledge, clarity and communication
        </p>
      </div>

      <div className="bg-purple-50 px-6 py-4 rounded-xl text-[#4D2C5E] font-semibold">
        AI Evaluation
      </div>

    </div>
  );
};

export default ScoreCard;