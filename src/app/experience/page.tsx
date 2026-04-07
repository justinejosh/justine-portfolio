import type { Metadata } from "next";
import Link from "next/link";
import {
  ExperienceTimeline,
  type ExperienceFilter,
} from "@/components/experience-timeline";
import { getPortfolio } from "@/lib/get-portfolio";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Experience",
};

type ExperiencePageProps = {
  searchParams?: Promise<{
    focus?: string | string[];
  }>;
};

function resolveExperienceFilter(
  rawFocus: string | string[] | undefined,
): ExperienceFilter {
  const focus = Array.isArray(rawFocus) ? rawFocus[0] : rawFocus;

  if (focus === "erp") {
    return "ERP";
  }

  if (focus === "data analytics" || focus === "data-analytics") {
    return "Data Analytics";
  }

  return "All";
}

export default async function ExperiencePage({
  searchParams,
}: ExperiencePageProps) {
  const params = searchParams ? await searchParams : undefined;
  const portfolio = await getPortfolio();
  const categories = [...new Set(portfolio.experiences.map((item) => item.category))];
  const initialFilter = resolveExperienceFilter(params?.focus);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <section className="glass-panel-strong rounded-[38px] p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <p className="mono-type text-xs uppercase tracking-[0.3em] text-[#008C45]">
              Learning journey
            </p>
            <h1 className="display-type text-4xl font-semibold text-[#000080] sm:text-5xl">
              Experience and development timeline
            </h1>
            <p className="text-sm leading-8 text-[#355469] sm:text-base">
              This page gives your academic background, Odoo learning, and
              analytics practice a clearer story, with space for highlights and
              future internships or projects.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-[#000080] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#008C45]"
              style={{ color: "#ffffff" }}
            >
              Back to Home
            </Link>
            <Link
              href="/documents"
              className="inline-flex items-center justify-center rounded-full border border-[#000080]/14 bg-white px-6 py-3 text-sm font-semibold text-[#000080] transition hover:border-[#008C45]/40 hover:text-[#008C45]"
              style={{ color: "#000080" }}
            >
              View Documents
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <article className="rounded-[24px] bg-white/82 p-5 shadow-[0_16px_36px_rgba(4,16,71,0.08)]">
            <p className="mono-type text-[10px] uppercase tracking-[0.28em] text-[#355469]">
              Total entries
            </p>
            <p className="mt-3 text-3xl font-semibold text-[#000080]">
              {portfolio.experiences.length}
            </p>
          </article>
          <article className="rounded-[24px] bg-white/82 p-5 shadow-[0_16px_36px_rgba(4,16,71,0.08)]">
            <p className="mono-type text-[10px] uppercase tracking-[0.28em] text-[#355469]">
              Categories
            </p>
            <p className="mt-3 text-3xl font-semibold text-[#000080]">
              {categories.length}
            </p>
          </article>
          <article className="rounded-[24px] bg-white/82 p-5 shadow-[0_16px_36px_rgba(4,16,71,0.08)]">
            <p className="mono-type text-[10px] uppercase tracking-[0.28em] text-[#355469]">
              Current direction
            </p>
            <p className="mt-3 text-lg font-semibold text-[#000080]">
              ERP Systems and Data Analytics
            </p>
          </article>
        </div>
      </section>

      <ExperienceTimeline
        key={initialFilter}
        experiences={portfolio.experiences}
        activeFilter={initialFilter}
      />
    </main>
  );
}
