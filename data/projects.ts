export type Project = {
  projectId: string;
  role: string;
  description?: string;
  requiredCL: number;
  requiredHours: number;
  remoteAllowed: boolean;
  location?: string;
  knowledgeTransfer: string;
  skillsNeeded: Record<string, number>;
};

export const PROJECTS: Project[] = [
  {
    projectId: "P101",
    role: "Fullstack Developer",
    description: "Building a scalable platform with React frontend and Node.js backend, hosted on AWS infrastructure.",
    requiredCL: 10,
    requiredHours: 30,
    remoteAllowed: true,
    knowledgeTransfer: "https://docs.example.com/kt/fullstack-platform-overview",
    skillsNeeded: { React: 7, Node: 7, AWS: 6 }
  },
  {
    projectId: "P102",
    role: "Backend Engineer",
    description: "Developing backend API services using Python, managing databases, and optimizing AWS infrastructure.",
    requiredCL: 10,
    requiredHours: 35,
    remoteAllowed: true,
    knowledgeTransfer: "https://docs.example.com/kt/backend-api-architecture",
    skillsNeeded: { Python: 8, SQL: 7, AWS: 6 }
  },
  {
    projectId: "P103",
    role: "Technical Lead",
    description: "Leading architecture design, mentoring team, and overseeing microservices implementation for enterprise client.",
    requiredCL: 9,
    requiredHours: 25,
    remoteAllowed: false,
    location: "Bangalore",
    knowledgeTransfer: "https://docs.example.com/kt/technical-lead-playbook",
    skillsNeeded: { Architecture: 7, Leadership: 7, Microservices: 7 }
  },
  {
    projectId: "P104",
    role: "Cloud Engineer",
    description: "Managing cloud infrastructure with AWS, Terraform IaC, containerization with Docker, and CI/CD pipelines.",
    requiredCL: 9,
    requiredHours: 30,
    remoteAllowed: true,
    knowledgeTransfer: "https://docs.example.com/kt/cloud-infra-handbook",
    skillsNeeded: { AWS: 8, Terraform: 7, Docker: 7 }
  },
  {
    projectId: "P105",
    role: "UI Developer",
    description: "Creating responsive web interfaces using modern HTML/CSS/JavaScript, implementing design systems.",
    requiredCL: 11,
    requiredHours: 40,
    remoteAllowed: true,
    knowledgeTransfer: "https://docs.example.com/kt/ui-design-system-guide",
    skillsNeeded: { HTML: 7, CSS: 7, JavaScript: 7 }
  }
];
