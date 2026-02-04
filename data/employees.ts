export type Employee = {
  id: string;
  name: string;
  CL: number;
  location: string;
  availabilityHours: number;
  lastRating: number;
  skills: Record<string, number>;
};

export const EMPLOYEES: Employee[] = [
  {
    id: "E001",
    name: "Ravi Khanna",
    CL: 8,
    location: "Bangalore",
    availabilityHours: 30,
    lastRating: 4.6,
    skills: { React: 9, Node: 8, AWS: 7, Leadership: 7 }
  },
  {
    id: "E002",
    name: "Priya Sharma",
    CL: 11,
    location: "Remote",
    availabilityHours: 40,
    lastRating: 4.2,
    skills: { Python: 9, Django: 8, SQL: 8, AWS: 6 }
  },
  {
    id: "E003",
    name: "Arjun Mehta",
    CL: 9,
    location: "Mumbai",
    availabilityHours: 25,
    lastRating: 4.8,
    skills: { Java: 8, Spring: 8, Microservices: 7, Architecture: 7 }
  },
  {
    id: "E004",
    name: "Neha Verma",
    CL: 12,
    location: "Delhi",
    availabilityHours: 40,
    lastRating: 4.0,
    skills: { HTML: 8, CSS: 8, JavaScript: 7, UI: 7 }
  },
  {
    id: "E005",
    name: "Karan Patel",
    CL: 7,
    location: "Bangalore",
    availabilityHours: 20,
    lastRating: 4.7,
    skills: { "Project Management": 9, Agile: 9, Stakeholder: 8 }
  },
  {
    id: "E006",
    name: "Sneha Iyer",
    CL: 10,
    location: "Chennai",
    availabilityHours: 35,
    lastRating: 4.5,
    skills: { React: 7, TypeScript: 8, NextJS: 8, Testing: 7 }
  },
  {
    id: "E007",
    name: "Rahul Gupta",
    CL: 9,
    location: "Remote",
    availabilityHours: 30,
    lastRating: 4.3,
    skills: { AWS: 9, Terraform: 8, DevOps: 8, Docker: 8 }
  },
  {
    id: "E008",
    name: "Aditi Singh",
    CL: 13,
    location: "Pune",
    availabilityHours: 40,
    lastRating: 3.9,
    skills: { JavaScript: 6, React: 5, Git: 7 }
  }
];
