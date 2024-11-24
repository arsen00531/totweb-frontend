import { z, ZodType } from "zod";
import { TFormVacancy } from "../types";

export const VacancyCreateSchema: ZodType<TFormVacancy> = z.object({
  title: z.string().min(5, { message: "Title is too short" }),
  price: z.string().min(3, { message: "Price is too short" }),
  city: z.string().min(3, { message: "City is too short" }),
  description: z.string().min(3, { message: "Description is too short" }),
});
