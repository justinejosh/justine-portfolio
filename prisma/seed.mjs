import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const profilePayload = {
  slug: "justine-larona",
  fullName: "Justine Josh G. Larona",
  preferredName: "Justine",
  headline: "Aspiring ERP Developer and Data Analyst",
  age: 20,
  school: "Our Lady of Fatima University",
  degreeProgram: "Computer Science Student",
  bio: "I am a Computer Science student who is building a career around ERP systems, practical business workflows, and data storytelling.",
  summary:
    "I am currently exploring how Odoo's framework works under the hood, especially how Python logic connects with XML structure and how apps interact with one another. Alongside ERP learning, I enjoy turning data into dashboards through Tableau, Power BI, Excel, and spreadsheet-driven reporting.",
  learningFocus:
    "I am currently learning purchasing, inventory, invoicing, accounting, and sales inside Odoo ERP while strengthening my analytics toolkit.",
  focusAreas: [
    "Odoo purchasing",
    "Odoo inventory",
    "Odoo invoicing and accounting",
    "Odoo sales workflow",
  ],
  gpa: null,
  photoUrl: "/images/justine-portrait.jpg",
};

const certifications = [
  {
    title: "Certification Showcase Ready",
    issuer: "Add your completed course provider",
    status: "Ready for upload",
    description:
      "This section is prepared for the online certifications you earn. Replace this placeholder with your real certificate name, provider, and credential link.",
    displayOrder: 1,
  },
];

const experiences = [
  {
    title: "Computer Science Student",
    organization: "Our Lady of Fatima University",
    period: "Current",
    category: "Education",
    summary:
      "Building a strong academic foundation in software development, analytics, and problem solving while preparing for ERP-focused work.",
    displayOrder: 1,
    highlights: [
      "Currently enrolled as a Computer Science student.",
      "Developing practical technical depth for ERP and analytics workflows.",
      "Using university learning as a launchpad for real business tools.",
    ],
  },
  {
    title: "Odoo ERP Learning Journey",
    organization: "Self-directed Training",
    period: "Ongoing",
    category: "ERP",
    summary:
      "Studying how Odoo modules connect and how business processes flow across purchasing, inventory, accounting, invoicing, and sales.",
    displayOrder: 2,
    highlights: [
      "Knowledgeable in Odoo's framework and how the applications interact with one another.",
      "Learning how Python logic interacts with XML views and structures inside Odoo.",
      "Currently gaining more hands-on experience with import and export data tasks.",
    ],
  },
  {
    title: "Data Analytics Practice",
    organization: "Independent Dashboard Work",
    period: "Ongoing",
    category: "Analytics",
    summary:
      "Turning raw data into dashboards, pivot-based reports, and spreadsheet-driven insights across modern BI tools.",
    displayOrder: 3,
    highlights: [
      "Very knowledgeable in Tableau and Power BI dashboard work.",
      "Comfortable using Excel dashboards, pivot tables, and spreadsheet reporting.",
      "Focused on presenting information clearly for decision making.",
    ],
  },
];

const documents = [
  {
    title: "Curriculum Vitae",
    type: "CV",
    description:
      "A ready-to-connect slot for your full curriculum vitae once you upload the final file.",
    buttonLabel: "Upload CV Link",
    isAvailable: false,
    displayOrder: 1,
  },
  {
    title: "Resume",
    type: "Resume",
    description:
      "A separate container for your concise resume when you are ready to attach it.",
    buttonLabel: "Upload Resume Link",
    isAvailable: false,
    displayOrder: 2,
  },
];

const skills = [
  {
    name: "Python",
    category: "Programming",
    level: "Working knowledge",
    logoKey: "python",
    description:
      "Used to understand logic inside Odoo modules and support backend-oriented problem solving.",
    displayOrder: 1,
  },
  {
    name: "JavaScript",
    category: "Programming",
    level: "Working knowledge",
    logoKey: "javascript",
    description:
      "Helpful for interactive web experiences and understanding client-side behavior.",
    displayOrder: 2,
  },
  {
    name: "XML",
    category: "Programming",
    level: "Working knowledge",
    logoKey: "xml",
    description:
      "Important to your Odoo learning because it shapes views, structure, and module presentation.",
    displayOrder: 3,
  },
  {
    name: "Odoo",
    category: "ERP & Platforms",
    level: "Growing expertise",
    logoKey: "odoo",
    description:
      "Knowledgeable in Odoo's framework, module interactions, and business flow across ERP applications.",
    displayOrder: 4,
  },
  {
    name: "Tableau",
    category: "Analytics Tools",
    level: "Strong",
    logoKey: "tableau",
    description:
      "Used for dashboard building, insight communication, and data storytelling.",
    displayOrder: 5,
  },
  {
    name: "Power BI",
    category: "Analytics Tools",
    level: "Strong",
    logoKey: "powerbi",
    description:
      "Comfortable building dashboards and reports that support business analysis.",
    displayOrder: 6,
  },
  {
    name: "Microsoft Excel",
    category: "Analytics Tools",
    level: "Strong",
    logoKey: "excel",
    description:
      "Very comfortable with dashboards, pivot tables, and spreadsheet-based analysis.",
    displayOrder: 7,
  },
  {
    name: "Spreadsheet Tools",
    category: "Analytics Tools",
    level: "Strong",
    logoKey: "spreadsheets",
    description:
      "Reliable for organizing data, structuring reports, and supporting day-to-day analytics work.",
    displayOrder: 8,
  },
];

async function main() {
  await prisma.profile.upsert({
    where: { slug: profilePayload.slug },
    update: {
      ...profilePayload,
      certifications: {
        deleteMany: {},
        create: certifications,
      },
      experiences: {
        deleteMany: {},
        create: experiences.map((experience) => ({
          title: experience.title,
          organization: experience.organization,
          period: experience.period,
          category: experience.category,
          summary: experience.summary,
          displayOrder: experience.displayOrder,
          highlights: {
            create: experience.highlights.map((text, index) => ({
              text,
              displayOrder: index + 1,
            })),
          },
        })),
      },
      documents: {
        deleteMany: {},
        create: documents,
      },
      skills: {
        deleteMany: {},
        create: skills,
      },
    },
    create: {
      ...profilePayload,
      certifications: {
        create: certifications,
      },
      experiences: {
        create: experiences.map((experience) => ({
          title: experience.title,
          organization: experience.organization,
          period: experience.period,
          category: experience.category,
          summary: experience.summary,
          displayOrder: experience.displayOrder,
          highlights: {
            create: experience.highlights.map((text, index) => ({
              text,
              displayOrder: index + 1,
            })),
          },
        })),
      },
      documents: {
        create: documents,
      },
      skills: {
        create: skills,
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
