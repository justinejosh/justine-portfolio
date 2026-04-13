import { portfolioContent } from "@/lib/portfolio-content";
import type { PortfolioData } from "@/lib/portfolio-types";

function resolvePhotoUrl(photoUrl: string) {
  return photoUrl === "/images/justine-placeholder.svg" ||
    photoUrl === "/images/justine-portrait.jpg" ||
    photoUrl === "/images/justine-portrait-2026.png"
    ? "/images/justine-portrait-smile-2026.png"
    : photoUrl;
}

export async function getPortfolio(): Promise<PortfolioData> {
  return {
    ...portfolioContent,
    profile: {
      ...portfolioContent.profile,
      photoUrl: resolvePhotoUrl(portfolioContent.profile.photoUrl),
    },
  };
}
