import InterviewHeader from "./InterviewHeader";
import QuestionMeta from "./QuestionMeta";
import QuestionCard from "./QuestionCard";
import AnswerEditor from "./AnswerEditor";
import InterviewControls from "./InterviewControls";

const InterviewWorkspace = ({ isReady, isLoading }) => {
  const workspaceShell =
    "h-full flex flex-col overflow-y-auto bg-gradient-to-br from-gray-50 to-purple-50 p-8";
  const statusCard =
    "rounded-3xl border border-gray-100 bg-white/90 px-6 py-10 text-center shadow-[0_20px_45px_-30px_rgba(77,44,94,0.35)] backdrop-blur-sm";

  if (isLoading) {
    return (
      <div className={`${workspaceShell} items-center justify-center`}>
        <div className={`${statusCard} text-gray-600`}>
          Initializing Interview...
        </div>
      </div>
    );
  }

  if (!isReady) {
    return (
      <div className={`${workspaceShell} items-center justify-center`}>
        <div className={`${statusCard} text-red-500`}>
          Monitoring initialization failed
        </div>
      </div>
    );
  }

  return (
    <div className={workspaceShell}>

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
