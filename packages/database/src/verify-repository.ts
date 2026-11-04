import {
    findUserByEmail,
    listPackagesForStaff,
    listPublishedPackages,
    db,
  } from "./index";
  
  async function main() {
    try {
      // 1. Verify admin lookup.
      const admin = await findUserByEmail(
        "admin@keralatrails.test",
      );
  
      console.log("Admin:", admin?.email, admin?.role);
  
      // 2. Verify staff package listing.
      const staffPackages = await listPackagesForStaff();
  
      console.log("Staff package count:", staffPackages.length);
  
      // 3. Verify public package listing.
      const publishedPackages = await listPublishedPackages();
  
      console.log(
        "Published package count:",
        publishedPackages.length,
      );
  
      // 4. Verify draft package exclusion.
      const draftIncluded = publishedPackages.some(
        (pkg) => pkg.code === "PKG-SI-12",
      );
  
      if (draftIncluded) {
        throw new Error("Draft package appeared in public listing.");
      }
  
      console.log("✓ Draft package correctly excluded.");
  
      // 5. Verify PKG-KL-07 is published.
      const keralaPackage = publishedPackages.find(
        (pkg) => pkg.code === "PKG-KL-07",
      );
  
      if (!keralaPackage) {
        throw new Error("PKG-KL-07 missing from public listing.");
      }
  
      console.log(
        "✓ PKG-KL-07 published:",
        keralaPackage.publishedVersion.title,
      );
    } finally {
      await db.close();
    }
  }
  
  main().catch((error: unknown) => {
    console.error("Repository verification failed:", error);
    process.exitCode = 1;
  });