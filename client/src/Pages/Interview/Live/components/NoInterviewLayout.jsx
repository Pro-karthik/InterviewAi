import { AlertCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NoInterviewLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-6">
      
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
        
        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
            <AlertCircle className="text-red-500" size={28} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Interview Session Not Available
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          The interview session you are trying to access is either expired,
          invalid, or has already been completed. Please contact support or
          start a new session.
        </p>

        {/* Action */}
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded-lg hover:bg-primary-light transition"
        >
          <ArrowLeft size={16} />
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NoInterviewLayout;