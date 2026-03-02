// Loader.js
import { HashLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <HashLoader color="#4D2C5E" size={60} />
    </div>
  );
};

export default Loader;