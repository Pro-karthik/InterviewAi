import RadarChartComponent from "./RadarChartComponent";
import SkillCard from "./SkillCard";

export default function PerformanceBreakdown({ breakdown }) {

  const skills = [
    { title: "Technical", value: breakdown.technical },
    { title: "Depth", value: breakdown.depth },
    { title: "Clarity", value: breakdown.clarity },
    { title: "Problem Solving", value: breakdown.problemSolving },
    { title: "Communication", value: breakdown.communication },
  ];

  const lowest = skills.reduce((prev, curr) =>
    curr.value < prev.value ? curr : prev
  );

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6">
      <h3 className="text-lg font-semibold">Performance Breakdown</h3>

      <RadarChartComponent data={skills} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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