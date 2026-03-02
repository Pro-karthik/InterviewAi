import { ShieldCheck } from "lucide-react";

export default function BehavioralSection({ data }) {

  const isClean =
    data.tabSwitches === 0 &&
    data.noFaceMs === 0 &&
    data.multiFaceMs === 0 &&
    data.totalScore === 0;

  return (
    <div
      className={`p-6 rounded-xl border ${
        isClean
          ? "bg-green-50 border-green-200"
          : "bg-yellow-50 border-yellow-200"
      }`}
    >
      <h3 className="text-lg font-semibold mb-4">
        Trust & Behavioral Analysis
      </h3>

      <div className="flex items-center gap-4">
        <ShieldCheck
          className={isClean ? "text-green-600" : "text-yellow-600"}
          size={40}
        />
        <p className="font-medium">
          {isClean
            ? "No suspicious behavior detected"
            : "Suspicious activity detected"}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-sm">
        <div>Tab Switches: {data.tabSwitches}</div>
        <div>No Face Time: {data.noFaceMs}</div>
        <div>Multi Face Time: {data.multiFaceMs}</div>
        <div>Violation Score: {data.totalScore}</div>
      </div>
    </div>
  );
}