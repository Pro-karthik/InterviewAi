import { useNavigate } from "react-router-dom";

const ActionButtons = () => {

  const navigate = useNavigate();

  return (
    <div className="flex justify-end gap-4 mt-10">

      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
      >
        Go to Dashboard
      </button>

      <button
        onClick={() => navigate("/interview/create")}
        className="px-8 py-3 bg-gradient-to-r from-[#4D2C5E] to-[#6D3C82]
        text-white rounded-xl shadow-md hover:scale-[1.02] transition"
      >
        Retake Interview
      </button>

    </div>
  );
};

export default ActionButtons;