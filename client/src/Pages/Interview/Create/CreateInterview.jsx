import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateForm from "./components/CreateForm";
import { createSession } from "../../../api/session.api";
import { toast } from "react-toastify";

const CreateInterview = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreate = async ({ skills, experience }) => {
    try {
      setLoading(true);

      const payload = {
        skills,
        experience_level: experience,
      };

      await createSession(payload);

      navigate("/interview/setup/instructions", {
        state: payload,
      });

    } catch (error) {
      console.error(error);

      var message =
        error?.response?.data?.message ||
        "Skill validation failed.";

      // alert(message)
      if (error?.response?.status === 429 || error?.response?.status === 503) {
        var message = "Service is currently overloaded. Please try again later.";
      }
      if (`${error}`.includes("Network Error") || `${error}`.includes("timeout")) {
        message = "Network error or timeout. Please check your connection and try again.";
      }
      if (`${error}`.includes("rate limit") || `${error}`.includes("overloaded") || `${error}`.includes("quota")) {
        message = "Service is currently overloaded. Please try again later.";
      }

      

      toast.error(message, {
        className: "rounded-lg shadow-lg",
        progressClassName: "bg-white",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <CreateForm onSubmit={handleCreate} loading={loading} />
  );
};

export default CreateInterview;  
