import React from "react";
import pimai from "../../../assets/illustrations/pimai-icon.png";

function Footer() {
  return (
    <footer className="w-full bg-[#EDE9DF] font-poppins text-[1rem] text-[#606060] mt-12">

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-16 py-6">

        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-10">

          {/* Column 1 */}
          <div className="space-y-3">
            <img src={pimai} alt="InterviewAI logo" className="w-[12rem]" />

            <p className="leading-relaxed max-w-xs">
              InterviewAI is a personalized AI interview platform that simulates
              real interviews, analyzes behavior, and delivers actionable feedback.
              Train smarter. Interview with confidence.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-[#1f2937] font-semibold mb-3 text-[16px]">Use Cases</h3>
            <ul className="space-y-2">
              <li>For Students</li>
              <li>For Freshers</li>
              <li>For Job Switchers</li>
              <li>For Internship Preparation</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-[#1f2937] font-semibold mb-3 text-[16px]">Developers</h3>
            <ul className="space-y-2">
              <li>GitHub Repository</li>
              <li>System Design</li>
              <li>Tech Stack</li>
              <li>Roadmap</li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-[#1f2937] font-semibold mb-3 text-[16px]">Product</h3>
            <ul className="space-y-2">
              <li>Why This Exists?</li>
              <li>Personalized Solutions</li>
              <li>How It Works</li>
            </ul>
          </div>

          {/* Column 5 */}
          <div>
            <h3 className="text-[#1f2937] font-semibold mb-3 text-[16px]">Contact Info</h3>
            <ul className="space-y-2">
              <li>+91 63007 81007</li>
              <li>interviewai@gmail.com</li>
              <li>Hyderabad, Telangana 500013</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Divider + Bottom Text */}
      <div className="border-t border-black text-center py-3 text-[14px] text-[#606060]">
        © 2026 InterviewAI. All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;
