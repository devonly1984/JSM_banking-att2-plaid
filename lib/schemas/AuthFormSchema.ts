import * as z from 'zod';



export const AuthFormSchema = (type: string) =>
  z.object({
    //sign-up only
    firstName: type === "sign-in" ? z.string().optional() : z.string().min(3),
    lastName: type === "sign-in" ? z.string().min(3) : z.string().optional(),
    address1: type === "sign-in" ? z.string().optional() : z.string().min(20),
    city: type === "sign-in" ? z.string().optional() : z.string().min(5),
    state: type === "sign-in" ? z.string().optional() : z.string().max(2),
    postalCode: type === "sign-in" ? z.string().optional() : z.string().min(5),
    dateOfBirth: type === "sign-in" ? z.string().optional() : z.string(),
    ssn: type === "sign-in" ? z.string().optional() : z.string().min(4).max(4),
    //sign-in && sign-up
    email: z.string().email(),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
  });