import { FaLightbulb } from "react-icons/fa";
const ImprovementSection = ({ plan }) => {

  return (
    <div className="bg-white border rounded-lg shadow-sm p-6 mt-6 ">

      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
        <FaLightbulb className="text-[#4D2C5E] inline-block w-5 h-5 mr-2" />
        Improvement Plan
      </h3>

      <p className="text-gray-600 leading-relaxed">
        {plan || "—"}
        </p>

    </div>
  );
};

export default ImprovementSection;