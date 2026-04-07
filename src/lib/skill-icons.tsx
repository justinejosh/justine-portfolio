import type { IconType } from "react-icons";
import { FaCode } from "react-icons/fa6";
import { IoLogoTableau } from "react-icons/io5";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { SiJavascript, SiOdoo, SiPython, SiXml } from "react-icons/si";

const PowerBiIcon: IconType = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <rect x="3" y="11" width="3.5" height="9" rx="1.3" />
    <rect x="8.1" y="7" width="3.5" height="13" rx="1.3" />
    <rect x="13.2" y="4" width="3.5" height="16" rx="1.3" />
    <rect x="18.3" y="9" width="2.7" height="11" rx="1.2" />
  </svg>
);

const SpreadsheetIcon: IconType = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M6 2.75h8.7l4.55 4.55V21.25a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3.75a1 1 0 0 1 1-1Z" />
    <path fill="#f4efe7" d="M14.7 2.75v4.6h4.55" />
    <path
      fill="#f4efe7"
      d="M8 10.15h8v1.45H8zm0 3.1h8v1.45H8zm0 3.1h8v1.45H8zm4.2-7.7h1.45v9.15H12.2z"
    />
  </svg>
);

export const skillIconMap: Record<string, IconType> = {
  python: SiPython,
  javascript: SiJavascript,
  xml: SiXml,
  odoo: SiOdoo,
  tableau: IoLogoTableau,
  powerbi: PowerBiIcon,
  excel: PiMicrosoftExcelLogoFill,
  spreadsheets: SpreadsheetIcon,
};

export const fallbackSkillIcon = FaCode;
