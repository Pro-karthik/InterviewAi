import React from "react";

const Interviewer = () => {
  return (
    <div className="w-full flex items-center flex-col py-16 px-4">
      
      <h1 className="text-center text-2xl md:text-3xl font-semibold font-body">
        MEET THE{" "}
        <span className="text-accent-light">InterviewAI</span> THAT ACTUALLY SEES YOU
      </h1>

      <p className="text-text-secondary mt-3 mb-10 text-center">
        Built to train the skills recruiters never explain
      </p>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="bg-white shadow-soft rounded-xl p-6">
          <h4 className="text-center font-semibold mb-3">
            Practices That Feel Real
          </h4>
          <p className="text-text-secondary text-sm leading-relaxed">
            Our AI Interviewer recreates the pressure of real interviews.
            Timed questions, adaptive follow-ups, and zero hand-holding —
            just like an actual recruiter on the other side of the screen.
          </p>
        </div>

        <div className="bg-white shadow-soft rounded-xl p-6">
          <h4 className="text-center font-semibold mb-3">
            Sees What You Can’t
          </h4>
          <p className="text-text-secondary text-sm leading-relaxed">
            It doesn’t just listen to what you say. It watches how you say it —
            eye contact, confidence, pauses, focus — exposing patterns you never
            notice during practice.
          </p>
        </div>

        <div className="bg-white shadow-soft rounded-xl p-6">
          <h4 className="text-center font-semibold mb-3">
            Clear, Personal, Fixable
          </h4>
          <p className="text-text-secondary text-sm leading-relaxed">
            No vague advice. You get precise feedback on what went wrong,
            why it mattered, and exactly how to improve before your next interview.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Interviewer;
