import {z} from 'zod';

export const usernameValidation = z
.string()
.min(2, "Username must be atleast 2 characters")
.max(20, "Username must no be 20 character long")
.regex(/^[a-zA-Z0-9_]+$/, "Username must not contains special character")


export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: "Invaid Email"}),
    password: z.string().min(6, {message: "password must be 6 character long"})
})
