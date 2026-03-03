import { useNavigate } from "react-router-dom";

const TerminatedPage = ({ reason }) => {
  const navigate = useNavigate();

  const message =
    reason ||
    "Your interview session was terminated due to policy violations or inactivity.";

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-purple-50 flex items-center justify-center px-6">

      <div className="bg-white rounded-3xl shadow-2xl p-16 max-w-2xl w-full text-center">

        {/* Warning Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-red-100 text-red-600 flex items-center justify-center rounded-full text-4xl">
            ⚠
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">
          Interview Terminated
        </h1>

        {/* Description */}
        <p className="text-gray-500 mb-8">
          {message}
        </p>

        {/* Action Buttons */}
        <div className="flex justify-center gap-6">
          <button
            onClick={() => navigate("/")}
            className="px-10 py-3 bg-gray-200 rounded-2xl hover:bg-gray-300 transition"
          >
            Go Home
          </button>

          <button
            onClick={() => navigate("/create")}
            className="px-12 py-3 bg-gradient-to-r from-[#4D2C5E] to-[#6D3C82]
                       text-white rounded-2xl shadow-lg hover:scale-[1.02]
                       transition-all duration-200"
          >
            Restart Interview
          </button>
        </div>

      </div>

    </div>
  );
};

export default TerminatedPage;