import { portfolioContent } from "@/lib/portfolio-content";
import { inferCertificationProgramSlug } from "@/lib/certification-programs";
import { getPrisma } from "@/lib/prisma";
import type { PortfolioData } from "@/lib/portfolio-types";

function resolvePhotoUrl(photoUrl: string) {
  return photoUrl === "/images/justine-placeholder.svg" ||
    photoUrl === "/images/justine-portrait.jpg" ||
    photoUrl === "/images/justine-portrait-2026.png"
    ? "/images/justine-portrait-smile-2026.png"
    : photoUrl;
}

function shouldUseDatabasePortfolio() {
  return process.env.ENABLE_DATABASE_PORTFOLIO === "true";
}

function inferCertificationCategory(
  title: string,
  description: string,
  issuer: string,
) {
  const combined = `${title} ${description} ${issuer}`.toLowerCase();

  if (
    combined.includes("odoo") ||
    combined.includes("erp") ||
    combined.includes("inventory") ||
    combined.includes("accounting") ||
    combined.includes("sales") ||
    combined.includes("purchasing")
  ) {
    return "ERP-focused";
  }

  if (
    combined.includes("data") ||
    combined.includes("analytics") ||
    combined.includes("tableau") ||
    combined.includes("power bi") ||
    combined.includes("excel") ||
    combined.includes("dashboard")
  ) {
    return "Data Analytics-focused";
  }

  return "General";
}

export async function getPortfolio(): Promise<PortfolioData> {
  if (!shouldUseDatabasePortfolio()) {
    return portfolioContent;
  }

  const prisma = getPrisma();

  if (!prisma) {
    return portfolioContent;
  }

  try {
    const profile = await prisma.profile.findUnique({
      where: { slug: "justine-larona" },
      include: {
        certifications: {
          orderBy: { displayOrder: "asc" },
        },
        documents: {
          orderBy: { displayOrder: "asc" },
        },
        experiences: {
          orderBy: { displayOrder: "asc" },
          include: {
            highlights: {
              orderBy: { displayOrder: "asc" },
            },
          },
        },
        skills: {
          orderBy: { displayOrder: "asc" },
        },
      },
    });

    if (!profile) {
      return portfolioContent;
    }

    return {
      profile: {
        fullName: profile.fullName,
        preferredName: profile.preferredName,
        headline: profile.headline,
        age: profile.age,
        school: profile.school,
        degreeProgram: profile.degreeProgram,
        bio: profile.bio,
        summary: profile.summary,
        learningFocus: profile.learningFocus,
        focusAreas: profile.focusAreas,
        gpa: profile.gpa,
        photoUrl: resolvePhotoUrl(profile.photoUrl),
      },
      contact: portfolioContent.contact,
      certifications: profile.certifications.map((item, index) => {
        const category = inferCertificationCategory(
          item.title,
          item.description,
          item.issuer,
        );

        return {
          id: item.id,
          title: item.title,
          category,
          programSlug: inferCertificationProgramSlug({
            title: item.title,
            description: item.description,
            issuer: item.issuer,
            category,
          }),
          isProgramCertificate: false,
          courseLabel: null,
          courseOrder: index + 1,
          issuer: item.issuer,
          status: item.status,
          issuedAt: item.issuedAt ? item.issuedAt.toISOString() : null,
          description: item.description,
          credentialUrl: item.credentialUrl,
        };
      }),
      experiences: profile.experiences.map((item) => ({
        id: item.id,
        title: item.title,
        organization: item.organization,
        period: item.period,
        category: item.category,
        summary: item.summary,
        highlights: item.highlights.map((highlight) => highlight.text),
      })),
      projects: portfolioContent.projects,
      documents: profile.documents.map((item) => ({
        id: item.id,
        title: item.title,
        type: item.type,
        description: item.description,
        fileUrl: item.fileUrl,
        buttonLabel: item.buttonLabel,
        isAvailable: item.isAvailable,
      })),
      skills: profile.skills.map((item) => ({
        id: item.id,
        name: item.name,
        category: item.category,
        level: item.level,
        logoKey: item.logoKey,
        description: item.description,
      })),
    };
  } catch (error) {
    console.error("Falling back to local portfolio content.", error);
    return portfolioContent;
  }
}
