import RadarChartComponent from "./RadarChartComponent";
import SkillCard from "./SkillCard";

export default function PerformanceBreakdown({ breakdown }) {
  if (!breakdown) return null;

  const skills = [
    { title: "Technical", value: breakdown.technical ?? 0 },
    { title: "Depth", value: breakdown.depth ?? 0 },
    { title: "Clarity", value: breakdown.clarity ?? 0 },
    { title: "Problem Solving", value: breakdown.problemSolving ?? 0 },
    { title: "Communication", value: breakdown.communication ?? 0 },
  ].map(skill => ({
    ...skill,
    value: Math.min(Math.max(skill.value, 0), 10), // clamp 0–10
  }));

  const lowest = skills.reduce((prev, curr) =>
    curr.value < prev.value ? curr : prev
  );

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-8">

      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          Performance Breakdown
        </h3>
        <p className="text-sm text-text-secondary mt-1">
          Detailed evaluation across key skill dimensions
        </p>
      </div>

      <div className="pt-2">
        <RadarChartComponent data={skills} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <SkillCard
            key={skill.title}
            skill={skill}
            isLowest={skill.title === lowest.title}
          />
        ))}
      </div>

    </div>
  );
}