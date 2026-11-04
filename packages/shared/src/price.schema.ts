import { z } from "zod";

import { GstModeSchema, PriceBasisSchema } from "./enums";

const DecimalStringSchema = z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid monetary decimal value");

export const SeasonalPriceSchema = z.strictObject({
  label: z.string().min(1),
  months: z.array(z.number().int().min(1).max(12)).min(1),
  pricePerPerson: DecimalStringSchema,
  basis: PriceBasisSchema,
  gstMode: GstModeSchema,
  gstRate: z.string().regex(/^\d+(\.\d{1,2})?$/),
});

export type SeasonalPrice = z.infer<typeof SeasonalPriceSchema>;

export const EnquiryPriceSnapshotSchema = z.strictObject({
  label: z.string().min(1),
  pricePerPerson: DecimalStringSchema,
  basis: PriceBasisSchema,
  gstMode: GstModeSchema,
  gstRate: z.string().regex(/^\d+(\.\d{1,2})?$/),
  currency: z.literal("INR"),
});

export type EnquiryPriceSnapshot = z.infer<typeof EnquiryPriceSnapshotSchema>;