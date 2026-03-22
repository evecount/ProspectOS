
"use client"

import { useState } from 'react'
import { Sparkles, Loader2, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Lead } from '@/lib/mock-data'
import { generateOutreachSuggestions, GenerateOutreachSuggestionsOutput } from '@/ai/flows/generate-outreach-suggestions'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

export function OutreachPanel({ lead }: { lead: Lead }) {
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<GenerateOutreachSuggestionsOutput | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const result = await generateOutreachSuggestions({
        firstName: lead.firstName,
        lastName: lead.lastName,
        jobTitle: lead.jobTitle,
        companyName: lead.companyName,
        industry: lead.industry,
        companySize: lead.companySize,
        location: lead.location,
        companyDescription: lead.companyDescription,
        jobDescription: lead.jobDescription
      })
      setSuggestions(result)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <Card className="bg-card/50 border-white/5 terminal-glow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="h-4 w-4 text-primary" />
              AI Outreach Assistant
            </CardTitle>
            <CardDescription>Personalized talking points for {lead.firstName}</CardDescription>
          </div>
          <Button 
            onClick={handleGenerate} 
            disabled={loading} 
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
            Generate
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {suggestions ? (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-secondary mb-3 uppercase tracking-wider">Outreach Angles</h4>
                <div className="space-y-3">
                  {suggestions.outreachSuggestions.map((s, i) => (
                    <div key={i} className="group relative p-3 rounded-md bg-muted/40 border border-white/5 hover:border-primary/20 transition-all">
                      <p className="text-sm leading-relaxed">{s}</p>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 h-6 w-6"
                        onClick={() => copyToClipboard(s, `s-${i}`)}
                      >
                        {copied === `s-${i}` ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-secondary mb-3 uppercase tracking-wider">Key Talking Points</h4>
                <div className="space-y-2">
                  {suggestions.keyTalkingPoints.map((tp, i) => (
                    <div key={i} className="flex gap-3 items-start p-2 border-b border-white/5 last:border-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <p className="text-sm">{tp}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        ) : (
          <div className="h-[300px] flex flex-col items-center justify-center text-center p-6 bg-muted/20 rounded-lg border border-dashed border-white/10">
            <Cpu className="h-10 w-10 text-muted-foreground mb-4 opacity-20" />
            <p className="text-muted-foreground text-sm">
              Click generate to analyze {lead.companyName}'s data and craft the perfect message.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
