import { z } from "zod";

export const questionSchema = z.object({
  questions: z.array(
    z.object({
      question_text: z.string(),
      difficulty: z.enum(["easy", "medium", "hard"]),
      category: z.string()
    })
  ).length(10)
});


export const evaluationSchema = z.object({
  answers: z.array(
    z.object({
      question_id: z.string(),
      technical_score: z.number().min(0).max(10),
      depth_score: z.number().min(0).max(10),
      clarity_score: z.number().min(0).max(10),
      problem_solving_score: z.number().min(0).max(10),
      communication_score: z.number().min(0).max(10),
      total_score: z.number(),
      feedback: z.string()
    })
  ),
  overall_score: z.number(),
  strengths: z.string(),
  weaknesses: z.string(),
  improvement_plan: z.string()
});
