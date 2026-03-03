import { useState } from "react";
import {
  FaReact,
  FaNodeJs,
  FaJava,
  FaPython,
} from "react-icons/fa";
import { SiMongodb, SiDocker } from "react-icons/si";
import { MdDesignServices } from "react-icons/md";
import { FiPlus, FiX } from "react-icons/fi";

const SKILLS = [
  { name: "React", icon: <FaReact className="text-blue-500" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-600" /> },
  { name: "System Design", icon: <MdDesignServices className="text-purple-500" /> },
  { name: "DevOps", icon: <SiDocker className="text-blue-600" /> },
  { name: "Python", icon: <FaPython className="text-yellow-500" /> },
  { name: "Java", icon: <FaJava className="text-orange-500" /> },
  { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
];

const MAX_SKILLS = 5;

const SkillInput = ({ value = [], onChange }) => {
  const [customSkill, setCustomSkill] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const [error, setError] = useState("");

  const toggleSkill = (skill) => {
    if (value.includes(skill)) {
      onChange(value.filter((s) => s !== skill));
      setError("");
      return;
    }

    if (value.length >= MAX_SKILLS) {
      setError("You can select maximum 5 skills.");
      return;
    }

    onChange([...value, skill]);
    setError("");
  };

  const addCustomSkill = () => {
    const trimmed = customSkill.trim();
    if (!trimmed) return;

    if (value.includes(trimmed)) return;

    if (value.length >= MAX_SKILLS) {
      setError("You can select maximum 5 skills.");
      return;
    }

    onChange([...value, trimmed]);
    setCustomSkill("");
    setShowCustom(false);
    setError("");
  };

  return (
    <div className="h-full flex flex-col">

      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Select Skills
        </h2>
        <p className="text-sm text-gray-500">
          Choose up to {MAX_SKILLS} skills for your interview.
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-3 gap-4">

        {SKILLS.map((skill) => {
          const active = value.includes(skill.name);

          return (
            <button
              key={skill.name}
              type="button"
              onClick={() => toggleSkill(skill.name)}
              className={`
                flex items-center gap-3 p-6 rounded-xl border shadow-md
                transition-all duration-200
                ${
                  active
                    ? "bg-[#553a63] text-white border-[#4D2C5E] shadow-lg"
                    : "bg-white border-gray-200 hover:shadow-md hover:border-[#4D2C5E]/40"
                }
              `}
            >
              <span className="text-lg">{skill.icon}</span>
              <span className="text-md font-medium">
                {skill.name}
              </span>
            </button>
          );
        })}

        {/* Custom Skill Card */}
        <button
          type="button"
          onClick={() => setShowCustom(true)}
          className="flex items-center justify-center gap-2 p-4 rounded-xl border border-dashed border-gray-300 hover:border-[#4D2C5E] hover:shadow-md transition"
        >
          <FiPlus />
          Custom
        </button>
      </div>

      {/* Custom Input */}
      {showCustom && (
        <div className="mt-4 flex gap-3">
          <input
            type="text"
            placeholder="Enter custom skill..."
            value={customSkill}
            onChange={(e) => setCustomSkill(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#4D2C5E] outline-none"
          />
          <button
            type="button"
            onClick={addCustomSkill}
            className="px-5 bg-[#4D2C5E] text-white rounded-lg"
          >
            Add
          </button>
        </div>
      )}

      {/* Selected Skills Tags */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {value.map((skill) => (
            <div
              key={skill}
              className="flex items-center gap-2 bg-[#4D2C5E]/10 text-[#4D2C5E] px-3 py-1 rounded-full text-xs"
            >
              {skill}
              <button onClick={() => toggleSkill(skill)}>
                <FiX size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-500 mt-3">{error}</p>
      )}

    </div>
  );
};

export default SkillInput;