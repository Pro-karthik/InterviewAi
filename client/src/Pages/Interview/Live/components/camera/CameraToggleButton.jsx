import { FaVideo } from "react-icons/fa";

const CameraToggleButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-5 right-5 bg-[#4D2C5E] text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition"
    >
      <FaVideo size={18} />
    </button>
  );
};

export default CameraToggleButton;