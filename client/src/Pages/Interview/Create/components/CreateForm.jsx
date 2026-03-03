import { useState } from "react";
import SkillInput from "./SkillInput";
import ExperienceSelector from "./ExperienceSelector";

const CreateForm = ({ onSubmit, loading }) => {
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState("");

  const handleSubmit = () => {
    if (!skills.length) {
      alert("Please select at least one skill.");
      return;
    }

    if (!experience) {
      alert("Please select your experience level.");
      return;
    }

    onSubmit({ skills, experience });
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 to-purple-50 flex flex-col px-12 py-6">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-semibold text-gray-900">
          Configure Your Interview
        </h1>
        <p className="text-gray-500 mt-2">
          Select your skills and experience level to generate a tailored AI interview.
        </p>
      </div>

      <div className="flex flex-1 gap-20">

        {/* Skills Section */}
        <div className="flex-1">
          <SkillInput value={skills} onChange={setSkills} />
        </div>

        {/* Experience Section */}
        <div className="w-[400px]">
          <ExperienceSelector value={experience} onChange={setExperience} />
        </div>

      </div>

      {/* Bottom Action */}
      <div className="pt-8 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-14 py-4 bg-gradient-to-r from-[#4D2C5E] to-[#6D3C82]
                     text-white rounded-2xl shadow-lg hover:shadow-xl
                     hover:scale-[1.02] transition-all duration-200
                     disabled:opacity-50"
        >
          {loading ? "Generating..." : "Start Interview →"}
        </button>
      </div>

    </div>
  );
};

export default CreateForm;