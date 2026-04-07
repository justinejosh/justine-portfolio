import type { Metadata } from "next";
import Link from "next/link";
import { getPortfolio } from "@/lib/get-portfolio";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects",
};

const projectGroups = [
  {
    id: "ERP-focused",
    title: "ERP-focused Projects",
    description:
      "Projects that support your ERP path, especially around Odoo, workflow understanding, and business process structure.",
    accentClass: "bg-[#008C45]/10 text-[#008C45]",
    emptyMessage:
      "No ERP-focused projects added yet. Add your next Odoo or workflow project to show it here.",
  },
  {
    id: "Data Analytics-focused",
    title: "Data Analytics-focused Projects",
    description:
      "Projects that highlight dashboarding, reporting, spreadsheet analysis, and practical decision-support work.",
    accentClass: "bg-[#000080]/8 text-[#000080]",
    emptyMessage:
      "No Data Analytics-focused projects added yet. Add your next dashboard or reporting project to show it here.",
  },
] as const;

export default async function ProjectsPage() {
  const portfolio = await getPortfolio();
  const erpProjects = portfolio.projects.filter(
    (project) => project.category === "ERP-focused",
  );
  const analyticsProjects = portfolio.projects.filter(
    (project) => project.category === "Data Analytics-focused",
  );

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <section className="glass-panel-strong rounded-[38px] p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <p className="mono-type text-xs uppercase tracking-[0.3em] text-[#008C45]">
              Project portfolio
            </p>
            <h1 className="display-type text-4xl font-semibold text-[#000080] sm:text-5xl">
              ERP-focused and Data Analytics-focused projects
            </h1>
            <p className="text-sm leading-8 text-[#355469] sm:text-base">
              This page gives your projects their own space, while still
              separating the two directions you are building: ERP work and data
              analytics work.
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
              href="/experience"
              className="inline-flex items-center justify-center rounded-full border border-[#000080]/14 bg-white px-6 py-3 text-sm font-semibold text-[#000080] transition hover:border-[#008C45]/40 hover:text-[#008C45]"
              style={{ color: "#000080" }}
            >
              View Experience
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <article className="rounded-[24px] bg-white/82 p-5 shadow-[0_16px_36px_rgba(4,16,71,0.08)]">
            <p className="mono-type text-[10px] uppercase tracking-[0.28em] text-[#355469]">
              Total projects
            </p>
            <p className="mt-3 text-3xl font-semibold text-[#000080]">
              {portfolio.projects.length}
            </p>
          </article>
          <article className="rounded-[24px] bg-white/82 p-5 shadow-[0_16px_36px_rgba(4,16,71,0.08)]">
            <p className="mono-type text-[10px] uppercase tracking-[0.28em] text-[#355469]">
              ERP-focused
            </p>
            <p className="mt-3 text-3xl font-semibold text-[#000080]">
              {erpProjects.length}
            </p>
          </article>
          <article className="rounded-[24px] bg-white/82 p-5 shadow-[0_16px_36px_rgba(4,16,71,0.08)]">
            <p className="mono-type text-[10px] uppercase tracking-[0.28em] text-[#355469]">
              Data Analytics-focused
            </p>
            <p className="mt-3 text-3xl font-semibold text-[#000080]">
              {analyticsProjects.length}
            </p>
          </article>
        </div>
      </section>

      <div className="space-y-8">
        {projectGroups.map((group) => {
          const items = portfolio.projects.filter(
            (project) => project.category === group.id,
          );

          return (
            <section key={group.id} className="glass-panel rounded-[34px] p-6 sm:p-8">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl space-y-3">
                  <p className="mono-type text-xs uppercase tracking-[0.3em] text-[#008C45]">
                    {group.id}
                  </p>
                  <h2 className="text-3xl font-semibold text-[#000080]">
                    {group.title}
                  </h2>
                  <p className="text-sm leading-8 text-[#355469] sm:text-base">
                    {group.description}
                  </p>
                </div>

                <span className="rounded-full bg-[#000080]/6 px-4 py-2 text-sm font-semibold text-[#000080]">
                  {items.length} project{items.length === 1 ? "" : "s"}
                </span>
              </div>

              {items.length > 0 ? (
                <div className="mt-6 grid gap-5 lg:grid-cols-2">
                  {items.map((project) => (
                    <article
                      key={project.id}
                      className="flex h-full flex-col rounded-[32px] bg-white/82 p-6 shadow-[0_16px_36px_rgba(4,16,71,0.08)] sm:p-7"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${group.accentClass}`}
                          >
                            {project.category}
                          </span>
                          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#355469] shadow-[0_10px_22px_rgba(4,16,71,0.06)]">
                            {project.status}
                          </span>
                        </div>
                        <span className="mono-type text-xs uppercase tracking-[0.26em] text-[#355469]">
                          {project.period}
                        </span>
                      </div>

                      <div className="flex-1">
                        <h3 className="mt-5 text-2xl font-semibold text-[#000080]">
                          {project.title}
                        </h3>
                        <p className="mt-4 text-sm leading-8 text-[#355469] sm:text-base">
                          {project.summary}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-2">
                          {project.tools.map((tool) => (
                            <span
                              key={tool}
                              className="rounded-full bg-[#000080]/6 px-3 py-1 text-xs font-semibold text-[#000080]"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>

                        <div className="mt-6 grid gap-3">
                          {project.highlights.map((highlight) => (
                            <div
                              key={highlight}
                              className="rounded-[22px] bg-[#f8fbf9] px-4 py-4 text-sm leading-7 text-[#355469]"
                            >
                              {highlight}
                            </div>
                          ))}
                        </div>
                      </div>

                      {project.projectUrl ? (
                        <a
                          href={project.projectUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-6 inline-flex self-start rounded-full bg-[#000080] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#008C45]"
                          style={{ color: "#ffffff" }}
                        >
                          Open project
                        </a>
                      ) : (
                        <p className="mt-6 text-sm font-semibold text-[#000080]/65">
                          Add a live link later when this project is ready to share.
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              ) : (
                <div className="mt-6 rounded-[28px] border border-dashed border-[#008C45]/35 bg-[#008C45]/6 p-6 text-sm leading-7 text-[#355469]">
                  {group.emptyMessage}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </main>
  );
}
