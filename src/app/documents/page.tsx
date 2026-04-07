import type { Metadata } from "next";
import Link from "next/link";
import { getPortfolio } from "@/lib/get-portfolio";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Documents",
};

export default async function DocumentsPage() {
  const portfolio = await getPortfolio();
  const readyDocuments = portfolio.documents.filter((document) => document.isAvailable);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <section className="glass-panel-strong rounded-[38px] p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <p className="mono-type text-xs uppercase tracking-[0.3em] text-[#008C45]">
              Career materials
            </p>
            <h1 className="display-type text-4xl font-semibold text-[#000080] sm:text-5xl">
              Documents, CV, resume, and academic details
            </h1>
            <p className="text-sm leading-8 text-[#355469] sm:text-base">
              This page gives your career documents their own dedicated space, so
              your CV, resume, and future files can be browsed more clearly than
              a homepage tab.
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
              href="/certifications"
              className="inline-flex items-center justify-center rounded-full border border-[#000080]/14 bg-white px-6 py-3 text-sm font-semibold text-[#000080] transition hover:border-[#008C45]/40 hover:text-[#008C45]"
              style={{ color: "#000080" }}
            >
              View Certifications
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <article className="rounded-[24px] bg-white/82 p-5 shadow-[0_16px_36px_rgba(4,16,71,0.08)]">
            <p className="mono-type text-[10px] uppercase tracking-[0.28em] text-[#355469]">
              Total files
            </p>
            <p className="mt-3 text-3xl font-semibold text-[#000080]">
              {portfolio.documents.length}
            </p>
          </article>
          <article className="rounded-[24px] bg-white/82 p-5 shadow-[0_16px_36px_rgba(4,16,71,0.08)]">
            <p className="mono-type text-[10px] uppercase tracking-[0.28em] text-[#355469]">
              Ready links
            </p>
            <p className="mt-3 text-3xl font-semibold text-[#000080]">
              {readyDocuments.length}
            </p>
          </article>
          <article className="rounded-[24px] bg-white/82 p-5 shadow-[0_16px_36px_rgba(4,16,71,0.08)]">
            <p className="mono-type text-[10px] uppercase tracking-[0.28em] text-[#355469]">
              GPA
            </p>
            <p className="mt-3 text-3xl font-semibold text-[#000080]">
              {portfolio.profile.gpa ?? "Ready"}
            </p>
          </article>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        {portfolio.documents.map((document) => (
          <article
            key={document.id}
            className="glass-panel flex h-full flex-col rounded-[32px] p-6 sm:p-7"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="mono-type text-xs uppercase tracking-[0.26em] text-[#355469]">
                {document.type}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  document.isAvailable
                    ? "bg-[#008C45]/10 text-[#008C45]"
                    : "bg-[#000080]/8 text-[#000080]"
                }`}
              >
                {document.isAvailable ? "File linked" : "Awaiting final file"}
              </span>
            </div>
            <h2 className="mt-5 text-2xl font-semibold text-[#000080]">
              {document.title}
            </h2>
            <p className="mt-4 flex-1 text-sm leading-8 text-[#355469] sm:text-base">
              {document.description}
            </p>
            {document.fileUrl && document.isAvailable ? (
              <a
                href={document.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex self-start rounded-full bg-[#000080] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#008C45]"
                style={{ color: "#ffffff" }}
              >
                {document.buttonLabel}
              </a>
            ) : (
              <p className="mt-6 text-sm font-semibold text-[#000080]/65">
                Add the file link later when this document is ready.
              </p>
            )}
          </article>
        ))}
      </section>
    </main>
  );
}
