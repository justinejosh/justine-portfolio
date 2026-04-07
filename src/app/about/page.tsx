import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPortfolio } from "@/lib/get-portfolio";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
};

export default async function AboutPage() {
  const portfolio = await getPortfolio();

  const personalFacts = [
    { label: "Full name", value: portfolio.profile.fullName },
    { label: "Headline", value: portfolio.profile.headline },
    { label: "Age", value: `${portfolio.profile.age} years old` },
    { label: "School", value: portfolio.profile.school },
    { label: "Program", value: portfolio.profile.degreeProgram },
    { label: "GPA", value: portfolio.profile.gpa ?? "Ready to add" },
  ];

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <section className="glass-panel-strong overflow-hidden rounded-[38px] p-5 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="rounded-[30px] bg-[linear-gradient(180deg,#f1f7f2,#e9edff)] p-4 shadow-[0_20px_45px_rgba(4,16,71,0.12)]">
            <div className="overflow-hidden rounded-[26px] border border-white/70">
              <Image
                src={portfolio.profile.photoUrl}
                alt="Portrait of Justine Josh G. Larona"
                width={640}
                height={760}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <p className="mono-type text-xs uppercase tracking-[0.3em] text-[#008C45]">
                About page
              </p>
              <h1 className="display-type text-4xl font-semibold text-[#000080] sm:text-5xl">
                Meet Justine Josh G. Larona
              </h1>
              <p className="max-w-2xl text-sm leading-8 text-[#355469] sm:text-base">
                {portfolio.profile.bio} {portfolio.profile.summary}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {personalFacts.map((fact) => (
                <article
                  key={fact.label}
                  className="rounded-[24px] bg-white/82 p-5 shadow-[0_16px_38px_rgba(4,16,71,0.08)]"
                >
                  <p className="mono-type text-[10px] uppercase tracking-[0.28em] text-[#355469]">
                    {fact.label}
                  </p>
                  <p className="mt-3 text-lg font-semibold text-[#000080]">
                    {fact.value}
                  </p>
                </article>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#portfolio"
                className="inline-flex items-center justify-center rounded-full bg-[#000080] px-6 py-3 text-sm font-semibold !text-white transition hover:bg-[#008C45] hover:!text-white"
                style={{ color: "#ffffff" }}
              >
                Open Portfolio Sections
              </Link>
              <Link
                href="/documents"
                className="inline-flex items-center justify-center rounded-full border border-[#000080]/14 bg-white px-6 py-3 text-sm font-semibold !text-[#000080] transition hover:border-[#008C45]/40 hover:!text-[#008C45]"
                style={{ color: "#000080" }}
              >
                Jump to Documents
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="glass-panel rounded-[32px] p-6 sm:p-7">
          <p className="mono-type text-xs uppercase tracking-[0.3em] text-[#008C45]">
            Odoo focus
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-[#000080]">
            What you are learning right now
          </h2>
          <p className="mt-4 text-sm leading-8 text-[#355469] sm:text-base">
            {portfolio.profile.learningFocus}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {portfolio.profile.focusAreas.map((focus) => (
              <div
                key={focus}
                className="rounded-[22px] bg-[#000080]/6 px-4 py-4 text-sm font-semibold text-[#000080]"
              >
                {focus}
              </div>
            ))}
          </div>
        </article>

        <article className="glass-panel rounded-[32px] p-6 sm:p-7">
          <p className="mono-type text-xs uppercase tracking-[0.3em] text-[#008C45]">
            Experience snapshot
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-[#000080]">
            Current strengths
          </h2>
          <div className="mt-6 space-y-4">
            {portfolio.experiences.map((experience) => (
              <div
                key={experience.id}
                className="rounded-[24px] bg-white/82 p-5 shadow-[0_14px_32px_rgba(4,16,71,0.08)]"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-lg font-semibold text-[#000080]">
                    {experience.title}
                  </p>
                  <span className="rounded-full bg-[#008C45]/10 px-3 py-1 text-xs font-semibold text-[#008C45]">
                    {experience.category}
                  </span>
                </div>
                <p className="mt-2 text-sm font-semibold text-[#355469]">
                  {experience.organization}
                </p>
                <p className="mt-3 text-sm leading-7 text-[#355469]">
                  {experience.summary}
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="glass-panel rounded-[32px] p-6 sm:p-7">
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="mono-type text-xs uppercase tracking-[0.3em] text-[#008C45]">
              Career documents
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-[#000080]">
              Resume and CV containers
            </h2>
            <p className="mt-4 text-sm leading-8 text-[#355469] sm:text-base">
              Both document areas are already connected to the portfolio data
              model. Once you upload your files and add the links, the buttons
              on the homepage can become active immediately.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {portfolio.documents.map((document) => (
              <article
                key={document.id}
                className="rounded-[24px] bg-white/82 p-5 shadow-[0_16px_36px_rgba(4,16,71,0.08)]"
              >
                <p className="mono-type text-[10px] uppercase tracking-[0.28em] text-[#355469]">
                  {document.type}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-[#000080]">
                  {document.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#355469]">
                  {document.description}
                </p>
                <p className="mt-4 text-sm font-semibold text-[#008C45]">
                  {document.isAvailable ? "File linked" : "Awaiting final file"}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
