"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/certifications", label: "Certifications" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/documents", label: "Documents" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  function isLinkActive(label: string) {
    return links.find((link) => link.label === label)?.href === pathname;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/45 bg-[rgba(244,239,231,0.76)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 text-sm font-semibold tracking-[0.24em] text-[#000080] uppercase"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#000080] text-base text-white shadow-[0_14px_30px_rgba(0,0,128,0.18)]">
            JL
          </span>
          <span className="hidden sm:block">Justine Larona</span>
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-[#000080]/20 px-4 py-2 text-sm font-semibold text-[#000080] transition hover:border-[#008C45] hover:text-[#008C45] md:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          Menu
        </button>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => {
            const isActive = isLinkActive(link.label);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-[#000080] !text-white shadow-[0_12px_28px_rgba(0,0,128,0.2)]"
                    : "!text-[#000080] hover:bg-[#008C45]/10 hover:!text-[#008C45]"
                }`}
                style={{ color: isActive ? "#ffffff" : "#000080" }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {isOpen ? (
        <nav
          id="mobile-menu"
          className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 pb-4 sm:px-6 md:hidden lg:px-8"
        >
          {links.map((link) => {
            const isActive = isLinkActive(link.label);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "border-[#000080] bg-[#000080] !text-white shadow-[0_12px_28px_rgba(0,0,128,0.2)]"
                    : "border-[#000080]/12 bg-white/75 !text-[#000080] hover:border-[#008C45]/40 hover:!text-[#008C45]"
                }`}
                style={{ color: isActive ? "#ffffff" : "#000080" }}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      ) : null}
    </header>
  );
}
