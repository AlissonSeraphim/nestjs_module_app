import { z } from "zod";

export const envSchema = z.object({
    PORT: z.string().transform(Number).optional().default('3333'),
    DATABASE_URL: z.string().url()
})

export type Env = z.infer<typeof envSchema>