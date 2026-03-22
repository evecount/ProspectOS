
"use client"

import { BarChart, Search, Users, ShieldCheck, Zap, Rocket } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useProspectStore } from '@/lib/store'

export default function Home() {
  const { credits, unlockedLeads } = useProspectStore()

  const stats = [
    { label: "Global Leads Indexed", value: "2.4M", icon: Users, color: "text-blue-400" },
    { label: "Your Credits", value: credits, icon: Zap, color: "text-primary" },
    { label: "Unlocked Leads", value: unlockedLeads.length, icon: ShieldCheck, color: "text-green-400" },
    { label: "Platform Uptime", value: "99.9%", icon: BarChart, color: "text-secondary" },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-12 py-8">
      <div className="space-y-4 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-headline font-black tracking-tight bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient text-transparent bg-clip-text">
          ProspectOS Terminal
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          High-performance sales intelligence and lead enrichment. Precision-engineered for enterprise outreach.
        </p>
        <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 gap-2 font-bold">
            <Link href="/search">
              <Search className="h-5 w-5" />
              Launch Search Engine
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2 border-white/10">
            <Link href="/admin">
              <ShieldCheck className="h-5 w-5" />
              Admin Portal
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="bg-card/40 border-white/5 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold font-headline flex items-center gap-2">
            <Rocket className="h-6 w-6 text-secondary" />
            Quick Start Guide
          </h2>
          <div className="space-y-4">
            {[
              "Filter the global database by industry, size, and role.",
              "Unlock verified contact details using your credits.",
              "Use AI Assistant to generate personalized outreach scripts.",
              "Export your curated lead lists directly to your CRM."
            ].map((step, i) => (
              <div key={i} className="flex gap-4 items-start group">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0 font-bold">
                  {i + 1}
                </div>
                <p className="text-muted-foreground pt-1 leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card/40 rounded-xl p-8 border border-white/5 flex flex-col justify-center items-center text-center space-y-6 terminal-glow">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <Zap className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Need more credits?</h3>
            <p className="text-muted-foreground">Upgrade your plan to unlock high-volume bulk leads and priority support.</p>
          </div>
          <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
            View Pricing Plans
          </Button>
        </div>
      </div>
    </div>
  )
}
