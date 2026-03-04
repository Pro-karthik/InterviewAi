import { FaUserGraduate, FaUserTie } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { RiUserStarLine } from "react-icons/ri";

const EXPERIENCES = [
  {
    label: "Fresher",
    desc: "0-1 Years",
    icon: <FaUserGraduate className="text-blue-500" />,
  },
  {
    label: "Junior",
    desc: "1-3 Years",
    icon: <MdWork className="text-green-500" />,
  },
  {
    label: "Mid-Level",
    desc: "3-5 Years",
    icon: <FaUserTie className="text-purple-500" />,
  },
  {
    label: "Senior",
    desc: "5+ Years",
    icon: <RiUserStarLine className="text-orange-500" />,
  },
];

const ExperienceSelector = ({ value, onChange, loading }) => {
  return (
    <div className="h-full flex flex-col">

      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Experience Level
        </h2>
        <p className="text-sm text-gray-500">
          Select your current professional level.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">

        {EXPERIENCES.map((exp) => {
          const active = value === exp.label;

          return (
            <button disabled={loading}
              key={exp.label}
              type="button"
              onClick={() => onChange(exp.label)}
              className={`
                flex flex-col items-start gap-2
                p-5 rounded-xl border
                transition-all duration-200 shadow-md 
                ${
                  active
                    ? "bg-[#553a63] text-white border-[#4D2C5E] shadow-lg scale-[1.02]"
                    : "bg-white border-gray-200 hover:shadow-md hover:border-[#4D2C5E]/40"
                }
              `}
            >
              <div className="text-xl">
                {exp.icon}
              </div>

              <div>
                <p className="font-medium">{exp.label}</p>
                <p className="text-xs opacity-80">{exp.desc}</p>
              </div>
            </button>
          );
        })}

      </div>

    </div>
  );
};

export default ExperienceSelector;