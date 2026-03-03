import { FiClock, FiMonitor, FiCamera, FiMic, FiAlertTriangle } from "react-icons/fi";

const InstructionList = () => {
  return (
    <div className="space-y-6">

      {/* Exam Details */}
      <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-purple-800 mb-2">
          Interview Overview
        </h3>
        <div className="flex items-center gap-2 text-sm text-purple-700">
          <FiClock />
          <span><strong>Duration:</strong> 30 Minutes (Strictly Timed)</span>
        </div>
        <p className="text-sm text-purple-700 mt-2">
          You are required to answer all questions within the given time limit.
          The session will automatically end once the timer expires.
        </p>
      </div>

      {/* Instructions */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Proctoring Rules & Guidelines
        </h3>

        <ul className="space-y-4 text-gray-700 text-sm">

          <li className="flex gap-3">
            <FiCamera className="mt-1 text-gray-500" />
            <span>
              Your camera must remain <strong>ON at all times</strong>. 
              Multiple faces detected will result in immediate termination.
            </span>
          </li>

          <li className="flex gap-3">
            <FiMic className="mt-1 text-gray-500" />
            <span>
              Only one active audio source is allowed. 
              Background conversations or multiple voices are strictly prohibited.
            </span>
          </li>

          <li className="flex gap-3">
            <FiMonitor className="mt-1 text-gray-500" />
            <span>
              The interview must be taken in <strong>full-screen mode</strong>. 
              Switching tabs, minimizing, or navigating away may automatically end the session.
            </span>
          </li>

          <li className="flex gap-3">
            <FiAlertTriangle className="mt-1 text-gray-500" />
            <span>
              Looking away from the screen frequently, using external devices, 
              or seeking outside assistance is considered malpractice.
            </span>
          </li>

          <li className="flex gap-3">
            <FiMonitor className="mt-1 text-gray-500" />
            <span>
              Ensure a <strong>stable internet connection</strong> before starting. 
              Disconnections may not allow re-entry.
            </span>
          </li>

        </ul>
      </div>
    </div>
  );
};

export default InstructionList;