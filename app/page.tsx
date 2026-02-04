'use client'

import { useRouter } from 'next/navigation'
import { PROJECTS } from '@/data/projects'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Clock, Users, MessageSquare } from 'lucide-react'

const CL_LABELS: Record<number, string> = {
  1: 'Senior Managing Director',
  2: 'Client Account Director',
  3: 'Senior Client Account Executive',
  4: 'Client Account Executive',
  5: 'Associate / Principal Director',
  6: 'Senior Manager / Senior Principal',
  7: 'Manager / Principal',
  8: 'Associate Manager / Associate Principal',
  9: 'Consultant / Team Lead / Specialist',
  10: 'Senior Analyst / Senior Software Engineer',
  11: 'Analyst / Software Engineer',
  12: 'Associate / Associate Software Engineer',
  13: 'New Associate / Assistant'
}

export default function Dashboard() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="flex flex-col h-screen">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Staff AGI
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                AI-powered employee staffing for project matching
              </p>
            </div>
            <div className="w-[50%] flex flex-col items-end">
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => router.push("/employees")}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  View Employees
                </Button>

                {/* <Button
                onClick={() => router.push('/staff-pilot')}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <MessageSquare className="w-4 h-4" />
                Staff Pilot
              </Button> */}
              </div>
              <p className="text-sm text-gray-600 mt-1">
                by piyush 
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Projects</h2>
              <Badge variant="secondary">{PROJECTS.length} Active</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PROJECTS.map((project) => (
                <Card
                  key={project.projectId}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => router.push(`/projects/${project.projectId}`)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          {project.role}
                        </CardTitle>
                        <p className="text-xs text-gray-500 mt-1">
                          {project.projectId}
                        </p>
                      </div>
                      <Badge
                        variant={
                          project.remoteAllowed ? "default" : "secondary"
                        }
                      >
                        {project.remoteAllowed ? "Remote" : "On-site"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">CL {project.requiredCL}</Badge>
                        <span className="text-gray-600 text-xs">
                          {CL_LABELS[project.requiredCL]?.split("/")[0].trim()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">
                          {project.requiredHours}h
                        </span>
                      </div>
                    </div>

                    {!project.remoteAllowed && project.location && (
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {project.location}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1">
                      {Object.entries(project.skillsNeeded)
                        .slice(0, 3)
                        .map(([skill]) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                      {Object.entries(project.skillsNeeded).length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{Object.entries(project.skillsNeeded).length - 3}
                        </Badge>
                      )}
                    </div>

                    {project.description && (
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {project.description}
                      </p>
                    )}

                    <Button className="w-full mt-2">View Project</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
