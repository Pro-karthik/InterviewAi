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
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam, perferendis labore repellat molestiae sint illo delectus alias aspernatur dolore quisquam vero impedit? Commodi et earum, perspiciatis autem nobis tempora delectus molestias aut exercitationem, quam aliquam illum corrupti quibusdam. Voluptatibus aut a numquam! Beatae dolores voluptates libero illum commodi nihil esse veniam deserunt eos dignissimos ipsum magni iste ab doloribus repellat molestias quidem modi officiis quis, sit autem eligendi. Sapiente, quaerat corporis quae enim aperiam impedit, sint tempora, vel dolorem dicta aspernatur necessitatibus omnis doloremque sit nesciunt suscipit iure iste ullam! Nesciunt aspernatur assumenda dolor in, est laborum quaerat! Consectetur, corporis.
      </p>

    </div>
  );
};

export default ImprovementSection;