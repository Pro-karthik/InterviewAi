import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable
      theme="light"
      toastClassName={() =>
        "relative flex items-center p-4 rounded-lg shadow-lg font-medium text-sm bg-white border border-gray-200"
      }
      bodyClassName={() => "text-gray-800"}
      progressClassName="bg-blue-500 h-1 rounded-full"
    />
  );
};

export default ToastProvider;