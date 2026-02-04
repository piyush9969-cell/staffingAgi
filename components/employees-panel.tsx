"use client";

import { EMPLOYEES } from "@/data/employees";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

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

export function EmployeesPanel() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEmployees = EMPLOYEES.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      Object.keys(emp.skills).some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold mb-2">Employees</h2>
        <Input
          placeholder="Search by name, ID, or skill..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="text-sm"
        />
      </div>

      <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-200px)]">
        {filteredEmployees.map((emp) => (
          <Card key={emp.id} className="hover:border-gray-400 transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">{emp.name}</CardTitle>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span>{emp.id}</span>
                    <span>•</span>
                    <span>CL {emp.CL} ({CL_LABELS[emp.CL]})</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{emp.lastRating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-xs">{emp.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-xs">{emp.availabilityHours}h/week</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {Object.entries(emp.skills).map(([skill, level]) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="text-xs"
                  >
                    {skill} <span className="ml-1 opacity-70">{level}</span>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
