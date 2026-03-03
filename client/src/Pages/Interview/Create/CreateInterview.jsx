import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateForm from "./components/CreateForm";
// import { createDraftInterview } from "../../../api/interview.api";

const CreateInterview = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreate = async ({ skills, experience }) => {
    try {
      setLoading(true);

      // Example payload structure
      const payload = {
        skills,
        experience_level: experience,
      };

      console.log("Creating Interview:", payload);

      // Uncomment when API ready
      /*
      const res = await createDraftInterview(payload);
      navigate(`/interview/setup/${res.session.id}`);
      */

      // Temporary navigation simulation
      navigate(`/interview/setup/demo-session-id`);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CreateForm onSubmit={handleCreate} loading={loading} />
  );
};

export default CreateInterview;