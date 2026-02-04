"use client";

import React from "react"

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Send, AlertCircle, CheckCircle2, Eye } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
}

interface StaffingResult {
  success: boolean;
  project: (typeof PROJECTS)[0];
  shortlistedCandidates: Array<{
    id: string;
    name: string;
    CL: number;
    score: number;
    breakdown: { CL: number; skills: number; availability: number; performance: number };
  }>;
  recommendation: {
    selectedId: string;
    selectedName: string;
    reasoning: string;
    confidence: "high" | "medium" | "low";
    topicsToBrushUp: string[];
    knowledgeTransferUrl: string;
  };
  error?: string;
}

interface AgentPanelProps {
  selectedProjectId: string | null;
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

export function AgentPanel({ selectedProjectId }: AgentPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "👋 Welcome to the Staffing Agent! Select a project and click \"Run Staffing Agent\" to get AI-powered recommendations."
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [staffingResult, setStaffingResult] = useState<StaffingResult | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleRunStaffingAgent = async () => {
    if (!selectedProjectId) {
      setMessages(prev => [...prev, {
        id: Math.random().toString(),
        type: "assistant",
        content: "❌ Please select a project first"
      }]);
      return;
    }

    setIsLoading(true);
    setMessages(prev => [...prev, {
      id: Math.random().toString(),
      type: "assistant",
      content: "🔄 Running staffing engine... (hard filtering + AI analysis)"
    }]);

    try {
      const response = await fetch("/api/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: selectedProjectId })
      });

      const result: StaffingResult = await response.json();
      setStaffingResult(result);

      if (result.error) {
        setMessages(prev => [...prev, {
          id: Math.random().toString(),
          type: "assistant",
          content: `⚠️ ${result.error}`
        }]);
      } else {
        const rec = result.recommendation;
        const shortlist = result.shortlistedCandidates;
        
        const responseText = `✅ **Staffing Analysis Complete**

**Selected Candidate:** ${rec.selectedName} (${rec.selectedId})
**Confidence:** ${rec.confidence === "high" ? "🟢" : rec.confidence === "medium" ? "🟡" : "🔴"} ${rec.confidence.toUpperCase()}

**Reasoning:**
${rec.reasoning}

**Topics to Brush Up:**
${rec.topicsToBrushUp.map(t => `• ${t}`).join("\n")}

**Shortlisted Candidates:**
${shortlist.map(c => `• ${c.name} (${c.id}) - Score: ${c.score}/100`).join("\n")}

**Knowledge Transfer:** [Open Documentation](${rec.knowledgeTransferUrl})`;

        setMessages(prev => [...prev, {
          id: Math.random().toString(),
          type: "assistant",
          content: responseText
        }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Math.random().toString(),
        type: "assistant",
        content: `❌ Error: ${error instanceof Error ? error.message : "Failed to get recommendation"}`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, {
      id: Math.random().toString(),
      type: "user",
      content: input
    }]);
    setInput("");

    // Echo response for now - can be extended with more AI features
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Math.random().toString(),
        type: "assistant",
        content: "I'm here to help with staffing decisions. You can ask me questions about candidates, projects, or skills. Click \"Run Staffing Agent\" for AI recommendations!"
      }]);
    }, 500);
  };

  const project = selectedProjectId ? PROJECTS.find(p => p.projectId === selectedProjectId) : null;

  return (
    <div className="flex flex-col h-full gap-4">
      {project && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Selected Project</CardTitle>
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="font-semibold">{project.role}</p>
                <p className="text-xs text-gray-600">{project.projectId} • CL {project.requiredCL}</p>
              </div>
              <Button
                onClick={handleRunStaffingAgent}
                disabled={isLoading}
                className="gap-2"
                size="sm"
              >
                {isLoading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" />Running...</>
                ) : (
                  <>▶ Run Staffing Agent</>
                )}
              </Button>
            </div>
          </CardHeader>
        </Card>
      )}

      {!project && (
        <Alert className="bg-amber-50 border-amber-200">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800 text-sm">
            Select a project to start staffing analysis
          </AlertDescription>
        </Alert>
      )}

      <div className="flex-1 overflow-y-auto space-y-4 rounded-lg border bg-white p-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.type === "assistant" ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`max-w-xs lg:max-w-md xl:max-w-lg px-3 py-2 rounded-lg text-sm whitespace-pre-wrap ${
                msg.type === "assistant"
                  ? "bg-gray-100 text-gray-900"
                  : "bg-blue-500 text-white"
              }`}
            >
              {msg.content.split("\n").map((line, i) => {
                // Handle markdown-like formatting
                if (line.startsWith("**") && line.endsWith("**")) {
                  return <p key={i} className="font-semibold">{line.replace(/\*\*/g, "")}</p>;
                }
                if (line.startsWith("•")) {
                  return <p key={i} className="ml-2">{line}</p>;
                }
                if (line.includes("[") && line.includes("](")) {
                  const match = line.match(/\[(.*?)\]\((.*?)\)/);
                  if (match) {
                    return (
                      <a
                        key={i}
                        href={match[2]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {match[1]}
                      </a>
                    );
                  }
                }
                return <p key={i}>{line}</p>;
              })}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="flex gap-2">
        <Input
          placeholder="Ask about candidates, skills, or projects..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          className="text-sm"
        />
        <Button
          type="submit"
          disabled={isLoading || !input.trim()}
          size="icon"
          className="w-10 h-10"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}
