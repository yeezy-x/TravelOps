import { db } from "../index";

export async function listPackagesForStaff() {
  const packages = await db.orm.public.Package.include("versions").all();

  return packages.map((pkg) => ({
    id: pkg.id,
    code: pkg.code,
    slug: pkg.slug,
    publishedVersionId: pkg.publishedVersionId,
    versions: pkg.versions.map((version) => ({
      id: version.id,
      versionNumber: version.versionNumber,
      title: version.title,
      status: version.status,
      createdAt: version.createdAt,
    })),
  }));
}

export async function listPublishedPackages() {
  const packages = await db.orm.public.Package.where((pkg) => pkg.publishedVersionId.isNotNull()).include("publishedVersion").all();

  return packages
    .filter((pkg) => pkg.publishedVersion !== null)
    .map((pkg) => ({
      id: pkg.id,
      code: pkg.code,
      slug: pkg.slug,
      publishedVersionId: pkg.publishedVersionId,
      publishedVersion: {
        id: pkg.publishedVersion!.id,
        title: pkg.publishedVersion!.title,
        summary: pkg.publishedVersion!.summary,
        durationDays: pkg.publishedVersion!.durationDays,
        durationNights: pkg.publishedVersion!.durationNights,
        category: pkg.publishedVersion!.category,
        starRating: pkg.publishedVersion!.starRating,
        content: pkg.publishedVersion!.content,
      },
    }));
}
