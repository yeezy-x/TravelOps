import { z } from "zod";

export const RoleSchema = z.enum(["ADMIN", "CONSULTANT"]);

export type Role = z.infer<typeof RoleSchema>;

export const VersionStatusSchema = z.enum([
  "DRAFT",
  "PUBLISHED",
  "ARCHIVED",
]);

export type VersionStatus = z.infer<typeof VersionStatusSchema>;

export const PriceBasisSchema = z.literal("PER_PERSON_TWIN");

export type PriceBasis = z.infer<typeof PriceBasisSchema>;

export const GstModeSchema = z.enum(["EXTRA", "INCLUDED"]);

export type GstMode = z.infer<typeof GstModeSchema>;

export const EnquiryStatusSchema = z.enum([
  "NEW",
  "IN_REVIEW",
  "REPLIED",
  "CLOSED",
]);

export type EnquiryStatus = z.infer<typeof EnquiryStatusSchema>;

export const AiStatusSchema = z.enum([
  "PENDING",
  "COMPLETE",
  "FAILED",
]);

export type AiStatus = z.infer<typeof AiStatusSchema>;

export const BudgetAssessmentSchema = z.enum([
  "WITHIN_KNOWN_COSTS",
  "EXCEEDS_KNOWN_LOWER_BOUND",
  "UNCERTAIN",
]);

export type BudgetAssessment = z.infer<typeof BudgetAssessmentSchema>;

export const ReplyDraftStatusSchema = z.enum([
  "DRAFT",
  "APPROVED",
]);

export type ReplyDraftStatus = z.infer<typeof ReplyDraftStatusSchema>;

export const ReplyDraftSourceSchema = z.enum([
  "AI",
  "MANUAL",
]);

export type ReplyDraftSource = z.infer<typeof ReplyDraftSourceSchema>;