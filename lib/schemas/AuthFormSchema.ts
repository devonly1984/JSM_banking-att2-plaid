import * as z from 'zod';
export const AuthFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string().optional(),
  address1: z.string().min(25),
  city: z.string().min(10),
  state: z.string().max(2),
  zipcode: z.string().min(5),
  dateOfBirth: z.string(),
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});