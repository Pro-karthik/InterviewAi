import React from "react";
import pimai from "../../../assets/illustrations/pimai-icon.png";

function Footer() {
  return (
    <footer className="w-full bg-[#EDE9DF] font-poppins text-[13px] text-[#606060]">

      {/* main container */}
      <div className="max-w-7xl mx-auto px-20 py-8">

        <div className="grid grid-cols-5 gap-14">

          {/* Column 1 */}
          <div className="space-y-2">
            <img src={pimai} alt="InterviewAI logo" className="w-36" />

            <p className="leading-2 max-w-xs">
              InterviewAI is a personalized AI interview platform that simulates
              real interviews, analyzes behavior, and delivers actionable feedback.
              Train smarter. Interview with confidence.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-[#1f2937] font-bold font-poppins mb-5">Use Cases</h3>
            <ul className="space-y-3">
              <li>For Student</li>
              <li>For Freshers</li>
              <li>For Job Switchers</li>
              <li>For Internship Preparation</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-[#1f2937] font-bold font-poppins mb-5">Developers</h3>
            <ul className="space-y-3">
              <li>GitHub Repository</li>
              <li>System Design</li>
              <li>Tech Stack</li>
              <li>Road map</li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-[#1f2937] font-bold font-poppins mb-5">Product</h3>
            <ul className="space-y-3">
              <li>Why this exits?</li>
              <li>Personalized Solution</li>
              <li>How it works</li>
            </ul>
          </div>

          {/* Column 5 */}
          <div>
            <h3 className="text-[#1f2937] font-bold font-poppins mb-5">Contact Info</h3>
            <ul className="space-y-3">
              <li>+091 63007 - 81007</li>
              <li>interviewAi@gmail.com</li>
              <li>Opposite Google office .. 500013</li>
            </ul>
          </div>
        </div>
      </div>

      {/* divider + bottom text */}
      <div className="border-t border-[#000000] text-center py-4 text-[13px] text-[#606060]">
        InterviewAI All Right Reserved, 2026
      </div>
    </footer>
  );
}

export default Footer;
