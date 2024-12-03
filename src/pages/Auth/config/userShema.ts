import { z, ZodType } from "zod";
import { TFormAuth } from "../types";

export const UserAuthSchema: ZodType<TFormAuth> = z
    .object({
      email: z.string().email({ message: "Invalid email address" }),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
    })