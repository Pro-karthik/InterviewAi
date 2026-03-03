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
import {toast} from "react-toastify";

const SKILLS = [
  { name: "React", icon: <FaReact className="text-blue-500" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-600" /> },
  { name: "System Design", icon: <MdDesignServices className="text-purple-500" /> },
  { name: "DevOps", icon: <SiDocker className="text-blue-600" /> },
  { name: "Python", icon: <FaPython className="text-yellow-500" /> },
  { name: "Java", icon: <FaJava className="text-orange-500" /> },
  { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
];

const SKILL_DICTIONARY = {
  react: "React",
  reactjs: "React",
  node: "Node.js",
  nodejs: "Node.js",
  mongodb: "MongoDB",
  mongo: "MongoDB",
  python: "Python",
  java: "Java",
  docker: "DevOps",
  devops: "DevOps",
  systemdesign: "System Design",
};

const MAX_SKILLS = 5;

const sanitizeSkill = (input) => {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s.+#]/gi, "")
    .replace(/\s+/g, " ");
};

const isValidSkillFormat = (skill) => {
  if (!skill) return false;
  if (skill.length < 2 || skill.length > 30) return false;
  return true;
};

const SkillInput = ({ value = [], onChange }) => {
  const [customSkill, setCustomSkill] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const [error, setError] = useState("");

   function handleToast(status, message){
      if (status === "error") {
        toast.error(message, {
          className: "rounded-lg shadow-lg",
          progressClassName: "bg-white",
        });
      }
      else {
        toast.success(message, {
          className: "rounded-lg shadow-lg",
          progressClassName: "bg-white",
        });
      }
    };

  const toggleSkill = (skill) => {
    if (value.includes(skill)) {
      onChange(value.filter((s) => s !== skill));
      setError("");
      return;
    }
   

    if (value.length >= MAX_SKILLS) {
      setError("You can select maximum 5 skills.");
      handleToast("error", "You can select maximum 5 skills.");
      return;
    }



    onChange([...value, skill]);
    handleToast("success", `Skill "${skill}" added.`);
    setError("");
  };

  const addCustomSkill = () => {
    const sanitized = sanitizeSkill(customSkill);

    if (!isValidSkillFormat(sanitized)) {
      // setError("Skill must be 2-30 valid characters.");
      handleToast("error", "Skill must be 2-30 valid characters.");
      return;
    }

    const key = sanitized.replace(/\s/g, "");
    const normalized =
      SKILL_DICTIONARY[key] ||
      sanitized.charAt(0).toUpperCase() + sanitized.slice(1);

    if (value.includes(normalized)) {
      // setError("Skill already selected.");
      handleToast("error", "Skill already selected.");
      return;
    }

    if (value.length >= MAX_SKILLS) {
      handleToast("error", "You can select maximum 5 skills.");
      return;
    }

    onChange([...value, normalized]);
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

      <div className="grid grid-cols-3 gap-4">
        {SKILLS.map((skill) => {
          const active = value.includes(skill.name);

          return (
            <button
              key={skill.name}
              type="button"
              onClick={() => toggleSkill(skill.name)}
              className={`flex items-center gap-3 p-6 rounded-xl border shadow-md transition-all duration-200 ${active
                ? "bg-[#553a63] text-white border-[#4D2C5E] shadow-lg"
                : "bg-white border-gray-200 hover:shadow-md hover:border-[#4D2C5E]/40"
                }`}
            >
              <span className="text-lg">{skill.icon}</span>
              <span className="text-md font-medium">
                {skill.name}
              </span>
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setShowCustom(true)}
          className="flex items-center justify-center gap-2 p-4 rounded-xl border border-dashed border-gray-300 hover:border-[#4D2C5E] hover:shadow-md transition"
        >
          <FiPlus />
          Custom
        </button>
      </div>

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

      {/* {error && (
        <p className="text-sm text-red-500 mt-3">{error}</p>
      )} */}
    </div>
  );
};

export default SkillInput;