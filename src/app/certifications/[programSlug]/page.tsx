import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCertificationProgramBySlug,
  getCertificationProgramDefinition,
} from "@/lib/certification-programs";
import { getPortfolio } from "@/lib/get-portfolio";

export const dynamic = "force-dynamic";

type CertificationProgramPageProps = {
  params: Promise<{
    programSlug: string;
  }>;
};

function formatIssuedAt(value: string | null) {
  if (!value) {
    return "Date ready to add";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export async function generateMetadata({
  params,
}: CertificationProgramPageProps): Promise<Metadata> {
  const { programSlug } = await params;
  const definition = getCertificationProgramDefinition(programSlug);

  return {
    title: definition.title,
  };
}

export default async function CertificationProgramPage({
  params,
}: CertificationProgramPageProps) {
  const { programSlug } = await params;
  const portfolio = await getPortfolio();
  const program = getCertificationProgramBySlug(portfolio.certifications, programSlug);

  if (!program) {
    notFound();
  }

  const programCertificate =
    program.certifications.find((certification) => certification.isProgramCertificate) ??
    null;
  const subCertificates = program.certifications.filter(
    (certification) => !certification.isProgramCertificate,
  );

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <section className="glass-panel-strong rounded-[38px] p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <p className="mono-type text-xs uppercase tracking-[0.3em] text-[#008C45]">
              {program.category}
            </p>
            <h1 className="display-type text-4xl font-semibold text-[#000080] sm:text-5xl">
              {program.title}
            </h1>
            <p className="text-sm leading-8 text-[#355469] sm:text-base">
              {program.description}
            </p>

            {program.progressLabel ? (
              <div className="mt-5 max-w-2xl rounded-[24px] bg-white/82 p-4 shadow-[0_16px_36px_rgba(4,16,71,0.08)]">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#008C45]/10 px-3 py-1 text-xs font-semibold text-[#008C45]">
                    {program.statusLabel}
                  </span>
                  <span className="rounded-full bg-[#000080]/6 px-3 py-1 text-xs font-semibold text-[#000080]">
                    {program.progressLabel}
                  </span>
                </div>

                {program.progressPercent !== null ? (
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#000080]/8">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,#008C45,#000080)]"
                      style={{ width: `${program.progressPercent}%` }}
                    />
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/certifications"
              className="inline-flex items-center justify-center rounded-full bg-[#000080] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#008C45]"
              style={{ color: "#ffffff" }}
            >
              Back to Certifications
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-[#000080]/14 bg-white px-6 py-3 text-sm font-semibold text-[#000080] transition hover:border-[#008C45]/40 hover:text-[#008C45]"
              style={{ color: "#000080" }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {programCertificate ? (
        <section className="glass-panel rounded-[34px] p-6 sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <p className="mono-type text-xs uppercase tracking-[0.3em] text-[#008C45]">
                Top certificate
              </p>
              <h2 className="text-3xl font-semibold text-[#000080]">
                {program.title}
              </h2>
              <p className="text-sm leading-8 text-[#355469] sm:text-base">
                Keep your overall program certificate here once you finish the
                full certification track.
              </p>
            </div>
          </div>

          <article className="mt-6 flex h-full flex-col rounded-[32px] bg-white/82 p-6 shadow-[0_16px_36px_rgba(4,16,71,0.08)] sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#008C45]/10 px-3 py-1 text-xs font-semibold text-[#008C45]">
                  {programCertificate.status}
                </span>
                <span className="rounded-full bg-[#000080]/6 px-3 py-1 text-xs font-semibold text-[#000080]">
                  Program certificate
                </span>
              </div>
              <span className="mono-type text-xs uppercase tracking-[0.26em] text-[#355469]">
                {formatIssuedAt(programCertificate.issuedAt)}
              </span>
            </div>
            <h3 className="mt-5 text-2xl font-semibold text-[#000080]">
              {programCertificate.title}
            </h3>
            <p className="mt-2 text-sm font-semibold text-[#008C45]">
              {programCertificate.issuer}
            </p>
            <p className="mt-4 flex-1 text-sm leading-7 text-[#355469]">
              {programCertificate.description}
            </p>
            {programCertificate.credentialUrl ? (
              <a
                href={programCertificate.credentialUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex self-start rounded-full bg-[#000080] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#008C45]"
                style={{ color: "#ffffff" }}
              >
                View program certificate
              </a>
            ) : (
              <p className="mt-6 text-sm font-semibold text-[#000080]/65">
                Add the final overall certificate link here when you finish the full
                program.
              </p>
            )}
          </article>
        </section>
      ) : null}

      <section className="glass-panel rounded-[34px] p-6 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <p className="mono-type text-xs uppercase tracking-[0.3em] text-[#008C45]">
              Sub-certifications
            </p>
            <h2 className="text-3xl font-semibold text-[#000080]">
              Certificates inside {program.title}
            </h2>
            <p className="text-sm leading-8 text-[#355469] sm:text-base">
              These are the course-by-course certificates that sit underneath the
              main certification track.
            </p>
          </div>

          <span className="rounded-full bg-[#000080]/6 px-4 py-2 text-sm font-semibold text-[#000080]">
            {subCertificates.length} certificate
            {subCertificates.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {subCertificates.map((certification) => (
            <article
              key={certification.id}
              className="flex h-full flex-col rounded-[32px] bg-white/82 p-6 shadow-[0_16px_36px_rgba(4,16,71,0.08)] sm:p-7"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#008C45]/10 px-3 py-1 text-xs font-semibold text-[#008C45]">
                    {certification.status}
                  </span>
                  {certification.courseLabel ? (
                    <span className="rounded-full bg-[#000080]/6 px-3 py-1 text-xs font-semibold text-[#000080]">
                      {certification.courseLabel}
                    </span>
                  ) : null}
                </div>
                <span className="mono-type text-xs uppercase tracking-[0.26em] text-[#355469]">
                  {formatIssuedAt(certification.issuedAt)}
                </span>
              </div>
              <h3 className="mt-5 text-2xl font-semibold text-[#000080]">
                {certification.title}
              </h3>
              <p className="mt-2 text-sm font-semibold text-[#008C45]">
                {certification.issuer}
              </p>
              <p className="mt-4 flex-1 text-sm leading-7 text-[#355469]">
                {certification.description}
              </p>
              {certification.credentialUrl ? (
                <a
                  href={certification.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex self-start rounded-full bg-[#000080] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#008C45]"
                  style={{ color: "#ffffff" }}
                >
                  View credential
                </a>
              ) : (
                <p className="mt-6 text-sm font-semibold text-[#000080]/65">
                  Add a credential link when this certificate is ready.
                </p>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
