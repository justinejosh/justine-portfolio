import {
  FaEnvelope,
  FaGithub,
  FaLinkedinIn,
  FaPhone,
} from "react-icons/fa6";
import { portfolioContent } from "@/lib/portfolio-content";

function ContactCard({
  href,
  icon,
  label,
  actionLabel,
  hintLabel,
  external = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  actionLabel: string;
  hintLabel: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group flex h-full min-h-[92px] cursor-pointer items-start gap-4 rounded-[24px] border border-[#000080]/10 bg-white/82 px-4 py-4 shadow-[0_14px_34px_rgba(4,16,71,0.08)] transition duration-200 hover:-translate-y-1 hover:border-[#008C45]/35 hover:shadow-[0_18px_40px_rgba(0,140,69,0.16)] active:translate-y-0"
      aria-label={`${actionLabel} ${label}`}
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#000080] text-lg text-white shadow-[0_12px_26px_rgba(0,0,128,0.18)] transition group-hover:bg-[#008C45]">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="mono-type block text-[10px] font-semibold uppercase tracking-[0.24em] text-[#008C45]">
          {label}
        </span>
        <span className="mt-2 block text-sm font-semibold text-[#000080]">
          {actionLabel}
        </span>
        <span className="mt-1 block text-xs font-medium text-[#355469] opacity-80">
          {hintLabel}
        </span>
      </span>
    </a>
  );
}

function getPhoneHref(phone: string) {
  const trimmed = phone.trim();
  const normalized = trimmed.replace(/[^\d+]/g, "");

  if (normalized.startsWith("+")) {
    return `tel:${normalized}`;
  }

  const digits = normalized.replace(/\D/g, "");

  if (digits.startsWith("0")) {
    return `tel:+63${digits.slice(1)}`;
  }

  if (digits.startsWith("63")) {
    return `tel:+${digits}`;
  }

  return `tel:${digits}`;
}

function getGmailComposeHref(email: string) {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
}

export function SiteFooter() {
  const { contact } = portfolioContent;

  const contactItems = [
    {
      label: "Email",
      actionLabel: "Open mail app",
      hintLabel: "Tap to compose",
      href: getGmailComposeHref(contact.email),
      icon: <FaEnvelope />,
      external: true,
    },
    {
      label: "LinkedIn",
      actionLabel: "View profile",
      hintLabel: "Tap to open",
      href: contact.linkedinUrl,
      icon: <FaLinkedinIn />,
      external: true,
    },
    {
      label: "GitHub",
      actionLabel: "View profile",
      hintLabel: "Tap to open",
      href: contact.githubUrl,
      icon: <FaGithub />,
      external: true,
    },
    {
      label: "Phone",
      actionLabel: "Open contact",
      hintLabel: "Tap to call",
      href: getPhoneHref(contact.phone),
      icon: <FaPhone />,
    },
  ];

  return (
    <footer className="border-t border-[#000080]/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.52),rgba(235,244,239,0.72))]">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="space-y-3">
          <div className="space-y-3">
            <p className="mono-type text-[11px] font-semibold uppercase tracking-[0.3em] text-[#008C45]">
              Portfolio Footer
            </p>
            <div className="space-y-2">
              <p className="text-xl font-semibold text-[#000080]">
                Justine Josh G. Larona Portfolio
              </p>
              <p className="max-w-2xl text-sm leading-7 text-[#355469]">
                Built with Next.js and a simple file-based content setup, with a
                layout designed to stay clean on both desktop and mobile.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-[#000080]/10 pt-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="mono-type text-[11px] font-semibold uppercase tracking-[0.28em] text-[#008C45]">
              Contact Details
            </p>
            <p className="hidden text-sm text-[#355469] sm:block">
              Email, LinkedIn, GitHub, and phone number
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {contactItems.map((item) => (
              <ContactCard
                key={item.label}
                href={item.href}
                icon={item.icon}
                label={item.label}
                actionLabel={item.actionLabel}
                hintLabel={item.hintLabel}
                external={item.external}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
