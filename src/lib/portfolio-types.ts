export type PortfolioData = {
  profile: {
    fullName: string;
    preferredName: string;
    headline: string;
    age: number;
    school: string;
    degreeProgram: string;
    bio: string;
    summary: string;
    learningFocus: string;
    focusAreas: string[];
    gpa: string | null;
    photoUrl: string;
  };
  contact: {
    email: string;
    linkedinUrl: string;
    githubUrl: string;
    phone: string;
  };
  certifications: Array<{
    id: number;
    title: string;
    category: string;
    programSlug: string;
    isProgramCertificate: boolean;
    courseLabel: string | null;
    courseOrder: number;
    issuer: string;
    status: string;
    issuedAt: string | null;
    description: string;
    credentialUrl: string | null;
  }>;
  experiences: Array<{
    id: number;
    title: string;
    organization: string;
    period: string;
    category: string;
    summary: string;
    highlights: string[];
  }>;
  projects: Array<{
    id: number;
    title: string;
    category: string;
    period: string;
    status: string;
    summary: string;
    highlights: string[];
    tools: string[];
    projectUrl: string | null;
  }>;
  documents: Array<{
    id: number;
    title: string;
    type: string;
    description: string;
    fileUrl: string | null;
    buttonLabel: string;
    isAvailable: boolean;
  }>;
  skills: Array<{
    id: number;
    name: string;
    category: string;
    level: string;
    logoKey: string;
    description: string;
  }>;
};
