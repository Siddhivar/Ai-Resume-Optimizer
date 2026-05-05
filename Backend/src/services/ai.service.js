const {GoogleGenAI}=require("@google/genai")
const {z} =require("zod")
const {zodToJsonSchema} =require("zod-to-json-schema")

const ai=new GoogleGenAI({
    apiKey:process.env.GOOGLE_GENAI_API_KEY
})


const interviewReportSchema=z.object({

    matchScore: z.number().min(0).max(100).describe("Overall match score between candidate and job describe"),
    technicalQuestions: z.array(z.object({
        question:z.string().describe("The technical questions can be asked in interview"),
        intention:z.string().describe("The intention of interviewer behind asking this questions"),
        answer:z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview"),
    behavioralQuestions: z.array(z.object({
        question:z.string().describe("The behavioral questions can be asked in interview"),
        intention:z.string().describe("The intention of interviewer behind asking this questions"),
        answer:z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview"),
        skillGaps: z.array(z.object({
        skill:z.string().describe("The skill which the candidate is lacking"),
        severity:z.enum(["low","medium","high"]).describe("The severity of skill gap"),
    })).describe("List of skill gaps in the candidate's profile along with their severity "),
    preparationPlan:z.array(z.object({
        day:z.number().describe("The day number in the preperation plan."),
        focus: z.string().describe("Main focus for the day"),
        tasks: z.array(z.string()).describe("Tasks to complete on that day")
    })).describe("Day-wise preparation plan for the candidate to follow")
})
async function generateInterviewReport({resume,selfDescription,jobDescription}){
    
const prompt = `
You are an AI interview coach.

Analyze the following:

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

Return ONLY valid JSON in the EXACT structure below:

{
  "matchScore": number (0-100),
  "technicalQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],
  "behavioralQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],
  "skillGaps": [
    {
      "skill": string,
      "severity": "low" | "medium" | "high"
    }
  ],
  "preparationPlan": [
    {
      "day": number,
      "focus": string,
      "tasks": [string]
    }
  ]
}

DO NOT include explanations.
DO NOT include extra fields.
ONLY return JSON.
`;
    
    const response=await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents:prompt,
        config:{
            responseMimeType:"application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema),
        }
    })
    return JSON.parse(response.text)
}

module.exports=generateInterviewReport