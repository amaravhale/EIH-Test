/**
 * Content Validators
 * Zod schemas for content items (blog posts, case studies, white papers, etc.)
 * and document upload / management.
 */

import { z } from "zod";

const CONTENT_TYPES = [
  "blog_post",
  "case_study",
  "white_paper",
  "newsletter",
  "announcement",
  "insight",
] as const;

const CONTENT_STATUSES = ["draft", "review", "published", "archived"] as const;

const DOCUMENT_TYPES = [
  "report",
  "proposal",
  "policy",
  "standard",
  "presentation",
  "spreadsheet",
  "correspondence",
  "other",
] as const;

const PROCESSING_STATUSES = ["pending", "processing", "completed", "failed"] as const;

const MAX_FILE_SIZE_MB = 50;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const ACCEPTED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/plain",
  "text/csv",
  "text/markdown",
  "application/json",
] as const;

// ─── Content Item Schemas ────────────────────────────────────────────

export const createContentSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(300, "Title must be 300 characters or fewer"),
  content_type: z
    .enum(CONTENT_TYPES, { message: "Invalid content type" })
    .default("blog_post"),
  body: z
    .string()
    .min(1, "Body content is required")
    .max(100_000, "Body must be 100000 characters or fewer"),
  excerpt: z
    .string()
    .max(500, "Excerpt must be 500 characters or fewer")
    .optional()
    .or(z.literal("")),
  cover_image_url: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  category: z
    .string()
    .max(100, "Category must be 100 characters or fewer")
    .optional()
    .or(z.literal("")),
  tags: z
    .array(z.string().min(1).max(100))
    .max(20, "Maximum 20 tags")
    .default([]),
  seo_title: z
    .string()
    .max(70, "SEO title should be 70 characters or fewer for search engines")
    .optional()
    .or(z.literal("")),
  seo_description: z
    .string()
    .max(160, "SEO description should be 160 characters or fewer")
    .optional()
    .or(z.literal("")),
  status: z
    .enum(CONTENT_STATUSES, { message: "Invalid content status" })
    .default("draft"),
});

export const updateContentSchema = createContentSchema.partial();

export const publishContentSchema = z.object({
  id: z.string().uuid("Invalid content ID"),
  published_at: z
    .string()
    .datetime({ message: "Must be a valid ISO datetime" })
    .optional(),
});

export const contentFilterSchema = z.object({
  search: z.string().max(255).optional().default(""),
  content_type: z.array(z.enum(CONTENT_TYPES)).optional().default([]),
  status: z.array(z.enum(CONTENT_STATUSES)).optional().default([]),
  category: z.string().max(100).optional().nullable().default(null),
  tags: z.array(z.string()).optional().default([]),
  author_id: z.string().uuid().optional().nullable().default(null),
  page: z.number().int().min(1).default(1),
  per_page: z.number().int().min(1).max(100).default(20),
  sort_by: z
    .enum(["title", "published_at", "view_count", "created_at"])
    .default("created_at"),
  sort_order: z.enum(["asc", "desc"]).default("desc"),
});

// ─── Document Schemas ────────────────────────────────────────────────

export const uploadDocumentSchema = z.object({
  title: z
    .string()
    .min(1, "Document title is required")
    .max(300, "Title must be 300 characters or fewer"),
  description: z
    .string()
    .max(2000, "Description must be 2000 characters or fewer")
    .optional()
    .or(z.literal("")),
  document_type: z
    .enum(DOCUMENT_TYPES, { message: "Invalid document type" })
    .default("other"),
  source_entity_type: z
    .string()
    .max(50)
    .optional()
    .or(z.literal("")),
  source_entity_id: z
    .string()
    .uuid("Invalid entity ID")
    .optional()
    .nullable(),
  tags: z
    .array(z.string().min(1).max(100))
    .max(20, "Maximum 20 tags")
    .default([]),
});

export const updateDocumentSchema = z.object({
  title: z.string().min(1).max(300).optional(),
  description: z.string().max(2000).optional().or(z.literal("")),
  document_type: z.enum(DOCUMENT_TYPES).optional(),
  tags: z.array(z.string().min(1).max(100)).max(20).optional(),
});

export const documentFilterSchema = z.object({
  search: z.string().max(255).optional().default(""),
  document_type: z.array(z.enum(DOCUMENT_TYPES)).optional().default([]),
  processing_status: z.array(z.enum(PROCESSING_STATUSES)).optional().default([]),
  source_entity_type: z.string().max(50).optional().nullable().default(null),
  tags: z.array(z.string()).optional().default([]),
  page: z.number().int().min(1).default(1),
  per_page: z.number().int().min(1).max(100).default(20),
  sort_by: z
    .enum(["title", "file_size", "created_at", "processed_at"])
    .default("created_at"),
  sort_order: z.enum(["asc", "desc"]).default("desc"),
});

/**
 * Validate a file for upload (used client-side before sending).
 * Cannot use z.instanceof(File) on server, so this is kept separate.
 */
export function validateFileUpload(file: File): { valid: boolean; error?: string } {
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File size exceeds ${MAX_FILE_SIZE_MB}MB limit`,
    };
  }

  if (!ACCEPTED_MIME_TYPES.includes(file.type as (typeof ACCEPTED_MIME_TYPES)[number])) {
    return {
      valid: false,
      error: `File type "${file.type}" is not supported. Accepted: PDF, Word, Excel, PowerPoint, text, CSV, Markdown, JSON`,
    };
  }

  return { valid: true };
}

export { MAX_FILE_SIZE_MB, MAX_FILE_SIZE_BYTES, ACCEPTED_MIME_TYPES };

export type CreateContentInput = z.infer<typeof createContentSchema>;
export type UpdateContentInput = z.infer<typeof updateContentSchema>;
export type PublishContentInput = z.infer<typeof publishContentSchema>;
export type ContentFilterInput = z.infer<typeof contentFilterSchema>;
export type UploadDocumentInput = z.infer<typeof uploadDocumentSchema>;
export type UpdateDocumentInput = z.infer<typeof updateDocumentSchema>;
export type DocumentFilterInput = z.infer<typeof documentFilterSchema>;
