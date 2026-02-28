// NotFound.js
import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      {/* Icon */}
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#4D2C5E] bg-opacity-10 mb-6">
        <AlertCircle className="text-[#4D2C5E]" size={40} />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Page Not Found</h1>
      <p className="text-gray-600 text-center max-w-md mb-8">
        The page you’re looking for doesn’t exist or may have been moved. 
        Please check the URL or return to the homepage.
      </p>

      {/* Action */}
      <Link
        to="/"
        className="px-5 py-2 rounded-md bg-[#4D2C5E] text-white font-medium hover:bg-[#3a2045] transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;