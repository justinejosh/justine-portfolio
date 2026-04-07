import type { PortfolioData } from "@/lib/portfolio-types";

export const portfolioContent: PortfolioData = {
  profile: {
    fullName: "Justine Josh G. Larona",
    preferredName: "JJ",
    headline: "Your Future ERP Developer and Data Analyst",
    age: 20,
    school: "Our Lady of Fatima University",
    degreeProgram: "Bachelor of Science in Computer Science",
    bio: "I am a Computer Science student who is building a career around ERP systems, practical business workflows, and data storytelling.",
    summary:
      "Hello, I'm JJ! I am currently exploring how Odoo's framework works under the hood, especially how Python logic connects with XML structure and how apps interact with one another. Alongside ERP learning, I enjoy turning data into dashboards through Tableau, Power BI, Excel, and spreadsheet-driven reporting.",
    learningFocus:
      "I am currently learning purchasing, inventory, invoicing, accounting, and sales inside Odoo ERP while strengthening my analytics toolkit.",
    focusAreas: [
      "Odoo purchasing",
      "Odoo inventory",
      "Odoo invoicing and accounting",
      "Odoo sales workflow",
    ],
    gpa: null,
    photoUrl: "/images/justine-portrait-smile-2026.png",
  },

  // Edit this section to update the footer contact links.
  contact: {
    email: "justinejoshlarona.work@gmail.com",
    linkedinUrl: "https://www.linkedin.com/in/justine-josh-larona-79428a36a/",
    githubUrl: "https://github.com/justinejosh",
    phone: "+639319684942",
  },

  // Edit this section when you earn new online certificates.
  // You can add as many certification objects as you want.
  // Each object becomes another certificate inside a program track.
  // If you want to use local files, place them in public/certifications
  // and set credentialUrl like:
  // "/certifications/data-analytics/google-data-analytics/my-certificate.pdf"
  // or "/certifications/erp-focused/my-erp-certificate.pdf"
  // Use the same programSlug when certificates belong to the same track.
  // Mark the final overall program award with isProgramCertificate: true.
  certifications: [
    {
      id: 1,
      title: "Google Data Analytics Certification",
      category: "Data Analytics-focused",
      programSlug: "google-data-analytics",
      isProgramCertificate: true,
      courseLabel: null,
      courseOrder: 0,
      issuer: "Coursera",
      status: "Pending",
      issuedAt: null,
      description:
        "Use this top card for the final Google Data Analytics program certificate once you complete all of the course certificates under the track.",
      credentialUrl: null,
    },
    {
      id: 2,
      title: "Foundations: Data, Data, Everywhere",
      category: "Data Analytics-focused",
      programSlug: "google-data-analytics",
      isProgramCertificate: false,
      courseLabel: "Course 1 of 8",
      courseOrder: 1,
      issuer: "Coursera",
      status: "Uploaded",
      issuedAt: "2026-04-05",
      description:
        "Defined the key concepts that fall under data analytics, introduced different tools for data visualization, and query languages. This course also gives insight of data analyst roles in a company.",
      credentialUrl:
        "/certifications/data-analytics/google-data-analytics/Data_Analytics_1_JustineJoshLarona.pdf",
    },
    {
      id: 3,
      title: "Ask Questions to Make Data-Driven Decisions",
      category: "Data Analytics-focused",
      programSlug: "google-data-analytics",
      isProgramCertificate: false,
      courseLabel: "Course 2 of 8",
      courseOrder: 2,
      issuer: "Coursera",
      status: "Uploaded",
      issuedAt: "2026-04-08",
      description:
        "Discussed the importance of organized data in data-driven decision-making, asking SMART questions, communicating with stakeholders, and an overview of utilizing spreadsheets to understand data.",
      credentialUrl: "/certifications/data-analytics/google-data-analytics/Data_Analytics_2_JustineJoshLarona.pdf",
    },
    {
      id: 4,
      title: "Prepare Data for Exploration",
      category: "Data Analytics-focused",
      programSlug: "google-data-analytics",
      isProgramCertificate: false,
      courseLabel: "Course 3 of 8",
      courseOrder: 3,
      issuer: "Coursera",
      status: "Pending",
      issuedAt: null,
      description:
        "Placeholder for your third Google Data Analytics course certificate. Add the certificate link here when it is ready.",
      credentialUrl: null,
    },
    {
      id: 5,
      title: "Process Data from Dirty to Clean",
      category: "Data Analytics-focused",
      programSlug: "google-data-analytics",
      isProgramCertificate: false,
      courseLabel: "Course 4 of 8",
      courseOrder: 4,
      issuer: "Coursera",
      status: "Pending",
      issuedAt: null,
      description:
        "Placeholder for your fourth Google Data Analytics course certificate. Replace this with your actual details once you earn it.",
      credentialUrl: null,
    },
    {
      id: 6,
      title: "Analyze Data to Answer Questions",
      category: "Data Analytics-focused",
      programSlug: "google-data-analytics",
      isProgramCertificate: false,
      courseLabel: "Course 5 of 8",
      courseOrder: 5,
      issuer: "Coursera",
      status: "Pending",
      issuedAt: null,
      description:
        "Placeholder for your fifth Google Data Analytics course certificate. Add the credential URL when you upload the file.",
      credentialUrl: null,
    },
    {
      id: 7,
      title: "Share Data Through the Art of Visualization",
      category: "Data Analytics-focused",
      programSlug: "google-data-analytics",
      isProgramCertificate: false,
      courseLabel: "Course 6 of 8",
      courseOrder: 6,
      issuer: "Coursera",
      status: "Pending",
      issuedAt: null,
      description:
        "Placeholder for your sixth Google Data Analytics course certificate. Update it later with the actual certificate file and date.",
      credentialUrl: null,
    },
    {
      id: 8,
      title: "Introduction to Data Analysis Using Python",
      category: "Data Analytics-focused",
      programSlug: "google-data-analytics",
      isProgramCertificate: false,
      courseLabel: "Course 7 of 8",
      courseOrder: 7,
      issuer: "Coursera",
      status: "Pending",
      issuedAt: null,
      description:
        "Placeholder for your seventh Google Data Analytics course certificate. This slot is ready when you complete the course.",
      credentialUrl: null,
    },
    {
      id: 9,
      title: "Google Data Analytics Capstone: Complete a Case Study",
      category: "Data Analytics-focused",
      programSlug: "google-data-analytics",
      isProgramCertificate: false,
      courseLabel: "Course 8 of 8",
      courseOrder: 8,
      issuer: "Coursera",
      status: "Pending",
      issuedAt: null,
      description:
        "Placeholder for your capstone course certificate. Add the file path here when you finish the final course certificate in the track.",
      credentialUrl: null,
    },
    {
      id: 10,
      title: "Odoo ERP Certification Slot",
      category: "ERP-focused",
      programSlug: "erp-focused",
      isProgramCertificate: false,
      courseLabel: null,
      courseOrder: 1,
      issuer: "Add issuing provider",
      status: "Pending",
      issuedAt: null,
      description:
        "Use this card for your first ERP or Odoo-focused certification once you complete it and upload the credential link or file.",
      credentialUrl: null,
    },
    {
      id: 11,
      title: "ERP Workflow Certification Slot",
      category: "ERP-focused",
      programSlug: "erp-focused",
      isProgramCertificate: false,
      courseLabel: null,
      courseOrder: 2,
      issuer: "Add issuing provider",
      status: "Pending",
      issuedAt: null,
      description:
        "This placeholder is ready for future training related to purchasing, inventory, invoicing, accounting, sales, or ERP business process flow.",
      credentialUrl: null,
    },
  ],

  // Edit this section to add your school, internship, project, or Odoo experience.
  experiences: [
    {
      id: 1,
      title: "Computer Science Student",
      organization: "Our Lady of Fatima University",
      period: "2023 - 2027",
      category: "Education",
      summary:
        "Building a strong academic foundation in software development, analytics, and problem solving while preparing for ERP-focused work.",
      highlights: [
        "Currently enrolled as a Computer Science student.",
        "Developing practical technical depth for ERP and analytics workflows.",
        "Using university learning as a launchpad for real business tools.",
      ],
    },
    {
      id: 2,
      title: "Odoo ERP Learning Journey",
      organization: "Self-directed Training",
      period: "2025 - Present",
      category: "ERP",
      summary:
        "Studying how Odoo modules connect and how business processes flow across purchasing, inventory, accounting, invoicing, and sales.",
      highlights: [
        "Knowledgeable in Odoo's framework and how the applications interact with one another.",
        "Learning how Python logic interacts with XML views and structures inside Odoo.",
        "Currently gaining more hands-on experience with import and export data tasks.",
      ],
    },
    {
      id: 3,
      title: "Data Analytics Practice",
      organization: "Independent Dashboard Work",
      period: "2026 - Present",
      category: "Analytics",
      summary:
        "Turning raw data into dashboards, pivot-based reports, and spreadsheet-driven insights across modern BI tools.",
      highlights: [
        "Very knowledgeable in Tableau and Power BI dashboard work.",
        "Comfortable using Excel dashboards, pivot tables, and spreadsheet reporting.",
        "Focused on presenting information clearly for decision making.",
      ],
    },
  ],

  // Edit this section to add your ERP-focused and Data Analytics-focused projects.
  // Each object becomes a project card on the Projects page.
  projects: [
    {
      id: 1,
      title: "Real Estate Tutorial From Odoo Documentation",
      category: "ERP-focused",
      period: "2025",
      status: "Finished",
      summary:
        "A real estate module built inside Odoo's framework.",
      highlights: [
        "Studying how one Odoo module hands data and process flow to another.",
        "Breaking down how Python logic and XML views support each ERP process.",
        "Using the project as a foundation for future custom Odoo development work.",
      ],
      tools: ["Odoo", "Python", "XML"],
      projectUrl: "https://github.com/justinejosh/RealEstateOdoo",
    },
    {
      id: 2,
      title: "Pending",
      category: "ERP-focused",
      period: "Pending",
      status: "Pending",
      summary:
        "Pending",
      highlights: [
        "Pending",
      ],
      tools: [],
      projectUrl: null,
    },
    {
      id: 3,
      title: "Superstore-Sales-Dashboard",
      category: "Data Analytics-focused",
      period: "2025",
      status: "Finished",
      summary:
        "An ongoing analytics project focused on turning raw datasets into readable dashboards and business-facing reports.",
      highlights: [
        "Practicing KPI presentation through dashboard layouts.",
        "Improving storytelling with charts, filters, and summary insights.",
        "Using the project to strengthen decision-support reporting skills.",
      ],
      tools: ["Power BI", "Excel"],
      projectUrl: "https://github.com/justinejosh/Superstore-Sales-Dashboard",
    },
    {
      id: 4,
      title: "Pending",
      category: "Data Analytics-focused",
      period: "2026 - Present",
      status: "Ongoing",
      summary:
        "Pending",
      highlights: [
      "Pending",
      ],
      tools: [],
      projectUrl: null,
    },
  ],

  // Edit this section to add live CV, resume, or other document links.
  // You can add as many document objects as you want.
  // Each object becomes another selectable document card in the portfolio.
  // If you want to use local files, place them in public/documents
  // and set fileUrl like: "/documents/my-resume.pdf"
  documents: [
    {
      id: 1,
      title: "Curriculum Vitae",
      type: "CV",
      description:
        "A ready-to-connect slot for your full curriculum vitae once you upload the final file.",
      fileUrl: null,
      buttonLabel: "Upload CV Link",
      isAvailable: false,
    },
    {
      id: 2,
      title: "Resume",
      type: "Resume",
      description:
        "A separate container for your concise resume when you are ready to attach it.",
      fileUrl: null,
      buttonLabel: "Upload Resume Link",
      isAvailable: false,
    },
  ],

  // Edit this section to add or reorganize your skills and tools.
  skills: [
    {
      id: 1,
      name: "Python",
      category: "Programming",
      level: "Working knowledge",
      logoKey: "python",
      description:
        "Used to understand logic inside Odoo modules and support backend-oriented problem solving.",
    },
    {
      id: 2,
      name: "JavaScript",
      category: "Programming",
      level: "Working knowledge",
      logoKey: "javascript",
      description:
        "Helpful for interactive web experiences and understanding client-side behavior.",
    },
    {
      id: 3,
      name: "XML",
      category: "Programming",
      level: "Working knowledge",
      logoKey: "xml",
      description:
        "Important to your Odoo learning because it shapes views, structure, and module presentation.",
    },
    {
      id: 4,
      name: "Odoo",
      category: "ERP & Platforms",
      level: "Growing expertise",
      logoKey: "odoo",
      description:
        "Knowledgeable in Odoo's framework, module interactions, and business flow across ERP applications.",
    },
    {
      id: 5,
      name: "Tableau",
      category: "Analytics Tools",
      level: "Strong",
      logoKey: "tableau",
      description:
        "Used for dashboard building, insight communication, and data storytelling.",
    },
    {
      id: 6,
      name: "Power BI",
      category: "Analytics Tools",
      level: "Strong",
      logoKey: "powerbi",
      description:
        "Comfortable building dashboards and reports that support business analysis.",
    },
    {
      id: 7,
      name: "Microsoft Excel",
      category: "Analytics Tools",
      level: "Strong",
      logoKey: "excel",
      description:
        "Very comfortable with dashboards, pivot tables, and spreadsheet-based analysis.",
    },
    {
      id: 8,
      name: "Spreadsheet Tools",
      category: "Analytics Tools",
      level: "Strong",
      logoKey: "spreadsheets",
      description:
        "Reliable for organizing data, structuring reports, and supporting day-to-day analytics work.",
    },
  ],
};
