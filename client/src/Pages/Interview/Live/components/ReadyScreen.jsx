import {
  Camera,
  Clock3,
  ListChecks,
  Monitor,
  Sparkles,
  Wifi,
} from "lucide-react";
import { useLiveInterview } from "../context/LiveInterviewContext";

const PRE_START_CHECKLIST = [
  {
    title: "Camera ready",
    description: "Ensure your camera is active and you're clearly visible.",
    icon: Camera,
    accent: "bg-blue-50 text-blue-500",
  },
  {
    title: "Stay in fullscreen",
    description: "Keep the interview window focused without switching tabs.",
    icon: Monitor,
    accent: "bg-purple-50 text-purple-500",
  },
  {
    title: "Stable connection",
    description: "Use a reliable internet connection for a smooth session.",
    icon: Wifi,
    accent: "bg-green-50 text-green-500",
  },
];

const ReadyScreen = ({ skill, questionCount }) => {
  const { startInterview } = useLiveInterview();

  const interviewSummary = [
    {
      label: "Skill Focus",
      value: skill || "General",
      icon: Sparkles,
      accent: "bg-blue-50 text-blue-500",
    },
    {
      label: "Questions",
      value: questionCount ?? 0,
      icon: ListChecks,
      accent: "bg-green-50 text-green-500",
    },
    {
      label: "Duration",
      value: "15 minutes",
      icon: Clock3,
      accent: "bg-orange-50 text-orange-500",
    },
  ];

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 to-purple-50 flex flex-col px-6 py-6 md:px-12">
      <div className="mb-10">
        <h1 className="text-4xl font-semibold text-gray-900">
          AI Mock Interview Ready
        </h1>
        <p className="text-gray-500 mt-2 max-w-2xl">
          Your interview session has been prepared. Review the setup details
          below and make sure everything is ready before you begin.
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-8 lg:flex-row">
        <div className="flex-1 rounded-3xl bg-white p-8 shadow-lg border border-gray-100">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Interview Overview
            </h2>
            <p className="text-sm text-gray-500">
              A quick summary of what this interview session includes.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {interviewSummary.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-xl border border-gray-200 bg-white p-5 shadow-md"
                >
                  <div
                    className={`mb-4 inline-flex rounded-full p-3 ${item.accent}`}
                  >
                    <Icon size={18} />
                  </div>

                  <p className="text-sm text-gray-500">{item.label}</p>
                  <p className="mt-2 text-lg font-semibold text-gray-900 break-words">
                    {item.value}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl bg-[#4D2C5E]/5 px-5 py-4">
            <p className="text-sm font-semibold text-[#4D2C5E]">
              Session Reminder
            </p>
            <p className="mt-2 text-sm text-gray-600 leading-6">
              Answer clearly, stay focused, and keep your video on throughout
              the interview for the best evaluation experience.
            </p>
          </div>
        </div>

        <div className="w-full lg:w-[400px]">
          <div className="h-full rounded-3xl bg-white p-8 shadow-lg border border-gray-100">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Before You Start
              </h2>
              <p className="text-sm text-gray-500">
                Follow these quick checks to avoid interruptions during the
                interview.
              </p>
            </div>

            <div className="space-y-4">
              {PRE_START_CHECKLIST.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-xl border border-gray-200 bg-white p-4 shadow-md"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`inline-flex rounded-full p-3 ${item.accent}`}
                      >
                        <Icon size={18} />
                      </div>

                      <div>
                        <p className="font-medium text-gray-800">
                          {item.title}
                        </p>
                        <p className="mt-1 text-sm text-gray-500 leading-6">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8 flex justify-end">
        <button
          onClick={startInterview}
          className="px-14 py-4 bg-gradient-to-r from-[#4D2C5E] to-[#6D3C82]
                     text-white rounded-2xl shadow-lg hover:shadow-xl
                     hover:scale-[1.02] transition-all duration-200"
        >
          Start Interview
        </button>
      </div>
    </div>
  );
};

export default ReadyScreen;
