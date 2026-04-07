import Link from "next/link";
import type { PortfolioData } from "@/lib/portfolio-types";

type ExperienceEntry = PortfolioData["experiences"][number];
export type ExperienceFilter = "All" | "ERP" | "Data Analytics";
type ExperienceFocus = "ERP" | "Data Analytics" | "Academic";

const filters = [
  { id: "All", label: "All" },
  { id: "ERP", label: "ERP" },
  { id: "Data Analytics", label: "Data Analytics" },
] as const;

const filterCopy = {
  All: {
    heading: "Follow one timeline, then focus on the track you want to review",
    description:
      "Use the filters to focus on ERP or Data Analytics milestones while keeping your academic foundation visible in the full timeline.",
    badge: "Showing your complete journey",
  },
  ERP: {
    heading: "ERP-focused milestones in one focused view",
    description:
      "This filter narrows the timeline to the ERP side of your growth, so Odoo-related learning stands out more clearly.",
    badge: "Showing ERP-focused milestones",
  },
  "Data Analytics": {
    heading: "Data Analytics-focused milestones in one focused view",
    description:
      "This filter narrows the timeline to analytics work, so your dashboarding and reporting path is easier to review.",
    badge: "Showing Data Analytics-focused milestones",
  },
} as const;

const accentMap = {
  All: {
    buttonActiveClass:
      "border border-[#000080]/14 bg-[linear-gradient(180deg,rgba(232,236,255,0.98),rgba(220,225,255,0.92))] !text-[#000080] shadow-[0_16px_32px_rgba(0,0,128,0.1)]",
  },
  ERP: {
    buttonActiveClass:
      "border border-[#008C45]/18 bg-[linear-gradient(180deg,rgba(225,247,235,0.98),rgba(210,242,223,0.92))] !text-[#008C45] shadow-[0_16px_32px_rgba(0,140,69,0.1)]",
  },
  "Data Analytics": {
    buttonActiveClass:
      "border border-[#000080]/14 bg-[linear-gradient(180deg,rgba(232,236,255,0.98),rgba(220,225,255,0.92))] !text-[#000080] shadow-[0_16px_32px_rgba(0,0,128,0.1)]",
  },
  Academic: {
    badgeClass: "bg-[#355469]/10 text-[#355469]",
    periodClass: "border-[#355469]/18 bg-white/82 text-[#355469]",
    dotClass:
      "bg-[#355469] shadow-[0_12px_24px_rgba(53,84,105,0.16)]",
    label: "Academic foundation",
  },
} as const;

const focusStyles = {
  ERP: {
    badgeClass: "bg-[#008C45]/10 text-[#008C45]",
    periodClass: "border-[#008C45]/18 bg-[#008C45]/8 text-[#000080]",
    dotClass:
      "bg-[#008C45] shadow-[0_12px_24px_rgba(0,140,69,0.22)]",
    label: "ERP-focused",
  },
  "Data Analytics": {
    badgeClass: "bg-[#000080]/8 text-[#000080]",
    periodClass: "border-[#000080]/14 bg-[#000080]/6 text-[#000080]",
    dotClass:
      "bg-[#000080] shadow-[0_12px_24px_rgba(0,0,128,0.2)]",
    label: "Data Analytics-focused",
  },
  Academic: accentMap.Academic,
} as const;

function getExperienceFocus(experience: ExperienceEntry): ExperienceFocus {
  if (experience.category === "ERP") {
    return "ERP";
  }

  if (experience.category === "Analytics") {
    return "Data Analytics";
  }

  return "Academic";
}

export function ExperienceTimeline({
  experiences,
  activeFilter = "All",
}: {
  experiences: PortfolioData["experiences"];
  activeFilter?: ExperienceFilter;
}) {
  const erpCount = experiences.filter(
    (experience) => getExperienceFocus(experience) === "ERP",
  ).length;
  const analyticsCount = experiences.filter(
    (experience) => getExperienceFocus(experience) === "Data Analytics",
  ).length;

  const visibleExperiences =
    activeFilter === "All"
      ? experiences
      : experiences.filter(
          (experience) => getExperienceFocus(experience) === activeFilter,
        );
  const activeCopy = filterCopy[activeFilter];

  return (
    <section className="glass-panel rounded-[34px] p-6 sm:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-4">
          <p className="mono-type text-xs uppercase tracking-[0.3em] text-[#008C45]">
            Timeline view
          </p>
          <h2 className="display-type text-3xl font-semibold text-[#000080] sm:text-4xl">
            {activeCopy.heading}
          </h2>
          <p className="text-sm leading-8 text-[#355469] sm:text-base">
            {activeCopy.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id;
            const activeClass =
              filter.id === "ERP"
                ? accentMap.ERP.buttonActiveClass
                : accentMap[filter.id].buttonActiveClass;

            return (
              <Link
                key={filter.id}
                href={
                  filter.id === "All"
                    ? "/experience"
                    : `/experience?focus=${encodeURIComponent(
                        filter.id.toLowerCase().replace(/\s+/g, "-"),
                      )}`
                }
                aria-current={isActive ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? activeClass
                    : "border border-transparent bg-white/88 !text-[#000080] shadow-[0_12px_28px_rgba(4,16,71,0.08)] hover:border-[#000080]/10 hover:bg-[#000080]/4"
                }`}
                style={{
                  color: isActive
                    ? filter.id === "ERP"
                      ? "#008C45"
                      : "#000080"
                    : "#000080",
                }}
              >
                {filter.label}
                {filter.id === "All" ? ` (${experiences.length})` : null}
                {filter.id === "ERP" ? ` (${erpCount})` : null}
                {filter.id === "Data Analytics" ? ` (${analyticsCount})` : null}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-[#000080]/6 px-4 py-2 text-sm font-semibold text-[#000080]">
          {activeCopy.badge}
        </span>
        <span className="text-sm text-[#355469]">
          {visibleExperiences.length} timeline item
          {visibleExperiences.length === 1 ? "" : "s"} visible
        </span>
      </div>

      {visibleExperiences.length > 0 ? (
        <div className="mt-8 space-y-8">
          {visibleExperiences.map((experience, index) => {
            const focus = getExperienceFocus(experience);
            const styles = focusStyles[focus];
            const isFirst = index === 0;
            const isLast = index === visibleExperiences.length - 1;

            return (
              <article
                key={experience.id}
                className="grid grid-cols-[28px_1fr] gap-4 md:grid-cols-[190px_28px_1fr] md:gap-6"
              >
                <div className="hidden pt-2 md:block md:text-right">
                  <div
                    className={`inline-flex rounded-full border px-4 py-2 text-sm font-semibold shadow-[0_12px_26px_rgba(4,16,71,0.08)] ${styles.periodClass}`}
                  >
                    {experience.period}
                  </div>
                  <p className="mt-1 text-sm text-[#355469]">
                    {styles.label}
                  </p>
                </div>

                <div className="relative flex justify-center">
                  {!isFirst ? (
                    <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-[#355469]/18" />
                  ) : null}
                  {!isLast ? (
                    <span className="absolute bottom-0 left-1/2 top-7 w-px -translate-x-1/2 bg-[linear-gradient(180deg,rgba(53,84,105,0.22),rgba(0,0,128,0.08))]" />
                  ) : null}
                  <span
                    className={`relative z-10 mt-1 h-5 w-5 rounded-full border-4 border-white ${styles.dotClass}`}
                  />
                </div>

                <div className="glass-panel rounded-[32px] p-6 sm:p-7">
                  <div className="flex flex-wrap items-center gap-3 md:hidden">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${styles.periodClass}`}
                    >
                      {experience.period}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${styles.badgeClass}`}
                    >
                      {styles.label}
                    </span>
                  </div>

                  <div className="hidden flex-wrap items-center gap-2 md:flex">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${styles.badgeClass}`}
                    >
                      {styles.label}
                    </span>
                    <span className="rounded-full bg-white/82 px-3 py-1 text-xs font-semibold text-[#355469] shadow-[0_10px_22px_rgba(4,16,71,0.06)]">
                      {experience.category}
                    </span>
                  </div>

                  <h3 className="mt-3 text-2xl font-semibold text-[#000080] md:mt-4">
                    {experience.title}
                  </h3>
                  <p className="mt-2 text-sm font-semibold text-[#355469]">
                    {experience.organization}
                  </p>

                  <p className="mt-5 text-sm leading-8 text-[#355469] sm:text-base">
                    {experience.summary}
                  </p>

                  <div className="mt-6 grid gap-3 md:grid-cols-3">
                    {experience.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="rounded-[22px] bg-white/82 px-4 py-4 text-sm leading-7 text-[#355469] shadow-[0_14px_30px_rgba(4,16,71,0.06)]"
                      >
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="mt-8 rounded-[28px] border border-dashed border-[#008C45]/35 bg-[#008C45]/6 p-6 text-sm leading-7 text-[#355469]">
          No experience entries match this filter yet. Add more timeline items
          in your content file whenever you want to expand this section.
        </div>
      )}
    </section>
  );
}
