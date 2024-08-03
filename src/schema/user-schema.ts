import { z } from 'zod'

export const signUpInputSchema = z.object({
  username: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

export type signUpInput = z.infer<typeof signUpInputSchema>


const signInInputSchema = z.object({
  username: z.string(),
  password: z.string(),
})

const userOutputSchema = z.object({
  id: z.string(),
  username: z.string(),
  name: z.string(),
  email: z.string().email(),
})