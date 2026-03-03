import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateForm from "./components/CreateForm";
import axios from "axios";

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

      
      await axios.post(
        "http://localhost:5000/api/session/create",
        payload,
        {
          withCredentials: true
        }
      );

      
      navigate("/interview/instructions", {
        state: payload
      });

    } catch (error) {
      console.error(error);
      console.log(error?.response); 

      const message =
        error?.response?.data?.message ||
        "Skill validation failed.";

      alert(message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <CreateForm onSubmit={handleCreate} loading={loading} />
  );
};

export default CreateInterview;