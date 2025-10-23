import { X } from "lucide-react";
import { ReactNode } from "react";
import z from "zod";

export type LayoutPropsMain = {
  children: ReactNode;
};

export const loginSchema = z.object({
  email: z.email({ message: "A valid email is required" }),
  password: z
    .string()
    .min(8, { message: "Passwords must be at least 8 characters" })
    .max(20, { message: "Passwords should be maximun 20 characters" }),
});

export type LoginSchemaType = typeof loginSchema;

export const registerSchema = z.object({
  name: z.string().nonempty({ message: "Name is requered" }),
  email: z.email({ message: "A valid email is required" }),
  password: z
    .string()
    .min(8, { message: "Passwords must be at least 8 characters" })
    .max(20, { message: "Passwords should be maximun 20 characters" }),
});

export type RegisterSchemaType = typeof registerSchema;
