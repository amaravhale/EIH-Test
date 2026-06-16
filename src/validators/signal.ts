/**
 * Signal Validators
 * Zod schemas for signal creation, update, acknowledgement, and filtering.
 */

import { z } from "zod";

const SIGNAL_TYPES = [
  "competitor_move",
  "market_shift",
  "regulatory_change",
  "technology_trend",
  "personnel_change",
  "financial_event",
  "partnership",
  "acquisition",
  "product_launch",
  "other",
] as const;

const SEVERITY_LEVELS = ["low", "medium", "high", "critical"] as const;

const SIGNAL_STATUSES = [
  "new",
  "acknowledged",
  "investigating",
  "resolved",
  "dismissed",
] as const;

const SOURCE_TYPES = [
  "news",
  "social_media",
  "regulatory",
  "financial",
  "industry_report",
  "website_change",
  "manual",
  "ai_detected",
] as const;

export const createSignalSchema = z.object({
  title: z
    .string()
    .min(1, "Signal title is required")
    .max(500, "Title must be 500 characters or fewer"),
  summary: z
    .string()
    .max(2000, "Summary must be 2000 characters or fewer")
    .optional()
    .or(z.literal("")),
  content: z
    .string()
    .max(50_000, "Content must be 50000 characters or fewer")
    .optional()
    .or(z.literal("")),
  source_url: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  source_name: z
    .string()
    .max(255, "Source name must be 255 characters or fewer")
    .optional()
    .or(z.literal("")),
  source_type: z
    .enum(SOURCE_TYPES, { message: "Invalid source type" })
    .default("manual"),
  signal_type: z.enum(SIGNAL_TYPES, {
    required_error: "Signal type is required",
    message: "Invalid signal type",
  }),
  severity: z
    .enum(SEVERITY_LEVELS, { message: "Invalid severity level" })
    .default("medium"),
  confidence: z
    .number()
    .min(0, "Confidence must be between 0 and 1")
    .max(1, "Confidence must be between 0 and 1")
    .default(0.5),
  competitor_id: z
    .string()
    .uuid("Invalid competitor ID")
    .optional()
    .nullable(),
  tags: z
    .array(z.string().min(1).max(100))
    .max(20, "Maximum 20 tags")
    .default([]),
  metadata: z.record(z.unknown()).optional(),
  published_at: z
    .string()
    .datetime({ message: "Must be a valid ISO datetime" })
    .optional()
    .nullable(),
});

export const updateSignalSchema = createSignalSchema.partial().extend({
  status: z.enum(SIGNAL_STATUSES, { message: "Invalid status" }).optional(),
});

export const acknowledgeSignalSchema = z.object({
  signal_id: z.string().uuid("Invalid signal ID"),
});

export const bulkSignalActionSchema = z.object({
  signal_ids: z
    .array(z.string().uuid("Invalid signal ID"))
    .min(1, "At least one signal must be selected")
    .max(100, "Maximum 100 signals per action"),
  action: z.enum(["acknowledge", "dismiss", "investigate", "resolve"], {
    message: "Invalid bulk action",
  }),
});

export const signalFilterSchema = z.object({
  search: z.string().max(255).optional().default(""),
  signal_type: z.array(z.enum(SIGNAL_TYPES)).optional().default([]),
  severity: z.array(z.enum(SEVERITY_LEVELS)).optional().default([]),
  status: z.array(z.enum(SIGNAL_STATUSES)).optional().default([]),
  source_type: z.array(z.enum(SOURCE_TYPES)).optional().default([]),
  competitor_id: z.string().uuid().optional().nullable().default(null),
  date_from: z.string().datetime().optional().nullable().default(null),
  date_to: z.string().datetime().optional().nullable().default(null),
  tags: z.array(z.string()).optional().default([]),
  page: z.number().int().min(1).default(1),
  per_page: z.number().int().min(1).max(100).default(20),
  sort_by: z
    .enum(["title", "severity", "confidence", "detected_at", "created_at"])
    .default("detected_at"),
  sort_order: z.enum(["asc", "desc"]).default("desc"),
});

export type CreateSignalInput = z.infer<typeof createSignalSchema>;
export type UpdateSignalInput = z.infer<typeof updateSignalSchema>;
export type AcknowledgeSignalInput = z.infer<typeof acknowledgeSignalSchema>;
export type BulkSignalActionInput = z.infer<typeof bulkSignalActionSchema>;
export type SignalFilterInput = z.infer<typeof signalFilterSchema>;
