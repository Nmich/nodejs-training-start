import { z } from "zod";

export const CredentialsInputSchema = z.object({
  username: z.string(),
  password: z.string(),
});
