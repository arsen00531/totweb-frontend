import { z, ZodType } from "zod";
import { TFormCompanyRegistration, TFormUserRegistration } from "../types";

export const UserRegistrationSchema: ZodType<TFormUserRegistration> = z
  .object({
    firstName: z
      .string()
      .min(3, { message: "FirstName must be at least 3 characters" }).refine((value) => !/[*&^%$#@!)(_+=|]/.test(value), {
        message: 'Невалидные вещи',
      }),
    
    lastName: z
      .string()
      .min(3, { message: "Lastname must be at least 3 characters" }),
    
    email: z.string().email({ message: "Invalid email address" }),
    
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    
    confirmPassword: z.string(),
  })
  .refine((data) => data.password == data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Пароли не совпадают.",
});

export const CompanyRegistrationSchema: ZodType<TFormCompanyRegistration> = z
  .object({
    companyName: z
      .string()
      .min(2, { message: "company name must be at least 2 characters" }),
    
    email: z.string().email({ message: "Invalid email address" }),

    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),

    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),

    contactPerson: z
      .string()
      .min(2, { message: "contact person must be at least 2 characters" }).refine((value) => !/[*&^%$#@!)(_+=|]/.test(value), {
          message: 'Невалидные символы',
      }),

    phone: z.string().refine((value) => /(?:\+|\d)[\d\-\(\) ]{9,}\d/g.test(value), {
      message: 'Неверный номер телефона',
    }),
  })
  .refine((data) => data.password == data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Пароли не совпадают.",
});