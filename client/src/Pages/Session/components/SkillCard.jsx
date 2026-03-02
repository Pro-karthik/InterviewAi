export default function SkillCard({ skill, isLowest }) {
  return (
    <div
      className= "p-4 rounded-lg border  bg-white border-gray-200">
      <div className="flex justify-between items-center">
        <h4 className="font-medium">{skill.title}</h4>
        <span className="font-semibold">{skill.value}</span>
      </div>

      {isLowest && (
        <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full mt-1 inline-block">
          Lowest Score
        </span>
      )}

      <div className="w-full bg-gray-200 h-2 rounded-full mt-3">
        <div
          className="h-2 bg-green-500 rounded-full"
          style={{ width: `${skill.value * 10}%` }}
        />
      </div>
    </div>
  );
}