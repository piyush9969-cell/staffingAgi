'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react'

interface StaffingResult {
  success: boolean
  project: any
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
}

export function StaffingResultDisplay({ result }: { result: StaffingResult }) {
  const { recommendation, shortlistedCandidates } = result

  const confidenceColors = {
    high: 'bg-green-50 border-green-200',
    medium: 'bg-yellow-50 border-yellow-200',
    low: 'bg-red-50 border-red-200'
  }

  const confidenceTextColors = {
    high: 'text-green-700',
    medium: 'text-yellow-700',
    low: 'text-red-700'
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Primary Recommendation */}
      <Card className={`${confidenceColors[recommendation.confidence]} border-2`}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Recommended Candidate
              </CardTitle>
            </div>
            <Badge
              className={`text-sm capitalize ${
                recommendation.confidence === 'high'
                  ? 'bg-green-200 text-green-800'
                  : recommendation.confidence === 'medium'
                    ? 'bg-yellow-200 text-yellow-800'
                    : 'bg-red-200 text-red-800'
              }`}
            >
              {recommendation.confidence} Confidence
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">Candidate Name</p>
            <p className="text-2xl font-bold text-gray-900">{recommendation.selectedName}</p>
            <p className="text-xs text-gray-500 mt-1">{recommendation.selectedId}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900 mb-2">Why This Candidate?</p>
            <p className="text-gray-700 leading-relaxed">{recommendation.reasoning}</p>
          </div>

          {recommendation.topicsToBrushUp.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-2">Topics to Brush Up</p>
              <div className="flex flex-wrap gap-2">
                {recommendation.topicsToBrushUp.map((topic, idx) => (
                  <Badge key={idx} variant="outline" className="bg-white">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div>
            <Button
              onClick={() => window.open(recommendation.knowledgeTransferUrl, '_blank')}
              variant="outline"
              className="w-full"
            >
              📚 View Knowledge Transfer Guide
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Shortlisted Candidates */}
      {shortlistedCandidates.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Shortlisted Candidates ({shortlistedCandidates.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {shortlistedCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{candidate.name}</p>
                    <p className="text-xs text-gray-500">{candidate.id}</p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-xs text-gray-600">CL</p>
                      <p className="font-semibold text-gray-900">{candidate.CL}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600">Score</p>
                      <div className="flex items-center gap-1">
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 transition-all"
                            style={{ width: `${candidate.score}%` }}
                          />
                        </div>
                        <span className="font-semibold text-gray-900 w-12 text-right">
                          {candidate.score}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Score Breakdown Legend */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs font-medium text-gray-700 mb-2">Score Components:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                {shortlistedCandidates.length > 0 &&
                  Object.entries(shortlistedCandidates[0].breakdown).map(([key]) => (
                    <div key={key} className="bg-gray-100 p-2 rounded">
                      <p className="text-gray-600 capitalize">{key}</p>
                    </div>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
