/**
 * Auth Validators
 * Zod schemas for authentication flows: sign-in, sign-up,
 * password reset, and email verification.
 */

import { z } from "zod";

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 128;

const passwordSchema = z
  .string()
  .min(PASSWORD_MIN_LENGTH, `Password must be at least ${PASSWORD_MIN_LENGTH} characters`)
  .max(PASSWORD_MAX_LENGTH, `Password must be ${PASSWORD_MAX_LENGTH} characters or fewer`)
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character");

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Must be a valid email address")
    .max(255),
  password: z
    .string()
    .min(1, "Password is required")
    .max(PASSWORD_MAX_LENGTH),
});

export const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Must be a valid email address")
      .max(255),
    password: passwordSchema,
    confirm_password: z.string().min(1, "Please confirm your password"),
    full_name: z
      .string()
      .min(1, "Full name is required")
      .max(200, "Name must be 200 characters or fewer"),
    department: z
      .string()
      .max(100)
      .optional()
      .or(z.literal("")),
    job_title: z
      .string()
      .max(200)
      .optional()
      .or(z.literal("")),
    accept_terms: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms and conditions" }),
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Must be a valid email address")
    .max(255),
});

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirm_password: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export const changePasswordSchema = z
  .object({
    current_password: z
      .string()
      .min(1, "Current password is required"),
    new_password: passwordSchema,
    confirm_new_password: z
      .string()
      .min(1, "Please confirm your new password"),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: "Passwords do not match",
    path: ["confirm_new_password"],
  })
  .refine((data) => data.current_password !== data.new_password, {
    message: "New password must be different from current password",
    path: ["new_password"],
  });

export const verifyOtpSchema = z.object({
  email: z
    .string()
    .email("Must be a valid email address"),
  token: z
    .string()
    .min(6, "Verification code must be 6 digits")
    .max(6, "Verification code must be 6 digits")
    .regex(/^\d{6}$/, "Verification code must be numeric"),
  type: z.enum(["signup", "recovery", "email_change"] as const),
});

export const magicLinkSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Must be a valid email address")
    .max(255),
});

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
export type MagicLinkInput = z.infer<typeof magicLinkSchema>;
