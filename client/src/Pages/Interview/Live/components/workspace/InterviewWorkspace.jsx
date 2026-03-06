import InterviewHeader from "./InterviewHeader";
import QuestionMeta from "./QuestionMeta";
import QuestionCard from "./QuestionCard";
import AnswerEditor from "./AnswerEditor";
import InterviewControls from "./InterviewControls";

const InterviewWorkspace = ({ isReady, isLoading }) => {

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center text-gray-600">
        Initializing Interview...
      </div>
    );
  }

  if (!isReady) {
    return (
      <div className="h-full flex items-center justify-center text-red-500">
        Monitoring initialization failed
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-8 overflow-y-auto">

      {/* Header */}
      <InterviewHeader />

      {/* Question Metadata */}
      <QuestionMeta />

      {/* Question Text */}
      <QuestionCard />

      {/* Answer Input */}
      <AnswerEditor />

      {/* Navigation Controls */}
      <InterviewControls />

    </div>
  );
};

export default InterviewWorkspace;