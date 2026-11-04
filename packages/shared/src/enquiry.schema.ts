import { z } from "zod";

import { AiStatusSchema, EnquiryStatusSchema } from "./enums";
import { EnquiryPriceSnapshotSchema } from "./price.schema";

export const EnquirySchema = z.strictObject({
  name: z.string().min(2),
  email: z.email(),
  phone: z.string().min(7),
  message: z.string().min(10),
  adults: z.number().int().positive().optional(),
  children: z.number().int().min(0).optional(),
  packageId: z.string().optional(),
  packageVersionId: z.string().optional(),
  priceSnapshot: EnquiryPriceSnapshotSchema.optional(),
  status: EnquiryStatusSchema,
  aiStatus: AiStatusSchema,
  whatsappConsent: z.boolean(),
});

export type EnquiryInput = z.infer<typeof EnquirySchema>;