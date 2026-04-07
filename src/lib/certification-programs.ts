import type { PortfolioData } from "@/lib/portfolio-types";

type PortfolioCertification = PortfolioData["certifications"][number];

export type CertificationProgramDefinition = {
  slug: string;
  title: string;
  description: string;
  category: string;
  totalCourses: number | null;
  accentLabel: string;
};

export type CertificationProgramSummary = CertificationProgramDefinition & {
  certifications: PortfolioCertification[];
  linkedCount: number;
  latestIssuedAt: string | null;
};

const certificationProgramDefinitions: Record<string, CertificationProgramDefinition> = {
  "google-data-analytics": {
    slug: "google-data-analytics",
    title: "Google Data Analytics Certification",
    description:
      "Your Coursera Google Data Analytics journey. Each completed course certificate can live under this one track as you work through the full program.",
    category: "Data Analytics-focused",
    totalCourses: 8,
    accentLabel: "Coursera program",
  },
  "erp-focused": {
    slug: "erp-focused",
    title: "ERP-focused Certification Collection",
    description:
      "A dedicated place for your future ERP, Odoo, and business-process certifications as you build that side of your portfolio.",
    category: "ERP-focused",
    totalCourses: null,
    accentLabel: "Growing collection",
  },
  "data-analytics-general": {
    slug: "data-analytics-general",
    title: "Data Analytics Certifications",
    description:
      "A general track for analytics-related credentials that do not belong to a named certificate program.",
    category: "Data Analytics-focused",
    totalCourses: null,
    accentLabel: "General track",
  },
  "general-certifications": {
    slug: "general-certifications",
    title: "General Certifications",
    description:
      "A flexible collection for certifications that do not belong to ERP or data analytics program tracks.",
    category: "General",
    totalCourses: null,
    accentLabel: "General collection",
  },
};

export const certificationCategorySections = [
  {
    id: "Data Analytics-focused",
    title: "Data Analytics-focused Certifications",
    description:
      "Program tracks and certificate collections that strengthen your analytics, reporting, dashboarding, and data storytelling profile.",
  },
  {
    id: "ERP-focused",
    title: "ERP-focused Certifications",
    description:
      "Program tracks and collections that support your ERP path, especially around Odoo, workflows, and business systems.",
  },
  {
    id: "General",
    title: "Other Certifications",
    description:
      "Any certification track that does not fit cleanly into ERP or data analytics can still live here.",
  },
] as const;

export function getCertificationProgramDefinition(
  programSlug: string,
): CertificationProgramDefinition {
  return (
    certificationProgramDefinitions[programSlug] ??
    certificationProgramDefinitions["general-certifications"]
  );
}

export function inferCertificationProgramSlug(input: {
  title: string;
  description: string;
  issuer: string;
  category: string;
}) {
  const combined = `${input.title} ${input.description} ${input.issuer}`.toLowerCase();

  if (
    combined.includes("google data analytics") ||
    (combined.includes("coursera") && combined.includes("data analytics"))
  ) {
    return "google-data-analytics";
  }

  if (input.category === "ERP-focused") {
    return "erp-focused";
  }

  if (input.category === "Data Analytics-focused") {
    return "data-analytics-general";
  }

  return "general-certifications";
}

function compareCourseItems(a: PortfolioCertification, b: PortfolioCertification) {
  if (a.isProgramCertificate !== b.isProgramCertificate) {
    return a.isProgramCertificate ? -1 : 1;
  }

  return a.courseOrder - b.courseOrder || a.id - b.id;
}

function getLatestIssuedAt(certifications: PortfolioCertification[]) {
  return certifications.reduce<string | null>((latest, certification) => {
    if (!certification.issuedAt) {
      return latest;
    }

    if (!latest) {
      return certification.issuedAt;
    }

    return new Date(certification.issuedAt) > new Date(latest)
      ? certification.issuedAt
      : latest;
  }, null);
}

export function getCertificationPrograms(
  certifications: PortfolioCertification[],
): CertificationProgramSummary[] {
  const groupedPrograms = new Map<string, PortfolioCertification[]>();

  certifications.forEach((certification) => {
    const existing = groupedPrograms.get(certification.programSlug) ?? [];
    existing.push(certification);
    groupedPrograms.set(certification.programSlug, existing);
  });

  return [...groupedPrograms.entries()]
    .map(([programSlug, items]) => {
      const definition = getCertificationProgramDefinition(programSlug);
      const sortedItems = [...items].sort(compareCourseItems);

      return {
        ...definition,
        certifications: sortedItems,
        linkedCount: sortedItems.filter((item) => item.credentialUrl).length,
        latestIssuedAt: getLatestIssuedAt(sortedItems),
      };
    })
    .sort((a, b) => {
      const categoryOrder =
        certificationCategorySections.findIndex(
          (section) => section.id === a.category,
        ) -
        certificationCategorySections.findIndex(
          (section) => section.id === b.category,
        );

      if (categoryOrder !== 0) {
        return categoryOrder;
      }

      return a.title.localeCompare(b.title);
    });
}

export function getCertificationProgramBySlug(
  certifications: PortfolioCertification[],
  programSlug: string,
) {
  return getCertificationPrograms(certifications).find(
    (program) => program.slug === programSlug,
  );
}
