import { useLiveInterview } from "../context/LiveInterviewContext";

const ReadyScreen = ({  skill, questionCount }) => {

  const { startInterview } = useLiveInterview();

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-lg rounded-xl p-10 w-[500px]">

        <h1 className="text-2xl font-bold mb-4">
          AI Mock Interview Ready
        </h1>

        <p className="text-gray-600 mb-6">
          Your interview session has been prepared.
        </p>

        <div className="space-y-2 mb-6">
          <p><strong>Skill:</strong> {skill}</p>
          <p><strong>Questions:</strong> {questionCount}</p>
          <p><strong>Duration:</strong> 15 minutes</p>
        </div>

        <div className="border p-4 rounded mb-6 text-sm text-gray-600">
          <p className="font-medium">Before starting:</p>

          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Ensure your camera is active</li>
            <li>Stay in fullscreen during the interview</li>
            <li>Avoid switching tabs</li>
            <li>Maintain stable internet connection</li>
          </ul>
        </div>

        <button
          onClick={startInterview}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
        >
          Start Interview
        </button>

      </div>

    </div>
  );
};

export default ReadyScreen;