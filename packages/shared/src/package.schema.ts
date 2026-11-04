import { z } from "zod";

const ItineraryDaySchema = z.strictObject({
  day: z.number().int().positive(),
  title: z.string().min(1),
  description: z.string().min(1),
  overnightLocation: z.string().optional(),
});

const HotelSchema = z.strictObject({
  name: z.string().min(1),
  location: z.string().min(1),
  starRating: z.number().int().min(1).max(5).optional(),
  nights: z.number().int().positive(),
});

export const PackageVersionContentSchema = z.strictObject({
  itineraryDays: z.array(ItineraryDaySchema).min(1),
  hotels: z.array(HotelSchema).min(1),
  inclusions: z.array(z.string().min(1)),
  exclusions: z.array(z.string().min(1)),
  galleryUrls: z.array(z.url()),
  highlightTags: z.array(z.string().min(1)),
});

export type PackageVersionContent = z.infer<typeof PackageVersionContentSchema>;

export type ItineraryDay = z.infer<typeof ItineraryDaySchema>;

export type Hotel = z.infer<typeof HotelSchema>;