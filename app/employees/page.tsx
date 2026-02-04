'use client'

import { useRouter } from 'next/navigation'
import { EMPLOYEES } from '@/data/employees'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Briefcase, Star } from 'lucide-react'

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

export default function EmployeesPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="flex flex-col h-screen">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => router.back()}
                variant="ghost"
                size="icon"
                className="h-9 w-9"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Browse and manage available resources
                </p>
              </div>
            </div>
            <Badge variant="secondary">{EMPLOYEES.length} Total</Badge>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {EMPLOYEES.map((employee) => (
                <Card key={employee.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{employee.name}</CardTitle>
                        <p className="text-xs text-gray-500 mt-1">{employee.id}</p>
                      </div>
                      <Badge variant="outline">CL {employee.CL}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-900">
                        {CL_LABELS[employee.CL]}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        {employee.location}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-gray-700 mb-2">Skills</p>
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(employee.skills)
                          .slice(0, 4)
                          .map(([skill, level]) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill} {level}
                            </Badge>
                          ))}
                        {Object.entries(employee.skills).length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{Object.entries(employee.skills).length - 4}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-xs text-gray-600">Availability</p>
                        <p className="font-medium text-gray-900">
                          {employee.availabilityHours}h/week
                        </p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-xs text-gray-600 flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          Performance
                        </p>
                        <p className="font-medium text-gray-900">
                          {employee.lastRating.toFixed(1)}/5
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
