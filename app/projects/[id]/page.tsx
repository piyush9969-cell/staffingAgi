'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { PROJECTS } from '@/data/projects'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, MapPin, Clock, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'
import { StaffingResultDisplay } from '@/components/staffing-result-display'

interface StaffingResult {
  success: boolean
  project: (typeof PROJECTS)[0]
  shortlistedCandidates: Array<{
    id: string
    name: string
    CL: number
    score: number
    breakdown: { CL: number; skills: number; availability: number; performance: number }
  }>
  recommendation: {
    selectedId: string
    selectedName: string
    reasoning: string
    confidence: 'high' | 'medium' | 'low'
    topicsToBrushUp: string[]
    knowledgeTransferUrl: string
  }
  error?: string
}

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

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string

  const project = PROJECTS.find((p) => p.projectId === projectId)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<StaffingResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [demoMode, setDemoMode] = useState(false)

  if (!project) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="flex flex-col h-screen">
          <div className="bg-white border-b border-gray-200 px-8 py-6">
            <Button onClick={() => router.back()} variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <Card className="w-96">
              <CardContent className="pt-6 text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Project not found</p>
                <Button onClick={() => router.back()} className="mt-4 w-full">
                  Go Back
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    )
  }

  const handleRunStaffingAgent = async () => {
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, demoMode })
      })

      const data: StaffingResult = await response.json()

      if (!response.ok || data.error) {
        setError(data.error || 'Failed to run staffing agent')
      } else {
        setResult(data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

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
                <h1 className="text-3xl font-bold text-gray-900">{project.role}</h1>
                <p className="text-sm text-gray-600 mt-1">{project.projectId}</p>
              </div>
            </div>
            <Badge variant={project.remoteAllowed ? 'default' : 'secondary'}>
              {project.remoteAllowed ? 'Remote' : 'On-site'}
            </Badge>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Required Level</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-base px-3 py-1">
                      CL {project.requiredCL}
                    </Badge>
                    <span className="text-sm text-gray-600">
                      {CL_LABELS[project.requiredCL]}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Hours Required</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <span className="text-lg font-semibold">{project.requiredHours} hours</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {!project.remoteAllowed && project.location && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-900">{project.location}</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {project.description && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{project.description}</p>
                </CardContent>
              </Card>
            )}

            {/* Skills Needed */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Required Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(project.skillsNeeded).map(([skill, level]) => (
                    <Badge key={skill} variant="secondary">
                      {skill} ({level})
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Staffing Agent Section */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader>
                <CardTitle className="text-base">Run Staffing Agent</CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Get AI-powered recommendations for the best candidate
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-white rounded border border-gray-200">
                  <input
                    type="checkbox"
                    id="demo-mode"
                    checked={demoMode}
                    onChange={(e) => setDemoMode(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
                  />
                  <label htmlFor="demo-mode" className="text-sm font-medium text-gray-700 cursor-pointer flex-1">
                    Demo Mode
                  </label>
                  <span className="text-xs text-gray-500">
                    {demoMode ? 'Hard filters only' : 'Full AI analysis'}
                  </span>
                </div>
                <Button
                  onClick={handleRunStaffingAgent}
                  disabled={isLoading}
                  size="lg"
                  className="w-full md:w-auto"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing Candidates...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Run Staffing Agent
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Error Alert */}
            {error && (
              <Alert className="bg-red-50 border-red-200">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            {/* Results */}
            {result && !error && <StaffingResultDisplay result={result} />}
          </div>
        </div>
      </div>
    </main>
  )
}
