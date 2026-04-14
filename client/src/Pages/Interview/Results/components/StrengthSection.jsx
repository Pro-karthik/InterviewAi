import { FaStar } from "react-icons/fa";
const StrengthSection = ({ strengths }) => {

  return (
    <div className="bg-white border rounded-lg shadow-sm p-6 mt-6">

      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
        <FaStar className="text-[#4D2C5E] inline-block w-5 h-5 mr-2" />
        Strengths
      </h3>

      <p className="text-gray-600 leading-relaxed">
        {strengths || "—"}
       </p>

    </div>
  );
};

export default StrengthSection;