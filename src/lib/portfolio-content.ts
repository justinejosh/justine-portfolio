import type { PortfolioData } from "@/lib/portfolio-types";

export const portfolioContent: PortfolioData = {
  profile: {
    fullName: "Justine Josh G. Larona",
    preferredName: "JJ",
    headline:
      "Aspiring ERP Developer focused on Odoo systems and data analytics for business decision-making",
    age: 20,
    school: "Our Lady of Fatima University",
    degreeProgram: "Bachelor of Science in Computer Science",
    bio: "I am a Computer Science student building toward ERP development and data analytics work that supports clearer business operations and better decision-making.",
    summary:
      "I am building practical knowledge in Odoo by understanding how Python logic, XML views, and module relationships support real workflows from sales to accounting. In parallel, I turn data into dashboards and reports through Tableau, Power BI, Excel, and spreadsheets to make business information easier to read and act on.",
    learningFocus:
      "I am currently learning how purchasing, inventory, invoicing, accounting, and sales connect inside Odoo ERP while sharpening my analytics toolkit for reporting and decision support.",
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
      status: "In Progress",
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
      title: "Odoo ERP Learning Journey",
      organization: "Self-directed Training",
      period: "2026 - Present",
      category: "ERP",
      summary:
        "Building practical understanding of how Odoo Sales, Inventory, Invoicing, and Accounting connect to support real business operations.",
      highlights: [
        "Mapped how modules share data across sales orders, inventory movements, invoices, and accounting entries.",
        "Practiced reading how Python logic and XML views work together to shape business workflows.",
        "Strengthening familiarity with data import, export, and cross-module process flow inside Odoo.",
      ],
    },
    {
      id: 2,
      title: "Data Analytics Practice",
      organization: "Independent Dashboard Work",
      period: "2026 - Present",
      category: "Analytics",
      summary:
        "Creating dashboards and spreadsheet-based reports that turn raw data into clearer performance insights for decision-making.",
      highlights: [
        "Built dashboard views in Tableau and Power BI to present KPIs and trends more clearly.",
        "Used Excel pivot tables, formulas, and structured sheets to organize and summarize business data.",
        "Focused on making reports easier to read, compare, and act on.",
      ],
    },
    {
      id: 3,
      title: "IT Project Manager - Quiz Bee Event System",
      organization: "ITPM311, 3rd Year 1st Semester",
      period: "2025 - 2026",
      category: "Project Management",
      summary:
        "Developed and managed a project timeline for a first-year Quiz Bee event system while coordinating tasks, tracking progress, and supporting smooth execution.",
      highlights: [
        "Allocated tasks among team members and monitored progress to meet deadlines.",
        "Designed and used spreadsheets and Google Forms for planning, participant tracking, and event data organization.",
        "Reviewed and validated quiz content to improve accuracy, clarity, and fairness during event execution.",
      ],
    },
    {
      id: 4,
      title: "Secretary",
      organization:
        "Fatima Computing and Multimedia Society (FCMS), Sta. Rosa Laguna Campus",
      period: "2025 - 2026",
      category: "Leadership",
      summary:
        "Supporting FCMS operations through organized documentation, communication, and record management for campus activities.",
      highlights: [
        "Prepared organization documents and written coordination materials using Google Docs.",
        "Managed registrations, attendance, and internal requests through Google Forms.",
        "Tracked schedules, lists, and records in Google Sheets to keep information organized and accessible.",
      ],
    },
    {
      id: 5,
      title: "Computer Science Student",
      organization: "Our Lady of Fatima University",
      period: "2023 - 2027",
      category: "Education",
      summary:
        "Building a strong academic foundation in software development, analytics, and systems thinking while preparing for ERP-focused work.",
      highlights: [
        "Currently enrolled as a Computer Science student.",
        "Developing practical technical depth for ERP and analytics workflows.",
        "Using university learning as a launchpad for real business tools.",
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
        "Built an Odoo real estate module to understand how model logic, views, and workflow steps connect inside a business application.",
      highlights: [
        "Explored how one Odoo module hands records and process flow to another across the application.",
        "Connected Python logic and XML views to support each ERP step in the module.",
        "Used the build as a foundation for future custom Odoo workflow projects.",
      ],
      tools: ["Odoo", "Python", "XML"],
      projectUrl: "https://github.com/justinejosh/RealEstateOdoo",
    },
    {
      id: 2,
      title: "Coming Soon: Sales Workflow Simulation",
      category: "ERP-focused",
      period: "Planned for 2026",
      status: "Coming soon",
      summary:
        "Planned Odoo practice project focused on following a sales transaction from quotation to inventory movement and accounting output.",
      highlights: [
        "Will model how sales, stock, and accounting connect in a complete business flow.",
        "Will document the key records, views, and validations used at each stage.",
        "Will become a stronger portfolio example of process thinking inside Odoo.",
      ],
      tools: ["Odoo", "Python", "XML"],
      projectUrl: null,
    },
    {
      id: 3,
      title: "Superstore-Sales-Dashboard",
      category: "Data Analytics-focused",
      period: "2025",
      status: "Finished",
      summary:
        "Built a dashboard project that turns raw retail data into clearer sales reporting and KPI-driven business insights.",
      highlights: [
        "Presented sales KPIs through dashboard layouts designed for faster review.",
        "Used charts, filters, and summary views to improve storytelling and comparison.",
        "Strengthened decision-support reporting skills through practical dashboard design.",
      ],
      tools: ["Power BI", "Excel"],
      projectUrl: "https://github.com/justinejosh/Superstore-Sales-Dashboard",
    },
    {
      id: 4,
      title: "Coming Soon: Financial Performance Dashboard",
      category: "Data Analytics-focused",
      period: "Planned for 2026",
      status: "Coming soon",
      summary:
        "Planned analytics project focused on turning business data into a clearer financial dashboard for reporting and decision support.",
      highlights: [
        "Will combine spreadsheet preparation with dashboard storytelling.",
        "Will highlight KPIs, trends, and variance views for faster analysis.",
        "Will strengthen portfolio evidence in Excel and Power BI reporting.",
      ],
      tools: ["Power BI", "Excel", "Spreadsheet Tools"],
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
