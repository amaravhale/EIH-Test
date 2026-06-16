/**
 * Competitor Validators
 * Zod schemas for competitor creation, update, and filtering.
 */

import { z } from "zod";

const THREAT_LEVELS = ["low", "medium", "high", "critical"] as const;
const ENTITY_STATUSES = ["active", "inactive", "archived"] as const;

export const keyPersonnelSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  title: z.string().min(1, "Title is required").max(200),
  linkedin_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  notes: z.string().max(1000).optional().or(z.literal("")),
});

export const socialLinksSchema = z.object({
  linkedin: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  twitter: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  youtube: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  facebook: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export const createCompetitorSchema = z.object({
  name: z
    .string()
    .min(1, "Competitor name is required")
    .max(255, "Name must be 255 characters or fewer"),
  website: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  description: z
    .string()
    .max(5000, "Description must be 5000 characters or fewer")
    .optional()
    .or(z.literal("")),
  headquarters: z
    .string()
    .max(255, "Headquarters must be 255 characters or fewer")
    .optional()
    .or(z.literal("")),
  employee_count: z
    .number()
    .int("Must be a whole number")
    .min(0, "Cannot be negative")
    .max(10_000_000, "Value too large")
    .optional()
    .nullable(),
  revenue_range: z
    .string()
    .max(100)
    .optional()
    .or(z.literal("")),
  founded_year: z
    .number()
    .int()
    .min(1800, "Year must be 1800 or later")
    .max(new Date().getFullYear(), "Year cannot be in the future")
    .optional()
    .nullable(),
  sectors: z
    .array(z.string().min(1).max(100))
    .max(20, "Maximum 20 sectors")
    .default([]),
  services: z
    .array(z.string().min(1).max(200))
    .max(50, "Maximum 50 services")
    .default([]),
  certifications: z
    .array(z.string().min(1).max(200))
    .max(30, "Maximum 30 certifications")
    .default([]),
  key_personnel: z
    .array(keyPersonnelSchema)
    .max(50, "Maximum 50 personnel entries")
    .optional()
    .default([]),
  social_links: socialLinksSchema.optional(),
  threat_level: z
    .enum(THREAT_LEVELS, { message: "Invalid threat level" })
    .default("low"),
  notes: z
    .string()
    .max(10_000, "Notes must be 10000 characters or fewer")
    .optional()
    .or(z.literal("")),
});

export const updateCompetitorSchema = createCompetitorSchema.partial().extend({
  status: z.enum(ENTITY_STATUSES, { message: "Invalid status" }).optional(),
});

export const competitorFilterSchema = z.object({
  search: z.string().max(255).optional().default(""),
  threat_level: z.array(z.enum(THREAT_LEVELS)).optional().default([]),
  status: z.array(z.enum(ENTITY_STATUSES)).optional().default([]),
  sectors: z.array(z.string()).optional().default([]),
  page: z.number().int().min(1).default(1),
  per_page: z.number().int().min(1).max(100).default(20),
  sort_by: z
    .enum(["name", "threat_level", "created_at", "updated_at", "signal_count"])
    .default("name"),
  sort_order: z.enum(["asc", "desc"]).default("asc"),
});

export type CreateCompetitorInput = z.infer<typeof createCompetitorSchema>;
export type UpdateCompetitorInput = z.infer<typeof updateCompetitorSchema>;
export type CompetitorFilterInput = z.infer<typeof competitorFilterSchema>;
