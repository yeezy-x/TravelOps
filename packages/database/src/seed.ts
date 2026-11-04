import "dotenv/config";
import bcrypt from "bcryptjs";
import { db } from "./index";
import { EnquiryPriceSnapshotSchema, PackageVersionContentSchema, SeasonalPriceSchema } from "@repo/shared";

const SAMPLE_ENQUIRY_EMAIL = "traveller@example.test";

const STAFF_USERS = [
  {
    email: "admin@keralatrails.test",
    name: "Kerala Trails Admin",
    role: "ADMIN",
    passwordEnv: "SEED_ADMIN_PASSWORD",
  },
  {
    email: "consultant@keralatrails.test",
    name: "Kerala Trails Consultant",
    role: "CONSULTANT",
    passwordEnv: "SEED_CONSULTANT_PASSWORD",
  },
] as const;

const DESTINATIONS = [
    { name: "Munnar", slug: "munnar", region: "Kerala" },
    { name: "Thekkady", slug: "thekkady", region: "Kerala" },
    { name: "Alleppey", slug: "alleppey", region: "Kerala" },
    { name: "Madurai", slug: "madurai", region: "Tamil Nadu" },
    { name: "Rameswaram", slug: "rameswaram", region: "Tamil Nadu" },
    { name: "Kanyakumari", slug: "kanyakumari", region: "Tamil Nadu" },
    { name: "Kochi", slug: "kochi", region: "Kerala" },
    { name: "Wayanad", slug: "wayanad", region: "Kerala" },
    { name: "Pondicherry", slug: "pondicherry", region: "Puducherry" },
    {name: "Mahabalipuram", slug: "mahabalipuram", region: "Tamil Nadu"},
] as const;

const PACKAGES = [
  {
    code: "PKG-KL-07",
    slug: "munnar-thekkady-alleppey",
    title: "Munnar, Thekkady & Alleppey Escape",
    summary: "Explore Munnar's tea gardens, Thekkady's wildlife and Alleppey's backwaters.",
    durationDays: 6,
    durationNights: 5,
    category: "KERALA",
    starRating: 4,
    status: "PUBLISHED",
    destinations: ["munnar", "thekkady", "alleppey"],
    content: {
      itineraryDays: [
        {
          day: 1,
          title: "Arrival in Kochi and transfer to Munnar",
          description:
            "Arrive in Kochi and drive through scenic landscapes to Munnar.",
          overnightLocation: "Munnar",
        },
        {
          day: 2,
          title: "Explore Munnar",
          description:
            "Visit tea gardens, viewpoints and Eravikulam National Park.",
          overnightLocation: "Munnar",
        },
        {
          day: 3,
          title: "Munnar to Thekkady",
          description:
            "Travel to Thekkady and explore its spice plantations.",
          overnightLocation: "Thekkady",
        },
        {
          day: 4,
          title: "Thekkady to Alleppey",
          description:
            "Travel to Alleppey and enjoy Kerala's backwaters.",
          overnightLocation: "Alleppey",
        },
        {
          day: 5,
          title: "Houseboat experience",
          description:
            "Enjoy a memorable overnight houseboat experience.",
          overnightLocation: "Alleppey",
        },
        {
          day: 6,
          title: "Departure",
          description:
            "Transfer to Kochi for your onward journey.",
        },
      ],
      hotels: [
        {
          name: "Premium Munnar Resort",
          location: "Munnar",
          starRating: 4,
          nights: 2,
        },
        {
          name: "Thekkady Nature Resort",
          location: "Thekkady",
          starRating: 4,
          nights: 1,
        },
        {
          name: "Premium Backwater Houseboat",
          location: "Alleppey",
          starRating: 4,
          nights: 2,
        },
      ],
      inclusions: [
        "5 nights accommodation",
        "Daily breakfast",
        "Private transfers",
        "Houseboat experience",
      ],
      exclusions: [
        "Airfare or train tickets",
        "Personal expenses",
        "Lunch and dinner unless specified",
        "GST",
      ],
      galleryUrls: [
        "https://images.unsplash.com/photo-1602216056096-3b40cc0ef4c9",
        "https://images.unsplash.com/photo-1593693411515-c20261bcad6e",
      ],
      highlightTags: [
        "Houseboat",
        "Tea Gardens",
        "Hill Stations",
        "Backwaters",
      ],
    },
    prices: [
      {
        label: "Peak",
        months: [10, 11, 12, 1, 2, 3],
        pricePerPerson: "32500.00",
        basis: "PER_PERSON_TWIN",
        gstMode: "EXTRA",
        gstRate: "5.00",
      },
      {
        label: "Monsoon",
        months: [6, 7, 8, 9],
        pricePerPerson: "24900.00",
        basis: "PER_PERSON_TWIN",
        gstMode: "EXTRA",
        gstRate: "5.00",
      },
    ],
  },
  {
    code: "PKG-SI-12",
    slug: "madurai-rameswaram-kanyakumari",
    title: "Madurai, Rameswaram & Kanyakumari",
    summary: "Discover the temples, coastal heritage and spiritual landmarks of Tamil Nadu.",
    durationDays: 5,
    durationNights: 4,
    category: "SOUTH_INDIA",
    starRating: 3,
    status: "DRAFT",
    destinations: ["madurai", "rameswaram", "kanyakumari"],
    content: {
      itineraryDays: [
        {
          day: 1,
          title: "Arrival in Madurai",
          description: "Arrive and explore the historic city.",
          overnightLocation: "Madurai",
        },
        {
          day: 2,
          title: "Madurai to Rameswaram",
          description: "Visit the famous temple town.",
          overnightLocation: "Rameswaram",
        },
        {
          day: 3,
          title: "Explore Rameswaram",
          description: "Explore local landmarks and coastal attractions.",
          overnightLocation: "Rameswaram",
        },
        {
          day: 4,
          title: "Rameswaram to Kanyakumari",
          description: "Travel to India's southern coastline.",
          overnightLocation: "Kanyakumari",
        },
        {
          day: 5,
          title: "Departure",
          description: "Explore the sunrise viewpoint before departure.",
        },
      ],
      hotels: [
        {
          name: "Madurai City Hotel",
          location: "Madurai",
          starRating: 3,
          nights: 1,
        },
        {
          name: "Rameswaram Heritage Hotel",
          location: "Rameswaram",
          starRating: 3,
          nights: 2,
        },
        {
          name: "Kanyakumari Seaside Hotel",
          location: "Kanyakumari",
          starRating: 3,
          nights: 1,
        },
      ],
      inclusions: [
        "4 nights accommodation",
        "Daily breakfast",
        "Private transfers",
      ],
      exclusions: [
        "Airfare or train tickets",
        "Personal expenses",
        "Lunch and dinner",
        "GST",
      ],
      galleryUrls: [
        "https://images.unsplash.com/photo-1606293926075-69a00dbfde81",
      ],
      highlightTags: ["Temple Tourism", "Coastal Journey", "Heritage"],
    },
    prices: [
      {
        label: "Standard",
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        pricePerPerson: "18750.00",
        basis: "PER_PERSON_TWIN",
        gstMode: "EXTRA",
        gstRate: "5.00",
      },
    ],
  },
  {
    code: "PKG-KL-08",
    slug: "alleppey-houseboat-escape",
    title: "Alleppey Backwater Houseboat Escape",
    summary: "Experience Kerala's tranquil backwaters aboard a traditional houseboat.",
    durationDays: 2,
    durationNights: 1,
    category: "KERALA",
    starRating: 4,
    status: "PUBLISHED",
    destinations: ["alleppey"],
    content: {
      itineraryDays: [
        {
          day: 1,
          title: "Houseboat check-in",
          description: "Board your private houseboat and cruise through Alleppey's backwaters.",
          overnightLocation: "Alleppey",
        },
        {
          day: 2,
          title: "Breakfast and departure",
          description: "Enjoy breakfast on board before disembarking.",
        },
      ],
      hotels: [
        {
          name: "Premium Private Houseboat",
          location: "Alleppey",
          starRating: 4,
          nights: 1,
        },
      ],
      inclusions: ["One-night houseboat stay", "All meals on board", "Backwater cruise"],
      exclusions: ["Transfers", "Personal expenses", "GST"],
      galleryUrls: ["https://images.unsplash.com/photo-1593693411515-c20261bcad6e"],
      highlightTags: ["Houseboat", "Backwaters", "Romantic Getaway"],
    },
    prices: [
      {
        label: "Standard",
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        pricePerPerson: "8500.00",
        basis: "PER_PERSON_TWIN",
        gstMode: "EXTRA",
        gstRate: "5.00",
      },
    ],
  },
  {
    code: "PKG-KL-09",
    slug: "kochi-munnar-discovery",
    title: "Kochi and Munnar Discovery",
    summary: "Combine the heritage of Kochi with the scenic tea plantations of Munnar.",
    durationDays: 4,
    durationNights: 3,
    category: "KERALA",
    starRating: 4,
    status: "PUBLISHED",
    destinations: ["kochi", "munnar"],
    content: {
      itineraryDays: [
        {
          day: 1,
          title: "Explore Kochi",
          description: "Discover Fort Kochi and its historic waterfront.",
          overnightLocation: "Kochi",
        },
        {
          day: 2,
          title: "Kochi to Munnar",
          description: "Drive through scenic countryside to Munnar.",
          overnightLocation: "Munnar",
        },
        {
          day: 3,
          title: "Munnar sightseeing",
          description: "Explore tea gardens and mountain viewpoints.",
          overnightLocation: "Munnar",
        },
        {
          day: 4,
          title: "Departure",
          description: "Return towards Kochi for departure.",
        },
      ],
      hotels: [
        {
          name: "Kochi Heritage Hotel",
          location: "Kochi",
          starRating: 4,
          nights: 1,
        },
        {
          name: "Munnar Mountain Resort",
          location: "Munnar",
          starRating: 4,
          nights: 2,
        },
      ],
      inclusions: ["3 nights accommodation", "Breakfast", "Private transfers"],
      exclusions: ["Airfare", "Personal expenses", "GST"],
      galleryUrls: ["https://images.unsplash.com/photo-1602216056096-3b40cc0ef4c9"],
      highlightTags: ["Heritage", "Tea Gardens", "Hill Stations"],
    },
    prices: [
      {
        label: "Standard",
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        pricePerPerson: "22500.00",
        basis: "PER_PERSON_TWIN",
        gstMode: "EXTRA",
        gstRate: "5.00",
      },
    ],
  },
  {
    code: "PKG-KL-10",
    slug: "wayanad-nature-retreat",
    title: "Wayanad Nature Retreat",
    summary: "Explore Wayanad's forests, waterfalls and scenic mountain landscapes.",
    durationDays: 3,
    durationNights: 2,
    category: "KERALA",
    starRating: 3,
    status: "PUBLISHED",
    destinations: ["wayanad"],
    content: {
      itineraryDays: [
        {
          day: 1,
          title: "Arrival in Wayanad",
          description: "Arrive and explore the surrounding hills.",
          overnightLocation: "Wayanad",
        },
        {
          day: 2,
          title: "Nature exploration",
          description: "Visit waterfalls, viewpoints and local attractions.",
          overnightLocation: "Wayanad",
        },
        {
          day: 3,
          title: "Departure",
          description: "Enjoy breakfast before departure.",
        },
      ],
      hotels: [
        {
          name: "Wayanad Nature Resort",
          location: "Wayanad",
          starRating: 3,
          nights: 2,
        },
      ],
      inclusions: ["2 nights accommodation", "Breakfast", "Sightseeing transfers"],
      exclusions: ["Airfare", "Entry tickets", "Personal expenses", "GST"],
      galleryUrls: ["https://images.unsplash.com/photo-1511497584788-876760111969"],
      highlightTags: ["Nature", "Waterfalls", "Wildlife"],
    },
    prices: [
      {
        label: "Standard",
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        pricePerPerson: "14500.00",
        basis: "PER_PERSON_TWIN",
        gstMode: "EXTRA",
        gstRate: "5.00",
      },
    ],
  },
  {
    code: "PKG-TN-03",
    slug: "pondicherry-mahabalipuram-coastal",
    title: "Pondicherry and Mahabalipuram Coastal Journey",
    summary: "Discover French colonial charm and ancient coastal architecture.",
    durationDays: 4,
    durationNights: 3,
    category: "SOUTH_INDIA",
    starRating: 3,
    status: "PUBLISHED",
    destinations: ["pondicherry", "mahabalipuram"],
    content: {
      itineraryDays: [
        {
          day: 1,
          title: "Arrival in Pondicherry",
          description: "Explore the French Quarter and Promenade Beach.",
          overnightLocation: "Pondicherry",
        },
        {
          day: 2,
          title: "Pondicherry exploration",
          description: "Visit local heritage sites and attractions.",
          overnightLocation: "Pondicherry",
        },
        {
          day: 3,
          title: "Mahabalipuram",
          description: "Explore ancient temples and coastal monuments.",
          overnightLocation: "Mahabalipuram",
        },
        {
          day: 4,
          title: "Departure",
          description: "Breakfast and onward journey.",
        },
      ],
      hotels: [
        {
          name: "Pondicherry Heritage Stay",
          location: "Pondicherry",
          starRating: 3,
          nights: 2,
        },
        {
          name: "Mahabalipuram Coastal Hotel",
          location: "Mahabalipuram",
          starRating: 3,
          nights: 1,
        },
      ],
      inclusions: ["3 nights accommodation", "Breakfast", "Private transfers"],
      exclusions: ["Airfare", "Entry tickets", "Personal expenses", "GST"],
      galleryUrls: ["https://images.unsplash.com/photo-1519046904884-53103b34b206"],
      highlightTags: ["Heritage", "Beaches", "Architecture"],
    },
    prices: [
      {
        label: "Standard",
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        pricePerPerson: "19500.00",
        basis: "PER_PERSON_TWIN",
        gstMode: "EXTRA",
        gstRate: "5.00",
      },
    ],
  },
] as const;


async function seedStaffUsers() {
  console.log("Seeding staff users...");

  for (const staff of STAFF_USERS) {
    const password = process.env[staff.passwordEnv];
    if (!password) {
      throw new Error(`Missing required environment variable: ${staff.passwordEnv}`);
    }

    const passwordHash = await bcrypt.hash(password, 12);

    if (!/^\$2[aby]\$/.test(passwordHash)) {
      throw new Error(`Invalid bcrypt hash generated for ${staff.email}`);
    }

    await db.orm.public.User.upsert({
      create: {
        email: staff.email,
        name: staff.name,
        role: staff.role,
        passwordHash,
      },
      update: {
        name: staff.name,
        role: staff.role,
        passwordHash,
      },
      conflictOn: { email: staff.email },
    });

    console.log(`✓ Seeded ${staff.email}`);
  }
}

async function seedDestinations() {
    console.log("Seeding destinations...");
  
    for (const destination of DESTINATIONS) {
      await db.orm.public.Destination.upsert({
        create: destination,
        update: {
          name: destination.name,
          region: destination.region,
        },
        conflictOn: { slug: destination.slug },
      });
      console.log(`✓ Seeded destination: ${destination.name}`);
    }
}

function validatePackageFixtures() {
  for (const pkg of PACKAGES) {
    PackageVersionContentSchema.parse(pkg.content);
    for (const price of pkg.prices) {
      SeasonalPriceSchema.parse(price);
    }
  }
  console.log("✓ Package fixtures passed Zod validation.");
}

async function seedPackages() {
  console.log("Seeding packages...");
  const admin=await db.orm.public.User.where({email: "admin@keralatrails.test"}).first();
  if(!admin) throw new Error("Admin user not found. Seed staff users first.");
  for(const pkg of PACKAGES) {
    await db.transaction(async (tx)=>{
      const existingPackage=await tx.orm.public.Package.where({code:pkg.code}).first();
      let packageId:string;
      if(existingPackage) {
        packageId=existingPackage.id;
        await tx.orm.public.Package.where({id:packageId}).update({publishedVersionId:null})
        if (pkg.code === "PKG-KL-07") {
          await tx.orm.public.Enquiry
            .where({ email: SAMPLE_ENQUIRY_EMAIL })
            .deleteAll();
        }
        const existingVersions = await tx.orm.public.PackageVersion.where({ packageId }).all();
        for (const version of existingVersions) {
          const enquiry = await tx.orm.public.Enquiry.where({ packageVersionId: version.id }).first();
          const suggestion = await tx.orm.public.PackageSuggestion.where({ packageVersionId: version.id }).first();
          if (enquiry || suggestion) {
            throw new Error(`Cannot replace ${pkg.code}: version ${version.id} is referenced by an enquiry or suggestion.`);
          }
        }
        await tx.orm.public.PackageVersion.where({ packageId }).deleteAll();
        await tx.orm.public.Package.where({ id: packageId }).update({slug: pkg.slug});
      } else {
        const createdPackage = await tx.orm.public.Package.create({
          code: pkg.code,
          slug: pkg.slug,
          publishedVersionId: null,
        });
        packageId = createdPackage.id;
      }

      const version = await tx.orm.public.PackageVersion.create({
        packageId,
        versionNumber: 1,
        status: pkg.status,
        title: pkg.title,
        summary: pkg.summary,
        durationDays: pkg.durationDays,
        durationNights: pkg.durationNights,
        category: pkg.category,
        starRating: pkg.starRating,
        content: pkg.content,
        authorId: admin.id,
      });

      for (const destinationSlug of pkg.destinations) {
        const destination = await tx.orm.public.Destination.where({ slug: destinationSlug }).first();
        if (!destination) {
          throw new Error(`Destination not found: ${destinationSlug}`);
        }
        await tx.orm.public.PackageVersionDestination.create({
          packageVersionId: version.id,
          destinationId: destination.id,
        });
      }

      for (const price of pkg.prices) {
        await tx.orm.public.SeasonalPrice.create({
          packageVersionId: version.id,
          label: price.label,
          months: [...price.months],
          pricePerPerson: price.pricePerPerson,
          basis: price.basis,
          gstMode: price.gstMode,
          gstRate: price.gstRate,
        });
      }
      if (pkg.status === "PUBLISHED") {
        await tx.orm.public.Package.where({ id: packageId }).update({publishedVersionId: version.id});
      }
      console.log(`✓ Seeded package: ${pkg.code}`);
    });
  }
}

async function seedSampleEnquiry() {
  console.log("Seeding sample enquiry...");

  const packageRecord = await db.orm.public.Package
    .where({ code: "PKG-KL-07" })
    .first();

  if (!packageRecord?.publishedVersionId) {
    throw new Error(
      "PKG-KL-07 must have a published version before seeding the enquiry.",
    );
  }

  const priceSnapshot = {
    label: "Peak",
    pricePerPerson: "32500.00",
    basis: "PER_PERSON_TWIN",
    gstMode: "EXTRA",
    gstRate: "5.00",
    currency: "INR",
  } as const;

  EnquiryPriceSnapshotSchema.parse(priceSnapshot);

  const existingEnquiry = await db.orm.public.Enquiry
    .where({ email: SAMPLE_ENQUIRY_EMAIL })
    .first();

  const enquiryData = {
    name: "Aarav Sharma",
    email: "traveller@example.test",
    phone: "+919876543210",
    message:
      "Hi, 2 adults and 1 kid, Kerala 5-6 nights in December, budget around 1.2 lakh total, houseboat a must.",
    adults: 2,
    children: 1,
    packageId: packageRecord.id,
    packageVersionId: packageRecord.publishedVersionId,
    priceSnapshot,
    status: "NEW" as const,
    aiStatus: "PENDING" as const,
    whatsappConsent: false,
    whatsappConsentAt: null,
  };

  if (existingEnquiry) {
    await db.orm.public.Enquiry
      .where({ id: existingEnquiry.id })
      .update(enquiryData);
  } else {
    await db.orm.public.Enquiry.create(enquiryData);
  }

  console.log("✓ Seeded sample enquiry.");
}


async function main() {
  try {
    validatePackageFixtures();
    await seedStaffUsers();
    await seedDestinations();
    await seedPackages();
    await seedSampleEnquiry();
    console.log("Seeding completed.");
  } finally {
    await db.close();
  }
}

main().catch((error: unknown) => {
  console.error("Seed failed:", error);
  process.exitCode = 1;
});
