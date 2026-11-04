import "dotenv/config";
import bcrypt from "bcryptjs";

import { db } from "./index";

function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(`Verification failed: ${message}`);
  }
}

async function main() {
  try {
    console.log("\n--- 1. Staff users ---");

    const admin = await db.orm.public.User
      .where({ email: "admin@keralatrails.test" })
      .first();

    const consultant = await db.orm.public.User
      .where({ email: "consultant@keralatrails.test" })
      .first();

    assert(admin !== null, "Admin user missing");
    assert(consultant !== null, "Consultant user missing");

    assert(admin.role === "ADMIN", "Incorrect admin role");
    assert(consultant.role === "CONSULTANT", "Incorrect consultant role");

    assert(
      /^\$2[aby]\$/.test(admin.passwordHash),
      "Admin password is not bcrypt-hashed",
    );

    assert(
      /^\$2[aby]\$/.test(consultant.passwordHash),
      "Consultant password is not bcrypt-hashed",
    );

    const adminPassword = process.env.SEED_ADMIN_PASSWORD;
    const consultantPassword = process.env.SEED_CONSULTANT_PASSWORD;

    assert(Boolean(adminPassword), "SEED_ADMIN_PASSWORD missing");
    assert(Boolean(consultantPassword), "SEED_CONSULTANT_PASSWORD missing");

    assert(
      await bcrypt.compare(adminPassword!, admin.passwordHash),
      "Admin password comparison failed",
    );

    assert(
      await bcrypt.compare(consultantPassword!, consultant.passwordHash),
      "Consultant password comparison failed",
    );

    console.log("✓ Both staff users and bcrypt passwords verified.");

    console.log("\n--- 2. Package publication ---");

    const keralaPackage = await db.orm.public.Package
      .where({ code: "PKG-KL-07" })
      .first();

    const tamilPackage = await db.orm.public.Package
      .where({ code: "PKG-SI-12" })
      .first();

    assert(keralaPackage !== null, "PKG-KL-07 missing");
    assert(tamilPackage !== null, "PKG-SI-12 missing");

    assert(
      keralaPackage.publishedVersionId !== null,
      "PKG-KL-07 has no published version pointer",
    );

    assert(
      tamilPackage.publishedVersionId === null,
      "PKG-SI-12 should not have a published version pointer",
    );

    const keralaVersion = await db.orm.public.PackageVersion
      .where({ id: keralaPackage.publishedVersionId })
      .first();

    const tamilVersions = await db.orm.public.PackageVersion
      .where({ packageId: tamilPackage.id })
      .all();

    assert(keralaVersion !== null, "Published Kerala version missing");
    assert(keralaVersion.status === "PUBLISHED", "Kerala version is not published");

    assert(tamilVersions.length === 1, "Expected exactly one Tamil Nadu version");
    assert(tamilVersions[0].status === "DRAFT", "Tamil Nadu version should be draft");

    console.log("✓ Published and draft package states verified.");

    console.log("\n--- 3. Seasonal pricing ---");

    const keralaPrices = await db.orm.public.SeasonalPrice
      .where({ packageVersionId: keralaVersion.id })
      .all();

    assert(keralaPrices.length === 2, "Expected two Kerala seasonal prices");

    const peakPrice = keralaPrices.find((price) => price.label === "Peak");
    const monsoonPrice = keralaPrices.find((price) => price.label === "Monsoon");

    assert(peakPrice !== undefined, "Peak price missing");
    assert(monsoonPrice !== undefined, "Monsoon price missing");

    assert(
      String(peakPrice.pricePerPerson) === "32500.00",
      "Incorrect peak price",
    );

    assert(
      String(monsoonPrice.pricePerPerson) === "24900.00",
      "Incorrect monsoon price",
    );

    assert(
      !peakPrice.months.includes(4) && !peakPrice.months.includes(5) &&
      !monsoonPrice.months.includes(4) && !monsoonPrice.months.includes(5),
      "April or May unexpectedly has a seasonal price",
    );

    console.log("✓ Seasonal pricing verified.");

    console.log("\n--- 4. Sample enquiry ---");

    const enquiry = await db.orm.public.Enquiry
      .where({ email: "traveller@example.test" })
      .first();

    assert(enquiry !== null, "Sample enquiry missing");

    assert(
      enquiry.packageVersionId === keralaVersion.id,
      "Enquiry does not reference PKG-KL-07's published version",
    );

    assert(enquiry.status === "NEW", "Incorrect enquiry status");
    assert(enquiry.aiStatus === "PENDING", "Incorrect AI status");
    assert(enquiry.whatsappConsent === false, "WhatsApp consent should be false");

    const snapshot = enquiry.priceSnapshot as {
      label: string;
      pricePerPerson: string;
      basis: string;
      gstMode: string;
      gstRate: string;
      currency: string;
    } | null;

    assert(snapshot !== null, "Enquiry price snapshot missing");
    assert(snapshot.pricePerPerson === "32500.00", "Incorrect snapshot price");
    assert(snapshot.label === "Peak", "Incorrect snapshot label");
    assert(snapshot.currency === "INR", "Incorrect snapshot currency");
    assert(snapshot.gstMode === "EXTRA", "Incorrect snapshot GST mode");

    console.log("✓ Sample enquiry and historical price snapshot verified.");

    console.log("\n--- 5. Additional package count ---");

    const allPackages = await db.orm.public.Package.all();

    assert(allPackages.length === 6, "Expected six seeded packages");

    console.log("✓ Six package identities found.");

    console.log("\nAll seed verification checks passed.");
  } finally {
    await db.close();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});