import { useState } from "react";
import SkillInput from "./SkillInput";
import ExperienceSelector from "./ExperienceSelector";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners"
import { useInterview } from "../../../../context/InterviewContext";


const CreateForm = ({ onSubmit, loading }) => {

  const { skills,
    experience,
    sessionId,
    setSkills,
    setExperience,
    setSessionId, } = useInterview();

  const handleSubmit = () => {
    if (!skills.length) {
      toast.error("Please enter at least one skill.", {
        className: "rounded-lg shadow-lg",
        progressClassName: "bg-white",
      });
      return;
    }

    if (!experience) {
      toast.error("Please select your experience level.", {
        className: "rounded-lg shadow-lg",
        progressClassName: "bg-white",
      });
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

      <div>
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
            <HashLoader color="#4D2C5E" size={60} />
          </div>
        )}
      </div>
      <div className="flex flex-1 gap-20">

        {/* Skills Section */}
        <div className="flex-1">
          <SkillInput value={skills} onChange={setSkills} loading={loading} />
        </div>

        {/* Experience Section */}
        <div className="w-[400px]">
          <ExperienceSelector value={experience} onChange={setExperience} loading={loading} />
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

          {loading ? "Validating..." : "Start Interview →"}
        </button>
      </div>

    </div>
  );
};

export default CreateForm;