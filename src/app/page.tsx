import Image from "next/image";
import Link from "next/link";
import { InteractivePanels } from "@/components/interactive-panels";
import { getPortfolio } from "@/lib/get-portfolio";

export const dynamic = "force-dynamic";

const directionCards = [
  {
    title: "ERP Developer Path",
    description:
      "Learning how Odoo modules share records, trigger downstream actions, and support real operational workflows.",
  },
  {
    title: "Data Analyst Mindset",
    description:
      "Building dashboards and reports that turn raw data into clearer KPIs, trends, and decision-support views.",
  },
  {
    title: "Business-aware Builder",
    description:
      "Focused on software and reporting that reduce confusion, improve visibility, and support better business decisions.",
  },
];

const erpFlowSteps = [
  {
    step: "01",
    title: "Sales",
    description:
      "Capture the order clearly and understand what the customer actually needs.",
  },
  {
    step: "02",
    title: "Inventory",
    description:
      "Track stock movement and make sure product availability supports fulfillment.",
  },
  {
    step: "03",
    title: "Invoicing",
    description:
      "Turn the completed transaction into billing records that match the workflow.",
  },
  {
    step: "04",
    title: "Accounting",
    description:
      "Connect financial outputs so operations and reporting stay aligned.",
  },
];

type HomePageProps = {
  searchParams?: Promise<{
    tab?: string | string[];
    skill?: string | string[];
  }>;
};

function resolveInitialTab(
  rawTab: string | string[] | undefined,
): "skills" | "certifications" | "experience" | "documents" {
  const tab = Array.isArray(rawTab) ? rawTab[0] : rawTab;

  if (
    tab === "skills" ||
    tab === "certifications" ||
    tab === "experience" ||
    tab === "documents"
  ) {
    return tab;
  }

  return "skills";
}

function resolveInitialSkillCategory(
  rawSkill: string | string[] | undefined,
  availableCategories: string[],
) {
  const skill = Array.isArray(rawSkill) ? rawSkill[0] : rawSkill;

  if (!skill) {
    return "All";
  }

  return availableCategories.includes(skill) ? skill : "All";
}

export default async function Home({ searchParams }: HomePageProps) {
  const params = searchParams ? await searchParams : undefined;
  const portfolio = await getPortfolio();
  const initialTab = resolveInitialTab(params?.tab);
  const initialSkillCategory = resolveInitialSkillCategory(params?.skill, [
    ...new Set(portfolio.skills.map((skill) => skill.category)),
  ]);

  const spotlightStats = [
    {
      label: "Age",
      value: String(portfolio.profile.age),
    },
    {
      label: "Focus modules",
      value: String(portfolio.profile.focusAreas.length),
    },
    {
      label: "Skill cards",
      value: String(portfolio.skills.length),
    },
    {
      label: "GPA",
      value: portfolio.profile.gpa ?? "Ready",
    },
  ];

  return (
    <main className="flex flex-col gap-16 pb-16 pt-8 sm:gap-20 sm:pt-12">
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[40px] border border-white/60 bg-[linear-gradient(135deg,rgba(0,0,128,0.96),rgba(0,140,69,0.92))] px-5 py-8 text-white shadow-[0_32px_90px_rgba(4,16,71,0.22)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="grid-fade pointer-events-none absolute inset-0 opacity-25" />
          <div className="pointer-events-none absolute -left-8 top-0 h-36 w-36 rounded-full bg-white/12 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-40 rounded-full bg-[#f4efe7]/18 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-7">
              <div className="inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/92">
                {portfolio.profile.headline}
              </div>

              <div className="space-y-4">
                <h1 className="display-type max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                  Justine Josh G. Larona
                </h1>
                <p className="max-w-2xl text-base leading-8 text-white/84 sm:text-lg">
                  Aspiring ERP Developer focused on Odoo systems and data
                  analytics for business decision-making, with growing
                  experience in workflow thinking, reporting, and practical
                  problem solving.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold !text-[#000080] transition hover:bg-[#f4efe7] hover:!text-[#000080]"
                  style={{ color: "#000080" }}
                >
                  View Projects
                </Link>
                <Link
                  href="/documents"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold !text-white transition hover:border-white hover:bg-white/16 hover:!text-white"
                  style={{ color: "#ffffff" }}
                >
                  Open Resume and CV
                </Link>
              </div>

              <div className="flex flex-wrap gap-3">
                {portfolio.profile.focusAreas.map((focus) => (
                  <span
                    key={focus}
                    className="rounded-full border border-white/18 bg-white/10 px-4 py-2 text-sm font-medium text-white/86"
                  >
                    {focus}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-panel rounded-[32px] p-5 text-[#000080] sm:p-6">
              <div className="grid gap-5 sm:grid-cols-[0.95fr_1.05fr] sm:items-center">
                <div className="overflow-hidden rounded-[28px] border border-white/65 bg-[linear-gradient(160deg,#ecf5ee,#e7ecff)]">
                    <Image
                      src={portfolio.profile.photoUrl}
                      alt="Portrait of Justine Josh G. Larona"
                      width={640}
                      height={760}
                      priority
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="mono-type text-[11px] uppercase tracking-[0.28em] text-[#008C45]">
                      Current profile
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold">
                      {portfolio.profile.degreeProgram}
                    </h2>
                    <p className="mt-2 text-sm leading-7 text-[#355469]">
                      {portfolio.profile.school}
                    </p>
                  </div>

                  <p className="text-sm leading-7 text-[#355469]">
                    {portfolio.profile.summary}
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {spotlightStats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-[22px] bg-white/78 px-4 py-4 shadow-[0_14px_30px_rgba(4,16,71,0.08)]"
                      >
                        <p className="mono-type text-[10px] uppercase tracking-[0.24em] text-[#355469]">
                          {stat.label}
                        </p>
                        <p className="mt-2 text-xl font-semibold text-[#000080]">
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
        {directionCards.map((card, index) => (
          <article
            key={card.title}
            className="glass-panel rounded-[30px] p-6 transition hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(4,16,71,0.14)]"
          >
            <p className="mono-type text-xs uppercase tracking-[0.26em] text-[#008C45]">
              0{index + 1}
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-[#000080]">
              {card.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#355469]">
              {card.description}
            </p>
          </article>
        ))}
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-[34px] p-6 sm:p-8">
          <div className="max-w-3xl space-y-4">
            <p className="mono-type text-xs uppercase tracking-[0.3em] text-[#008C45]">
              ERP flow thinking
            </p>
            <h2 className="display-type text-3xl font-semibold text-[#000080] sm:text-4xl">
              How I understand Odoo business flow
            </h2>
            <p className="text-sm leading-8 text-[#355469] sm:text-base">
              One of the ways I want to stand out is by understanding how each
              business step connects to the next. This is the process view I am
              actively developing as I learn Odoo.
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-4">
            {erpFlowSteps.map((step) => (
              <article
                key={step.step}
                className="relative rounded-[28px] border border-[#000080]/10 bg-white/82 p-5 shadow-[0_16px_36px_rgba(4,16,71,0.08)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="mono-type text-xs uppercase tracking-[0.28em] text-[#008C45]">
                    Step {step.step}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-[#000080]" />
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-[#000080]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#355469]">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-[34px] p-6 sm:p-8">
          <div className="space-y-4">
              <p className="mono-type text-xs uppercase tracking-[0.3em] text-[#008C45]">
                Profile summary
              </p>
              <h2 className="display-type text-3xl font-semibold text-[#000080] sm:text-4xl">
                A portfolio grounded in what you know now and ready for what you
                learn next.
              </h2>
              <p className="max-w-4xl text-sm leading-8 text-[#355469] sm:text-base">
                {portfolio.profile.bio} {portfolio.profile.learningFocus}
              </p>
          </div>
        </div>
      </section>

      <InteractivePanels
        key={`${initialTab}-${initialSkillCategory}`}
        portfolio={portfolio}
        initialTab={initialTab}
        initialSkillCategory={initialSkillCategory}
      />
    </main>
  );
}
