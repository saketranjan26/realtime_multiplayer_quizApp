import z, { string } from "zod"

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    username: z.string().optional()
})

export const signinInput =  z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export const questionInput = z.object({
    question : z.string(),
    optionA: z.string(),
    optionB: z.string(),
    optionC: z.string(),
    optionD: z.string(),
    correctOption: z.string(),
    quizId: z.string()
})

export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>
export type QuestionInput = z.infer<typeof questionInput>