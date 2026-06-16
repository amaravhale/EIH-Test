/**
 * Tender Validators
 * Zod schemas for tender creation, update, bid decisions, and filtering.
 */

import { z } from "zod";

const TENDER_STATUSES = [
  "identified",
  "evaluating",
  "preparing_bid",
  "submitted",
  "awarded",
  "lost",
  "withdrawn",
  "cancelled",
  "expired",
] as const;

const BID_DECISIONS = ["bid", "no_bid", "watching", "undecided"] as const;
const CURRENCIES = ["GBP", "EUR", "USD"] as const;

export const createTenderSchema = z
  .object({
    title: z
      .string()
      .min(1, "Tender title is required")
      .max(500, "Title must be 500 characters or fewer"),
    reference_number: z
      .string()
      .max(100, "Reference number must be 100 characters or fewer")
      .optional()
      .or(z.literal("")),
    description: z
      .string()
      .max(20_000, "Description must be 20000 characters or fewer")
      .optional()
      .or(z.literal("")),
    issuing_authority: z
      .string()
      .min(1, "Issuing authority is required")
      .max(255, "Issuing authority must be 255 characters or fewer"),
    buyer_name: z
      .string()
      .max(255)
      .optional()
      .or(z.literal("")),
    buyer_url: z
      .string()
      .url("Must be a valid URL")
      .optional()
      .or(z.literal("")),
    source_url: z
      .string()
      .url("Must be a valid URL")
      .optional()
      .or(z.literal("")),
    value_min: z
      .number()
      .min(0, "Value cannot be negative")
      .optional()
      .nullable(),
    value_max: z
      .number()
      .min(0, "Value cannot be negative")
      .optional()
      .nullable(),
    currency: z.enum(CURRENCIES).default("GBP"),
    location: z
      .string()
      .max(255)
      .optional()
      .or(z.literal("")),
    region: z
      .string()
      .max(100)
      .optional()
      .or(z.literal("")),
    sectors: z
      .array(z.string().min(1).max(100))
      .max(20, "Maximum 20 sectors")
      .default([]),
    cpv_codes: z
      .array(
        z.string().regex(/^\d{8}-\d$/, "CPV code must be in format 12345678-9")
      )
      .max(20, "Maximum 20 CPV codes")
      .default([]),
    submission_deadline: z
      .string()
      .datetime({ message: "Must be a valid ISO datetime" })
      .optional()
      .nullable(),
    published_at: z
      .string()
      .datetime({ message: "Must be a valid ISO datetime" })
      .optional()
      .nullable(),
    contract_start: z
      .string()
      .datetime({ message: "Must be a valid ISO datetime" })
      .optional()
      .nullable(),
    contract_end: z
      .string()
      .datetime({ message: "Must be a valid ISO datetime" })
      .optional()
      .nullable(),
    contract_duration_months: z
      .number()
      .int()
      .min(1, "Duration must be at least 1 month")
      .max(120, "Duration must be 120 months or fewer")
      .optional()
      .nullable(),
    notes: z
      .string()
      .max(10_000, "Notes must be 10000 characters or fewer")
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) => {
      if (data.value_min != null && data.value_max != null) {
        return data.value_min <= data.value_max;
      }
      return true;
    },
    {
      message: "Minimum value must be less than or equal to maximum value",
      path: ["value_min"],
    }
  )
  .refine(
    (data) => {
      if (data.contract_start && data.contract_end) {
        return new Date(data.contract_start) <= new Date(data.contract_end);
      }
      return true;
    },
    {
      message: "Contract start date must be before end date",
      path: ["contract_start"],
    }
  );

export const updateTenderSchema = z.object({
  title: z
    .string()
    .min(1)
    .max(500)
    .optional(),
  reference_number: z.string().max(100).optional().or(z.literal("")),
  description: z.string().max(20_000).optional().or(z.literal("")),
  issuing_authority: z.string().min(1).max(255).optional(),
  buyer_name: z.string().max(255).optional().or(z.literal("")),
  buyer_url: z.string().url().optional().or(z.literal("")),
  source_url: z.string().url().optional().or(z.literal("")),
  value_min: z.number().min(0).optional().nullable(),
  value_max: z.number().min(0).optional().nullable(),
  currency: z.enum(CURRENCIES).optional(),
  location: z.string().max(255).optional().or(z.literal("")),
  region: z.string().max(100).optional().or(z.literal("")),
  sectors: z.array(z.string().min(1).max(100)).max(20).optional(),
  cpv_codes: z.array(z.string().regex(/^\d{8}-\d$/)).max(20).optional(),
  submission_deadline: z.string().datetime().optional().nullable(),
  published_at: z.string().datetime().optional().nullable(),
  contract_start: z.string().datetime().optional().nullable(),
  contract_end: z.string().datetime().optional().nullable(),
  contract_duration_months: z.number().int().min(1).max(120).optional().nullable(),
  notes: z.string().max(10_000).optional().or(z.literal("")),
  status: z.enum(TENDER_STATUSES).optional(),
  bid_decision: z.enum(BID_DECISIONS).optional().nullable(),
  bid_decision_reason: z.string().max(2000).optional().or(z.literal("")),
  assigned_to: z.string().uuid().optional().nullable(),
  relevance_score: z.number().min(0).max(100).optional().nullable(),
});

export const bidDecisionSchema = z.object({
  tender_id: z.string().uuid("Invalid tender ID"),
  decision: z.enum(BID_DECISIONS, {
    required_error: "Bid decision is required",
  }),
  reason: z
    .string()
    .max(2000, "Reason must be 2000 characters or fewer")
    .optional()
    .or(z.literal("")),
});

export const tenderFilterSchema = z.object({
  search: z.string().max(255).optional().default(""),
  status: z.array(z.enum(TENDER_STATUSES)).optional().default([]),
  bid_decision: z.array(z.enum(BID_DECISIONS)).optional().default([]),
  sectors: z.array(z.string()).optional().default([]),
  value_min: z.number().min(0).optional().nullable().default(null),
  value_max: z.number().min(0).optional().nullable().default(null),
  deadline_from: z.string().datetime().optional().nullable().default(null),
  deadline_to: z.string().datetime().optional().nullable().default(null),
  assigned_to: z.string().uuid().optional().nullable().default(null),
  region: z.string().max(100).optional().nullable().default(null),
  page: z.number().int().min(1).default(1),
  per_page: z.number().int().min(1).max(100).default(20),
  sort_by: z
    .enum(["title", "value_max", "submission_deadline", "relevance_score", "created_at"])
    .default("submission_deadline"),
  sort_order: z.enum(["asc", "desc"]).default("asc"),
});

export type CreateTenderInput = z.infer<typeof createTenderSchema>;
export type UpdateTenderInput = z.infer<typeof updateTenderSchema>;
export type BidDecisionInput = z.infer<typeof bidDecisionSchema>;
export type TenderFilterInput = z.infer<typeof tenderFilterSchema>;
