export const generateQuestionPrompt = ({ skill, experience }) => `
You are a strict technical interviewer.

Task:
Generate EXACTLY 10 technical interview questions.

Skill: ${skill}
Experience Level: ${experience}

Rules:
- Return ONLY raw JSON.
- Do NOT wrap in markdown.
- Do NOT add explanations.
- Do NOT add extra keys.
- The array must contain EXACTLY 10 items.

Each question must follow this structure:

{
  "question_text": "string",
  "difficulty": "easy" | "medium" | "hard",
  "category": "string"
}

Final Output Format:

{
  "questions": [
    {
      "question_text": "...",
      "difficulty": "easy | medium | hard",
      "category": "..."
    }
  ]
}
`;


export const evaluationPrompt = (qaData) => `
You are a strict technical interviewer.

Evaluate the following interview responses carefully.

Scoring Rubric (0-10 for each category):
- Technical Accuracy
- Depth of Knowledge
- Clarity
- Problem Solving
- Communication

Rules:
- Return ONLY raw JSON.
- Do NOT wrap in markdown.
- Do NOT add explanations.
- Do NOT modify question_id values.
- Use the EXACT question_id provided.
- Scores must be integers between 0 and 10.
- total_score must equal the sum of the five category scores.

Output Structure:

{
  "answers": [
    {
      "question_id": "existing_uuid",
      "technical_score": number,
      "depth_score": number,
      "clarity_score": number,
      "problem_solving_score": number,
      "communication_score": number,
      "total_score": number,
      "feedback": "string"
    }
  ],
  "overall_score": number,
  "strengths": "string",
  "weaknesses": "string",
  "improvement_plan": "string"
}

Interview Data:
${JSON.stringify(qaData)}
`;
