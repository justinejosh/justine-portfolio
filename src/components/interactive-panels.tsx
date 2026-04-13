"use client";

import Link from "next/link";
import { startTransition, useDeferredValue, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { fallbackSkillIcon, skillIconMap } from "@/lib/skill-icons";
import type { PortfolioData } from "@/lib/portfolio-types";

type TabId =
  | "skills"
  | "certifications"
  | "experience"
  | "projects"
  | "documents";

const tabs: Array<{ id: TabId; label: string; eyebrow: string; href?: string }> = [
  { id: "skills", label: "Skills", eyebrow: "What I use" },
  {
    id: "certifications",
    label: "Certifications",
    eyebrow: "Proof of growth",
    href: "/certifications",
  },
  {
    id: "experience",
    label: "Experience",
    eyebrow: "Learning journey",
    href: "/experience",
  },
  {
    id: "projects",
    label: "Projects",
    eyebrow: "Built work",
    href: "/projects",
  },
  {
    id: "documents",
    label: "Documents",
    eyebrow: "Career materials",
    href: "/documents",
  },
];

function formatIssuedAt(value: string | null) {
  if (!value) {
    return "Date ready to add";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function InteractivePanels({
  portfolio,
  initialTab = "skills",
  initialSkillCategory = "All",
}: {
  portfolio: PortfolioData;
  initialTab?: TabId;
  initialSkillCategory?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<TabId>(initialTab);
  const [skillCategory, setSkillCategory] = useState(initialSkillCategory);
  const [certificationSearch, setCertificationSearch] = useState("");
  const [certificationStatus, setCertificationStatus] = useState("All");
  const [experienceCategory, setExperienceCategory] = useState("All");
  const [selectedExperienceId, setSelectedExperienceId] = useState(
    portfolio.experiences[0]?.id ?? 0,
  );
  const [selectedDocumentId, setSelectedDocumentId] = useState(
    portfolio.documents[0]?.id ?? 0,
  );

  const deferredSearch = useDeferredValue(
    certificationSearch.trim().toLowerCase(),
  );

  const skillCategories = [
    "All",
    ...new Set(portfolio.skills.map((skill) => skill.category)),
  ];

  const visibleSkills = portfolio.skills.filter(
    (skill) => skillCategory === "All" || skill.category === skillCategory,
  );

  const certificationStatuses = [
    "All",
    ...new Set(portfolio.certifications.map((certification) => certification.status)),
  ];

  const visibleCertifications = portfolio.certifications.filter((certification) =>
    [certification.title, certification.issuer, certification.status, certification.description]
      .join(" ")
      .toLowerCase()
      .includes(deferredSearch) &&
    (certificationStatus === "All" || certification.status === certificationStatus),
  );

  const experienceCategories = [
    "All",
    ...new Set(portfolio.experiences.map((experience) => experience.category)),
  ];

  const visibleExperiences = portfolio.experiences.filter(
    (experience) =>
      experienceCategory === "All" || experience.category === experienceCategory,
  );

  const selectedExperience =
    visibleExperiences.find((experience) => experience.id === selectedExperienceId) ??
    visibleExperiences[0] ??
    null;

  const selectedDocument =
    portfolio.documents.find((document) => document.id === selectedDocumentId) ??
    portfolio.documents[0] ??
    null;

  const readyDocuments = portfolio.documents.filter((document) => document.isAvailable);
  const pendingDocuments = portfolio.documents.length - readyDocuments.length;

  function navigateToTab(tab: TabId) {
    const hash = tab === "documents" ? "documents" : "portfolio";
    const href =
      tab === "skills"
        ? `${pathname}#${hash}`
        : `${pathname}?tab=${tab}#${hash}`;

    router.replace(href);
  }

  function getSkillCategoryHref(category: string) {
    const params = new URLSearchParams();
    params.set("tab", "skills");

    if (category !== "All") {
      params.set("skill", category);
    }

    return `${pathname}?${params.toString()}#portfolio`;
  }

  return (
    <section
      id="portfolio"
      className="mx-auto w-full max-w-7xl scroll-mt-28 px-4 sm:px-6 lg:px-8"
    >
      <div className="glass-panel-strong rounded-[36px] p-5 sm:p-8">
        <div className="flex flex-col gap-6 border-b border-[#000080]/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="mono-type text-xs font-semibold uppercase tracking-[0.32em] text-[#008C45]">
              Dynamic portfolio board
            </p>
            <h2 className="display-type text-3xl font-semibold text-[#000080] sm:text-4xl">
              Explore the parts of your portfolio that can keep growing.
            </h2>
            <p className="max-w-xl text-sm leading-7 text-[#355469] sm:text-base">
              This panel reads directly from your local portfolio content file,
              so your certifications, experience entries, projects, skill
              cards, GPA, CV, and resume links can evolve without redesigning
              the whole site.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const sharedClassName = `rounded-[24px] border px-4 py-4 text-left transition ${
                isActive
                  ? "border-[#008C45] bg-[#008C45] text-white shadow-[0_18px_40px_rgba(0,140,69,0.28)]"
                  : "border-[#000080]/12 bg-white/72 text-[#000080] hover:border-[#008C45]/40 hover:text-[#008C45]"
              }`;
              const content = (
                <>
                  <span className="mono-type block text-[10px] uppercase tracking-[0.28em] opacity-75">
                    {tab.eyebrow}
                  </span>
                  <span className="mt-1 block text-base font-semibold">
                    {tab.label}
                  </span>
                  {tab.href ? (
                    <span className="mt-3 inline-block text-xs font-semibold opacity-75">
                      Open page
                    </span>
                  ) : null}
                </>
              );

              if (tab.href) {
                return (
                  <Link
                    key={tab.id}
                    href={tab.href}
                    className={sharedClassName}
                  >
                    {content}
                  </Link>
                );
              }

              return (
                <button
                  key={tab.id}
                  type="button"
                  className={sharedClassName}
                  onClick={() => {
                    startTransition(() => {
                      setActiveTab(tab.id);
                      navigateToTab(tab.id);
                    });
                  }}
                >
                  {content}
                </button>
              );
            })}
          </div>
        </div>

        {activeTab === "skills" ? (
          <div className="space-y-6 pt-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-[#000080]">
                  Languages, platforms, and analytics tools
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-[#355469]">
                  Odoo fits naturally here, and so do Tableau, Power BI, Excel,
                  and spreadsheet tools. They are grouped as platforms and
                  analytics tools rather than being treated as programming
                  languages.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {skillCategories.map((category) => (
                  <Link
                    key={category}
                    href={getSkillCategoryHref(category)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      skillCategory === category
                        ? "bg-[#000080] text-white"
                        : "bg-[#000080]/6 text-[#000080] hover:bg-[#008C45]/12 hover:text-[#008C45]"
                    }`}
                    onClick={() => {
                      startTransition(() => setSkillCategory(category));
                    }}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {visibleSkills.map((skill) => {
                const Icon = skillIconMap[skill.logoKey] ?? fallbackSkillIcon;

                return (
                  <article
                    key={skill.id}
                    className="group rounded-[28px] border border-[#000080]/10 bg-white/80 p-5 shadow-[0_16px_40px_rgba(4,16,71,0.08)] transition hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(0,140,69,0.18)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#000080] text-2xl text-white shadow-[0_16px_32px_rgba(0,0,128,0.18)]">
                        <Icon />
                      </div>
                      <span className="rounded-full bg-[#008C45]/10 px-3 py-1 text-xs font-semibold text-[#008C45]">
                        {skill.level}
                      </span>
                    </div>
                    <div className="mt-5 space-y-2">
                      <p className="mono-type text-[11px] uppercase tracking-[0.26em] text-[#355469]">
                        {skill.category}
                      </p>
                      <h4 className="text-xl font-semibold text-[#000080]">
                        {skill.name}
                      </h4>
                      <p className="text-sm leading-7 text-[#355469]">
                        {skill.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ) : null}

        {activeTab === "certifications" ? (
          <div className="space-y-6 pt-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-[#000080]">
                  Certification container
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-[#355469]">
                  This section is ready for online certificates, bootcamps, and
                  training credentials as you collect them.
                </p>
              </div>

              <label className="flex w-full max-w-md items-center gap-3 rounded-full border border-[#000080]/10 bg-white px-4 py-3 text-sm text-[#355469] shadow-[0_12px_30px_rgba(4,16,71,0.06)]">
                <span className="mono-type text-xs uppercase tracking-[0.24em] text-[#008C45]">
                  Search
                </span>
                <input
                  value={certificationSearch}
                  onChange={(event) => setCertificationSearch(event.target.value)}
                  placeholder="Find a certificate or provider"
                  className="w-full bg-transparent text-sm text-[#000080] outline-none placeholder:text-[#355469]/70"
                />
              </label>
            </div>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[22px] bg-[#000080]/5 px-4 py-4">
                  <p className="mono-type text-[10px] uppercase tracking-[0.24em] text-[#355469]">
                    Total cards
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-[#000080]">
                    {portfolio.certifications.length}
                  </p>
                </div>
                <div className="rounded-[22px] bg-[#008C45]/8 px-4 py-4">
                  <p className="mono-type text-[10px] uppercase tracking-[0.24em] text-[#008C45]">
                    Visible now
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-[#000080]">
                    {visibleCertifications.length}
                  </p>
                </div>
                <div className="rounded-[22px] bg-white/82 px-4 py-4 shadow-[0_14px_30px_rgba(4,16,71,0.08)]">
                  <p className="mono-type text-[10px] uppercase tracking-[0.24em] text-[#355469]">
                    Search mode
                  </p>
                  <p className="mt-2 text-base font-semibold text-[#000080]">
                    {deferredSearch ? "Filtered" : "Showing all"}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {certificationStatuses.map((status) => (
                  <button
                    key={status}
                    type="button"
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      certificationStatus === status
                        ? "bg-[#000080] text-white"
                        : "bg-[#000080]/6 text-[#000080] hover:bg-[#008C45]/12 hover:text-[#008C45]"
                    }`}
                    onClick={() => {
                      startTransition(() => setCertificationStatus(status));
                    }}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {visibleCertifications.length > 0 ? (
                visibleCertifications.map((certification) => (
                  <article
                    key={certification.id}
                    className="rounded-[28px] border border-[#000080]/10 bg-white/82 p-6 shadow-[0_16px_40px_rgba(4,16,71,0.08)]"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="rounded-full bg-[#008C45]/10 px-3 py-1 text-xs font-semibold text-[#008C45]">
                        {certification.status}
                      </span>
                      <span className="mono-type text-xs uppercase tracking-[0.24em] text-[#355469]">
                        {formatIssuedAt(certification.issuedAt)}
                      </span>
                    </div>
                    <h4 className="mt-5 text-2xl font-semibold text-[#000080]">
                      {certification.title}
                    </h4>
                    <p className="mt-2 text-sm font-semibold text-[#008C45]">
                      {certification.issuer}
                    </p>
                    <p className="mt-4 text-sm leading-7 text-[#355469]">
                      {certification.description}
                    </p>
                    {certification.credentialUrl ? (
                      <a
                        href={certification.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-6 inline-flex rounded-full bg-[#000080] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#008C45]"
                      >
                        View credential
                      </a>
                    ) : (
                      <p className="mt-6 text-sm font-semibold text-[#000080]/65">
                        Add a credential URL later when the certificate is ready.
                      </p>
                    )}
                  </article>
                ))
              ) : (
                <div className="rounded-[28px] border border-dashed border-[#008C45]/40 bg-[#008C45]/6 p-6 text-sm leading-7 text-[#355469]">
                  No certifications match your search yet. This board is ready
                  as soon as you add your next online certificate.
                </div>
              )}
            </div>
          </div>
        ) : null}

        {activeTab === "experience" ? (
          <div className="space-y-6 pt-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-[#000080]">
                  Experience and learning timeline
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-[#355469]">
                  Because you are still growing professionally, this timeline
                  highlights academic, self-directed, and tool-based experience
                  truthfully.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {experienceCategories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      experienceCategory === category
                        ? "bg-[#000080] text-white"
                        : "bg-[#000080]/6 text-[#000080] hover:bg-[#008C45]/12 hover:text-[#008C45]"
                    }`}
                    onClick={() => {
                      startTransition(() => {
                        setExperienceCategory(category);
                        const firstVisible = portfolio.experiences.find(
                          (experience) =>
                            category === "All" || experience.category === category,
                        );
                        if (firstVisible) {
                          setSelectedExperienceId(firstVisible.id);
                        }
                      });
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
              <div className="space-y-3">
                {visibleExperiences.map((experience) => {
                  const isSelected = selectedExperience?.id === experience.id;

                  return (
                    <button
                      key={experience.id}
                      type="button"
                      className={`w-full rounded-[24px] border px-5 py-5 text-left transition ${
                        isSelected
                          ? "border-[#008C45] bg-[#008C45] text-white shadow-[0_18px_40px_rgba(0,140,69,0.24)]"
                          : "border-[#000080]/10 bg-white/82 text-[#000080] shadow-[0_14px_34px_rgba(4,16,71,0.08)] hover:border-[#008C45]/35 hover:text-[#008C45]"
                      }`}
                      onClick={() => {
                        startTransition(() =>
                          setSelectedExperienceId(experience.id),
                        );
                      }}
                    >
                      <span className="mono-type block text-[10px] uppercase tracking-[0.26em] opacity-75">
                        {experience.period}
                      </span>
                      <span className="mt-2 block text-lg font-semibold">
                        {experience.title}
                      </span>
                      <span className="mt-2 block text-sm opacity-85">
                        {experience.organization}
                      </span>
                    </button>
                  );
                })}
              </div>

              {selectedExperience ? (
                <article className="rounded-[28px] border border-[#000080]/10 bg-white/82 p-6 shadow-[0_16px_40px_rgba(4,16,71,0.08)]">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <span className="rounded-full bg-[#000080]/8 px-3 py-1 text-xs font-semibold text-[#000080]">
                        {selectedExperience.category}
                      </span>
                      <h4 className="mt-4 text-2xl font-semibold text-[#000080]">
                        {selectedExperience.title}
                      </h4>
                      <p className="mt-2 text-sm font-semibold text-[#008C45]">
                        {selectedExperience.organization}
                      </p>
                    </div>
                    <p className="mono-type text-xs uppercase tracking-[0.26em] text-[#355469]">
                      {selectedExperience.period}
                    </p>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-[#355469]">
                    {selectedExperience.summary}
                  </p>

                  <div className="mt-5 grid gap-3 md:grid-cols-3">
                    {selectedExperience.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="rounded-[22px] bg-[#000080]/5 px-4 py-4 text-sm leading-7 text-[#355469]"
                      >
                        {highlight}
                      </div>
                    ))}
                  </div>
                </article>
              ) : (
                <div className="rounded-[28px] border border-dashed border-[#008C45]/40 bg-[#008C45]/6 p-6 text-sm leading-7 text-[#355469]">
                  No experience cards match the current filter yet.
                </div>
              )}
            </div>
          </div>
        ) : null}

        {activeTab === "documents" ? (
          <div id="documents" className="scroll-mt-28 space-y-6 pt-8">
            <div>
              <h3 className="text-2xl font-semibold text-[#000080]">
                Curriculum vitae, resume, and GPA space
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-[#355469]">
                These cards are ready for real file links and updated academic
                details whenever you want to publish them.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-[22px] bg-[#000080]/5 px-4 py-4">
                <p className="mono-type text-[10px] uppercase tracking-[0.24em] text-[#355469]">
                  Total files
                </p>
                <p className="mt-2 text-2xl font-semibold text-[#000080]">
                  {portfolio.documents.length}
                </p>
              </div>
              <div className="rounded-[22px] bg-[#008C45]/8 px-4 py-4">
                <p className="mono-type text-[10px] uppercase tracking-[0.24em] text-[#008C45]">
                  Ready links
                </p>
                <p className="mt-2 text-2xl font-semibold text-[#000080]">
                  {readyDocuments.length}
                </p>
              </div>
              <div className="rounded-[22px] bg-white/82 px-4 py-4 shadow-[0_14px_30px_rgba(4,16,71,0.08)]">
                <p className="mono-type text-[10px] uppercase tracking-[0.24em] text-[#355469]">
                  Pending files
                </p>
                <p className="mt-2 text-2xl font-semibold text-[#000080]">
                  {pendingDocuments}
                </p>
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr_0.6fr]">
              <div className="space-y-3">
                {portfolio.documents.map((document) => {
                  const isSelected = selectedDocument?.id === document.id;

                  return (
                    <button
                      key={document.id}
                      type="button"
                      className={`w-full rounded-[24px] border px-5 py-5 text-left transition ${
                        isSelected
                          ? "border-[#008C45] bg-[#008C45] text-white shadow-[0_18px_40px_rgba(0,140,69,0.24)]"
                          : "border-[#000080]/10 bg-white/82 text-[#000080] shadow-[0_14px_34px_rgba(4,16,71,0.08)] hover:border-[#008C45]/35 hover:text-[#008C45]"
                      }`}
                      onClick={() => {
                        startTransition(() =>
                          setSelectedDocumentId(document.id),
                        );
                      }}
                    >
                      <span className="mono-type block text-[10px] uppercase tracking-[0.26em] opacity-75">
                        {document.type}
                      </span>
                      <span className="mt-2 block text-lg font-semibold">
                        {document.title}
                      </span>
                      <span className="mt-2 block text-sm opacity-85">
                        {document.isAvailable ? "File ready" : "Waiting for file"}
                      </span>
                    </button>
                  );
                })}
              </div>

              {selectedDocument ? (
                <article className="rounded-[28px] border border-[#000080]/10 bg-white/82 p-6 shadow-[0_16px_40px_rgba(4,16,71,0.08)]">
                  <div className="flex items-center justify-between gap-3">
                    <span className="mono-type text-xs uppercase tracking-[0.26em] text-[#355469]">
                      {selectedDocument.type}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        selectedDocument.isAvailable
                          ? "bg-[#008C45]/10 text-[#008C45]"
                          : "bg-[#000080]/8 text-[#000080]"
                      }`}
                    >
                      {selectedDocument.isAvailable ? "Linked" : "Waiting for file"}
                    </span>
                  </div>
                  <h4 className="mt-5 text-2xl font-semibold text-[#000080]">
                    {selectedDocument.title}
                  </h4>
                  <p className="mt-4 text-sm leading-7 text-[#355469]">
                    {selectedDocument.description}
                  </p>
                  {selectedDocument.fileUrl && selectedDocument.isAvailable ? (
                    <a
                      href={selectedDocument.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-flex rounded-full bg-[#000080] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#008C45]"
                    >
                      {selectedDocument.buttonLabel}
                    </a>
                  ) : (
                    <div className="mt-6 rounded-[22px] bg-[#000080]/5 px-4 py-4 text-sm leading-7 text-[#355469]">
                      Add a real file URL inside your portfolio content file to
                      activate this button later.
                    </div>
                  )}
                </article>
              ) : (
                <div className="rounded-[28px] border border-dashed border-[#008C45]/40 bg-[#008C45]/6 p-6 text-sm leading-7 text-[#355469]">
                  No document cards are available right now.
                </div>
              )}

              <aside className="rounded-[28px] border border-[#008C45]/16 bg-[#008C45]/8 p-6 shadow-[0_16px_40px_rgba(0,140,69,0.12)]">
                <p className="mono-type text-xs uppercase tracking-[0.3em] text-[#008C45]">
                  Academic highlight
                </p>
                <h4 className="mt-4 text-3xl font-semibold text-[#000080]">
                  {portfolio.profile.gpa ?? "Add your GPA here"}
                </h4>
                <p className="mt-4 text-sm leading-7 text-[#355469]">
                  The GPA block is already part of your content model, so you
                  can display it anytime without changing the page design.
                </p>
                <div className="mt-5 rounded-[22px] bg-white/76 px-4 py-4 text-sm leading-7 text-[#355469]">
                  Tip: once you upload your resume or CV, set `isAvailable` to
                  `true` and add the `fileUrl` in your content file.
                </div>
              </aside>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
