import { Employee } from "@/data/employees";
import { Project } from "@/data/projects";

export type ScoredCandidate = {
  id: string;
  name: string;
  CL: number;
  score: number;
  breakdown: {
    CL: number;
    skills: number;
    availability: number;
    performance: number;
  };
};

// Weights sum to 100
const WEIGHTS = {
  CL: 25,
  skills: 45,
  availability: 15,
  performance: 15
};

export function runStaffingEngine(
  project: Project,
  employees: Employee[]
): ScoredCandidate[] {
  const candidates: ScoredCandidate[] = [];

  for (const emp of employees) {
    /* ---------------- HARD FILTERS ---------------- */

    // CL eligibility
    if (emp.CL > project.requiredCL + 1) continue;

    // Availability
    if (emp.availabilityHours < project.requiredHours) continue;

    // Location
    if (
      !project.remoteAllowed &&
      emp.location !== "Remote" &&
      emp.location !== project.location
    ) {
      continue;
    }

    /* ---------------- SCORING ---------------- */

    const clScore = calculateCLScore(emp.CL, project.requiredCL);
    const skillsScore = calculateSkillsScore(
      emp.skills,
      project.skillsNeeded
    );
    const availabilityScore = calculateAvailabilityScore(
      emp.availabilityHours,
      project.requiredHours
    );
    const performanceScore = (emp.lastRating / 5) * 100;

    const totalScore =
      (clScore * WEIGHTS.CL) / 100 +
      (skillsScore * WEIGHTS.skills) / 100 +
      (availabilityScore * WEIGHTS.availability) / 100 +
      (performanceScore * WEIGHTS.performance) / 100;

    candidates.push({
      id: emp.id,
      name: emp.name,
      CL: emp.CL,
      score: Math.round(totalScore),
      breakdown: {
        CL: Math.round(clScore),
        skills: Math.round(skillsScore),
        availability: Math.round(availabilityScore),
        performance: Math.round(performanceScore)
      }
    });
  }

  return candidates.sort((a, b) => b.score - a.score).slice(0, 5);
}

/* ---------------- CL SCORING ---------------- */

function calculateCLScore(employeeCL: number, requiredCL: number): number {
  const diff = requiredCL - employeeCL;

  if (diff === 0) return 100; // perfect match
  if (diff === 1) return 85;
  if (diff === 2) return 65;
  if (diff > 2) return 30; // too junior
  if (diff === -1) return 75; // slightly senior
  return 50; // overqualified
}

/* ---------------- SKILLS SCORING ---------------- */

function calculateSkillsScore(
  employeeSkills: Record<string, number>,
  requiredSkills: Record<string, number>
): number {
  let total = 0;
  let max = 0;

  for (const [skill, requiredLevel] of Object.entries(requiredSkills)) {
    const employeeLevel = employeeSkills[skill] ?? 0;
    max += 10;

    if (employeeLevel >= requiredLevel) {
      total += 10;
    } else if (employeeLevel === requiredLevel - 1) {
      total += 6;
    } else {
      total += 0; // hard penalty
    }
  }

  return (total / max) * 100;
}

/* ---------------- AVAILABILITY SCORING ---------------- */

function calculateAvailabilityScore(
  availableHours: number,
  requiredHours: number
): number {
  const ratio = availableHours / requiredHours;

  if (ratio >= 1.2) return 100;
  if (ratio >= 1.0) return 85;
  if (ratio >= 0.9) return 60;
  return 30;
}
