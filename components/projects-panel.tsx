"use client";

import { PROJECTS } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Zap } from "lucide-react";

interface ProjectsPanelProps {
  selectedProjectId: string | null;
  onSelectProject: (projectId: string) => void;
}

const CL_LABELS: Record<number, string> = {
  1: "Senior Managing Director",
  2: "Client Account Director",
  3: "Senior Client Account Executive",
  4: "Client Account Executive",
  5: "Associate / Principal Director",
  6: "Senior Manager / Senior Principal",
  7: "Manager / Principal",
  8: "Associate Manager / Associate Principal",
  9: "Consultant / Team Lead / Specialist",
  10: "Senior Analyst / Senior Software Engineer",
  11: "Analyst / Software Engineer",
  12: "Associate / Associate Software Engineer",
  13: "New Associate / Assistant"
};

export function ProjectsPanel({ selectedProjectId, onSelectProject }: ProjectsPanelProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Projects</h2>
        <Badge variant="outline">{PROJECTS.length} Active</Badge>
      </div>

      <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-200px)]">
        {PROJECTS.map((project) => (
          <Card
            key={project.projectId}
            className={`cursor-pointer transition-all ${
              selectedProjectId === project.projectId
                ? "ring-2 ring-blue-500 bg-blue-50"
                : "hover:border-gray-400"
            }`}
            onClick={() => onSelectProject(project.projectId)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">{project.role}</CardTitle>
                  <CardDescription className="text-xs">{project.projectId}</CardDescription>
                </div>
                <Badge variant={project.remoteAllowed ? "default" : "secondary"}>
                  {project.remoteAllowed ? "Remote" : "On-site"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    CL {project.requiredCL}
                  </Badge>
                  <span className="text-xs text-gray-600">
                    {CL_LABELS[project.requiredCL]}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-xs">{project.requiredHours}h</span>
                </div>
              </div>

              {!project.remoteAllowed && project.location && (
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {project.location}
                </div>
              )}

              <div className="flex flex-wrap gap-1">
                {Object.entries(project.skillsNeeded).map(([skill, level]) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill} {level}
                  </Badge>
                ))}
              </div>

              {project.description && (
                <p className="text-xs text-gray-600 line-clamp-2">{project.description}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
