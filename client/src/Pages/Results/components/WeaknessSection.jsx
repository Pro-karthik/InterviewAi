import { FaExclamationTriangle } from "react-icons/fa";
const WeaknessSection = ({ weaknesses }) => {

  return (
    <div className="bg-white border rounded-lg shadow-sm p-6 mt-6">

      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
        <FaExclamationTriangle className="text-[#4D2C5E] inline-block w-5 h-5 mr-2" />
        Areas to Improve
      </h3>

      <p className="text-gray-600 leading-relaxed">
        {weaknesses || "—"}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae laborum, laudantium voluptatibus in tenetur obcaecati, nemo, mollitia eaque dignissimos iste perferendis minus blanditiis! Beatae praesentium voluptate sapiente excepturi impedit. Quaerat.
      </p>

    </div>
  );
};

export default WeaknessSection;