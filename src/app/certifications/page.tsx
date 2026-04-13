import type { Metadata } from "next";
import Link from "next/link";
import {
  certificationCategorySections,
  getCertificationPrograms,
} from "@/lib/certification-programs";
import { getPortfolio } from "@/lib/get-portfolio";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Certifications",
};

function formatIssuedAt(value: string | null) {
  if (!value) {
    return "Newest certificate pending";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default async function CertificationsPage() {
  const portfolio = await getPortfolio();
  const programs = getCertificationPrograms(portfolio.certifications);
  const linkedCertificates = portfolio.certifications.filter(
    (item) => item.credentialUrl,
  );
  const analyticsPrograms = programs.filter(
    (program) => program.category === "Data Analytics-focused",
  );
  const erpPrograms = programs.filter((program) => program.category === "ERP-focused");

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <section className="glass-panel-strong rounded-[38px] p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <p className="mono-type text-xs uppercase tracking-[0.3em] text-[#008C45]">
              Proof of growth
            </p>
            <h1 className="display-type text-4xl font-semibold text-[#000080] sm:text-5xl">
              Certification tracks and credential collections
            </h1>
            <p className="text-sm leading-8 text-[#355469] sm:text-base">
              This page now works like a program overview. Instead of showing
              every certificate immediately, it shows the certification tracks
              you are building and the momentum inside each one.
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
              href="/about"
              className="inline-flex items-center justify-center rounded-full border border-[#000080]/14 bg-white px-6 py-3 text-sm font-semibold text-[#000080] transition hover:border-[#008C45]/40 hover:text-[#008C45]"
              style={{ color: "#000080" }}
            >
              About Page
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-[24px] bg-white/82 p-5 shadow-[0_16px_36px_rgba(4,16,71,0.08)]">
            <p className="mono-type text-[10px] uppercase tracking-[0.28em] text-[#355469]">
              Program tracks
            </p>
            <p className="mt-3 text-3xl font-semibold text-[#000080]">
              {programs.length}
            </p>
          </article>
          <article className="rounded-[24px] bg-white/82 p-5 shadow-[0_16px_36px_rgba(4,16,71,0.08)]">
            <p className="mono-type text-[10px] uppercase tracking-[0.28em] text-[#355469]">
              Total certificates
            </p>
            <p className="mt-3 text-3xl font-semibold text-[#000080]">
              {portfolio.certifications.length}
            </p>
          </article>
          <article className="rounded-[24px] bg-white/82 p-5 shadow-[0_16px_36px_rgba(4,16,71,0.08)]">
            <p className="mono-type text-[10px] uppercase tracking-[0.28em] text-[#355469]">
              Linked credentials
            </p>
            <p className="mt-3 text-3xl font-semibold text-[#000080]">
              {linkedCertificates.length}
            </p>
          </article>
          <article className="rounded-[24px] bg-white/82 p-5 shadow-[0_16px_36px_rgba(4,16,71,0.08)]">
            <p className="mono-type text-[10px] uppercase tracking-[0.28em] text-[#355469]">
              Active categories
            </p>
            <p className="mt-3 text-3xl font-semibold text-[#000080]">
              {[analyticsPrograms.length > 0, erpPrograms.length > 0].filter(Boolean)
                .length || (programs.length > 0 ? 1 : 0)}
            </p>
          </article>
        </div>
      </section>

      <div className="space-y-8">
        {certificationCategorySections.map((section) => {
          const items = programs.filter((program) => program.category === section.id);

          if (section.id === "General" && items.length === 0) {
            return null;
          }

          return (
            <section key={section.id} className="glass-panel rounded-[34px] p-6 sm:p-8">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl space-y-3">
                  <p className="mono-type text-xs uppercase tracking-[0.3em] text-[#008C45]">
                    {section.id}
                  </p>
                  <h2 className="text-3xl font-semibold text-[#000080]">
                    {section.title}
                  </h2>
                  <p className="text-sm leading-8 text-[#355469] sm:text-base">
                    {section.description}
                  </p>
                </div>

                <span className="rounded-full bg-[#000080]/6 px-4 py-2 text-sm font-semibold text-[#000080]">
                  {items.length} track{items.length === 1 ? "" : "s"}
                </span>
              </div>

              {items.length > 0 ? (
                <div className="mt-6 grid gap-5 lg:grid-cols-2">
                  {items.map((program) => {
                    return (
                      <Link
                        key={program.slug}
                        href={`/certifications/${program.slug}`}
                        className="group rounded-[32px] bg-white/82 p-6 shadow-[0_16px_36px_rgba(4,16,71,0.08)] transition hover:-translate-y-1 hover:shadow-[0_22px_44px_rgba(0,140,69,0.16)] sm:p-7"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-[#008C45]/10 px-3 py-1 text-xs font-semibold text-[#008C45]">
                              {program.accentLabel}
                            </span>
                            <span className="rounded-full bg-[#000080]/6 px-3 py-1 text-xs font-semibold text-[#000080]">
                              {program.category}
                            </span>
                            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#355469] shadow-[0_10px_22px_rgba(4,16,71,0.06)]">
                              {program.statusLabel}
                            </span>
                          </div>
                          <span className="mono-type text-xs uppercase tracking-[0.26em] text-[#355469]">
                            {formatIssuedAt(program.latestIssuedAt)}
                          </span>
                        </div>

                        <h3 className="mt-5 text-2xl font-semibold text-[#000080]">
                          {program.title}
                        </h3>
                        <p className="mt-4 text-sm leading-7 text-[#355469]">
                          {program.description}
                        </p>

                        {program.progressLabel ? (
                          <div className="mt-6 space-y-3">
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-sm font-semibold text-[#000080]">
                                {program.progressLabel}
                              </span>
                              {program.totalExpectedCount ? (
                                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#355469]">
                                  {program.statusLabel}
                                </span>
                              ) : null}
                            </div>

                            {program.progressPercent !== null ? (
                              <div className="h-2 overflow-hidden rounded-full bg-[#000080]/8">
                                <div
                                  className="h-full rounded-full bg-[linear-gradient(90deg,#008C45,#000080)]"
                                  style={{ width: `${program.progressPercent}%` }}
                                />
                              </div>
                            ) : null}
                          </div>
                        ) : null}

                        <div className="mt-6 flex items-center justify-end">
                          <span className="inline-flex rounded-full bg-[#000080] px-5 py-3 text-sm font-semibold text-white transition group-hover:bg-[#008C45]">
                            Open track
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-6 rounded-[28px] border border-dashed border-[#008C45]/35 bg-[#008C45]/6 p-6 text-sm leading-7 text-[#355469]">
                  No {section.id.toLowerCase()} certification tracks added yet. As
                  soon as you add one, it will appear in this section.
                </div>
              )}
            </section>
          );
        })}
      </div>
    </main>
  );
}
