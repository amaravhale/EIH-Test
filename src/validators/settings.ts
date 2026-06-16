/**
 * Settings Validators
 * Zod schemas for user profile, preferences, and application settings.
 */

import { z } from "zod";

const USER_ROLES = ["admin", "analyst", "manager", "viewer"] as const;
const THEMES = ["light", "dark", "system"] as const;
const DIGEST_FREQUENCIES = ["daily", "weekly", "never"] as const;
const DASHBOARD_VIEWS = ["overview", "signals", "tenders"] as const;

// ─── Profile Settings ────────────────────────────────────────────────

export const updateProfileSchema = z.object({
  full_name: z
    .string()
    .min(1, "Full name is required")
    .max(200, "Name must be 200 characters or fewer"),
  job_title: z
    .string()
    .max(200, "Job title must be 200 characters or fewer")
    .optional()
    .or(z.literal("")),
  department: z
    .string()
    .max(100, "Department must be 100 characters or fewer")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .max(30, "Phone must be 30 characters or fewer")
    .regex(
      /^$|^\+?[\d\s\-().]+$/,
      "Must be a valid phone number"
    )
    .optional()
    .or(z.literal("")),
  avatar_url: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
});

// ─── User Preferences ────────────────────────────────────────────────

export const userPreferencesSchema = z.object({
  theme: z.enum(THEMES).default("system"),
  email_notifications: z.boolean().default(true),
  signal_digest_frequency: z.enum(DIGEST_FREQUENCIES).default("daily"),
  default_dashboard_view: z.enum(DASHBOARD_VIEWS).default("overview"),
  sidebar_collapsed: z.boolean().default(false),
  timezone: z
    .string()
    .min(1, "Timezone is required")
    .default("Europe/London"),
  locale: z
    .string()
    .min(2)
    .max(10)
    .default("en-GB"),
});

// ─── Admin User Management ───────────────────────────────────────────

export const updateUserRoleSchema = z.object({
  user_id: z.string().uuid("Invalid user ID"),
  role: z.enum(USER_ROLES, {
    required_error: "Role is required",
    message: "Invalid role",
  }),
});

export const inviteUserSchema = z.object({
  email: z
    .string()
    .email("Must be a valid email address")
    .max(255),
  full_name: z
    .string()
    .min(1, "Full name is required")
    .max(200),
  role: z
    .enum(USER_ROLES, { message: "Invalid role" })
    .default("viewer"),
  department: z
    .string()
    .max(100)
    .optional()
    .or(z.literal("")),
});

// ─── Notification Settings ───────────────────────────────────────────

export const notificationSettingsSchema = z.object({
  email_on_new_signal: z.boolean().default(true),
  email_on_tender_deadline: z.boolean().default(true),
  email_on_regulation_update: z.boolean().default(true),
  email_on_competitor_change: z.boolean().default(false),
  email_digest_enabled: z.boolean().default(true),
  email_digest_frequency: z.enum(DIGEST_FREQUENCIES).default("daily"),
  in_app_notifications: z.boolean().default(true),
  desktop_notifications: z.boolean().default(false),
});

// ─── API Key Management ──────────────────────────────────────────────

export const createApiKeySchema = z.object({
  name: z
    .string()
    .min(1, "API key name is required")
    .max(100, "Name must be 100 characters or fewer"),
  scopes: z
    .array(
      z.enum([
        "read:competitors",
        "write:competitors",
        "read:signals",
        "write:signals",
        "read:tenders",
        "write:tenders",
        "read:regulations",
        "write:regulations",
        "read:documents",
        "write:documents",
        "read:content",
        "write:content",
        "admin",
      ])
    )
    .min(1, "At least one scope is required"),
  expires_at: z
    .string()
    .datetime({ message: "Must be a valid ISO datetime" })
    .optional()
    .nullable(),
});

// ─── General App Settings (admin only) ───────────────────────────────

export const appSettingsSchema = z.object({
  company_name: z.string().min(1).max(200).default("Empirisys Ltd"),
  company_logo_url: z.string().url().optional().or(z.literal("")),
  default_currency: z.string().min(3).max(3).default("GBP"),
  default_region: z.string().max(100).default("United Kingdom"),
  ai_model: z.string().min(1).max(100).default("claude-sonnet-4-20250514"),
  ai_max_tokens: z.number().int().min(256).max(16384).default(4096),
  ai_temperature: z.number().min(0).max(1).default(0.3),
  embedding_model: z.string().min(1).max(100).default("voyage-3"),
  rag_match_threshold: z.number().min(0).max(1).default(0.7),
  rag_match_count: z.number().int().min(1).max(50).default(10),
  retention_days: z.number().int().min(30).max(3650).default(365),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type UserPreferencesInput = z.infer<typeof userPreferencesSchema>;
export type UpdateUserRoleInput = z.infer<typeof updateUserRoleSchema>;
export type InviteUserInput = z.infer<typeof inviteUserSchema>;
export type NotificationSettingsInput = z.infer<typeof notificationSettingsSchema>;
export type CreateApiKeyInput = z.infer<typeof createApiKeySchema>;
export type AppSettingsInput = z.infer<typeof appSettingsSchema>;
