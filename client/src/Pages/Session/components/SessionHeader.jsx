import { Calendar } from "lucide-react";
import ScoreRing from "./Scoring";

export default function SessionHeader({ session }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex items-center justify-between">

      {/* LEFT - Score */}
      <div className="flex items-center gap-6">
        {/* <div className="relative w-28 h-28">
          <div className="absolute inset-0 rounded-full border-[10px] border-blue-100"></div>
          <div className="absolute inset-0 rounded-full border-[10px] border-primary border-t-transparent rotate-45"></div>
          <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-primary">
            {session.overallScore}
          </div>
          
        </div> */}
        <ScoreRing  score = {session.overallScore}/>

        <div>
          <span className="px-3 py-1 text-sm rounded-full bg-green-50 text-green-600 font-medium">
            Low Risk
          </span>
          <h2 className="text-2xl font-semibold mt-2">Overall Score</h2>
          <p className="text-gray-500 text-sm">
            Skill: {session.skill}
          </p>
          <p className="text-gray-500 text-sm">
            Experience: {session.experienceLevel}
          </p>
        </div>
      </div>

      {/* RIGHT - Status + Date */}
      <div className="text-right space-y-2">
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
          Evaluated
        </span>
        <div className="flex items-center gap-2 text-gray-500 justify-end">
          <Calendar size={16} />
          {session.createdAt}
        </div>
      </div>
    </div>
  );
}