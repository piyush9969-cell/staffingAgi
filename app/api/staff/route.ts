import { EMPLOYEES } from "@/data/employees";
import { PROJECTS } from "@/data/projects";
import { runStaffingEngine } from "@/lib/match";
// import { getStaffingRecommendation } from "@/lib/agent";

export async function POST(request: Request) {
  try {
    const { projectId, demoMode } = await request.json();

    const project = PROJECTS.find(p => p.projectId === projectId);
    if (!project) {
      return Response.json({ error: "Project not found" }, { status: 404 });
    }

    // Run hard filter
    const shortlistedCandidates = runStaffingEngine(project, EMPLOYEES);

    if (shortlistedCandidates.length === 0) {
      return Response.json({
        error: "No suitable candidates found",
        project,
        candidates: []
      }, { status: 400 });
    }

    // Demo mode: return hardcoded recommendation with first candidate
    if (demoMode) {
      const topCandidate = shortlistedCandidates[0];
      const recommendation = {
        selectedId: topCandidate.id,
        selectedName: topCandidate.name,
        reasoning: `Demo mode: Hard filters matched ${shortlistedCandidates.length} candidates. ${topCandidate.name} (CL ${topCandidate.CL}) is ranked #1 with a score of ${topCandidate.score}. Skills match: ${topCandidate.breakdown.skills}/100, Availability: ${topCandidate.breakdown.availability}/100.`,
        confidence: topCandidate.score >= 75 ? 'high' : topCandidate.score >= 50 ? 'medium' : 'low',
        topicsToBrushUp: Object.entries(project.skillsNeeded).map(([skill]) => `Advanced ${skill}`),
        knowledgeTransferUrl: "https://docs.example.com/knowledge-transfer"
      };

      return Response.json({
        success: true,
        project,
        shortlistedCandidates,
        recommendation
      });
    }

    //uncomment this when AI service is integrated
    // Get AI recommendation
    // const recommendation = await getStaffingRecommendation(
    //   project,
    //   shortlistedCandidates
    // );


  // Temporary: Mock AI recommendation until AI service is integrated
    const recommendation = {
      selectedId: shortlistedCandidates[0].id,
      selectedName: shortlistedCandidates[0].name,
      reasoning: `Based on the analysis of the project requirements and candidate profiles, ${shortlistedCandidates[0].name} (CL ${shortlistedCandidates[0].CL}) is recommended due to their strong skills match and high performance rating.`,
      confidence: 'high',
      topicsToBrushUp: Object.entries(project.skillsNeeded).map(([skill]) => `Advanced ${skill}`),
      knowledgeTransferUrl: "https://docs.example.com/knowledge-transfer"
    }
    

    return Response.json({
      success: true,
      project,
      shortlistedCandidates,
      recommendation
    });
  } catch (error) {
    console.error("Staffing error:", error);
    return Response.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
