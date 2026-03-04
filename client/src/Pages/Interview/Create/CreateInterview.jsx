import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateForm from "./components/CreateForm";
import { validateSkills } from "../../../api/session.api";
import { toast } from "react-toastify";
import { SiLetterboxd } from "react-icons/si";

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
      // const builtInSkills = ["React", "Node.js", "Python", "Java", "System Design", "DevOps", "MongoDB"];
      // const skillcheck = skills.every((skill) =>
      //   builtInSkills.includes(skill)
      // );

      // if (!skillcheck) {
      //   await createSession(payload);
      // }
      await validateSkills(payload);

      navigate("/interview/setup/instructions", {
        state: payload,
      });

    } catch (error) {
      console.error(error);

      let message =
        error?.response?.data?.message ||
        "Skill validation failed.";

      // alert(message)
      if (error?.response?.status === 429 || error?.response?.status === 503) {
        message = "Service is currently overloaded. Please try again later.";
      }
      if (error.code === "ECONNABORTED" || error.message === "Network Error") {
        message = "Network error. Please check your connection.";
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
