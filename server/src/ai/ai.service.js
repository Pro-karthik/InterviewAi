  import { GoogleGenerativeAI } from "@google/generative-ai";
  import { generateQuestionPrompt, evaluationPrompt } from "./prompts.js";
  import { questionSchema, evaluationSchema } from "./schemas.js";


  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview"
  });


  export async function generateQuestions(skill, experience) {
    try {
      const prompt = generateQuestionPrompt({ skill, experience });

      const result = await model.generateContent(prompt);
      const response = result.response.text();

          const jsonString = extractJSON(response);
          const parsed = JSON.parse(jsonString);

      // Validate using Zod
      const validated = questionSchema.parse(parsed);

      return validated;

    } catch (error) {
      console.error("Question generation failed:", error);
      throw new Error("Failed to generate interview questions");
    }
  }


  export async function evaluateSession(qaData) {
    try {
      const prompt = evaluationPrompt(qaData);

      const result = await model.generateContent(prompt);
      const response = result.response.text();

      const jsonString = extractJSON(response);
      const parsed = JSON.parse(jsonString);

      // Validate with Zod
      const validated = evaluationSchema.parse(parsed);

      // Extra safety check:
      validated.answers.forEach(answer => {
        const sum =
          answer.technical_score +
          answer.depth_score +
          answer.clarity_score +
          answer.problem_solving_score +
          answer.communication_score;

        if (sum !== answer.total_score) {
          throw new Error("Invalid total_score calculation from AI");
        }
      });

      return validated;

    } catch (error) {
      console.error("Evaluation failed:", error);
      throw new Error("Failed to evaluate interview session");
    }
  }



  function extractJSON(text) {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) {
      throw new Error("AI did not return valid JSON");
    }
    return match[0];
  }


  import { skillValidationPrompt } from "./prompts.js";
  import {ApiError} from "../utils/ApiError.js";

 export const validateSkillsWithAI = async (skills) => {
  try {
    const prompt = skillValidationPrompt(skills);

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    const jsonString = extractJSON(response);   
    const parsed = JSON.parse(jsonString);

    if (!parsed.valid) {
      throw new ApiError(
        400,
        `Invalid skills detected: ${parsed.invalid_skills.join(", ")}`
      );
    }

    return true;

  } catch (error) {

    throw new ApiError(500, error.message || "Skill validation failed due to an internal error.");
  }
};