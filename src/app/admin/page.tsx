
"use client"

import { useState } from 'react'
import { Upload, Database, Users, ShieldAlert, CheckCircle2, AlertCircle, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { useProspectStore } from '@/lib/store'
import { useToast } from '@/hooks/use-toast'

export default function AdminPage() {
  const { addCredits } = useProspectStore()
  const { toast } = useToast()
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [creditAmount, setCreditAmount] = useState(100)

  const handleSimulateUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          toast({
            title: "Bulk Data Upload Successful",
            description: "1,500 new leads have been indexed into the global database.",
          })
          return 100
        }
        return prev + 10
      })
    }, 400)
  }

  const handleGrantCredits = () => {
    addCredits(Number(creditAmount))
    toast({
      title: "Credits Granted",
      description: `Successfully added ${creditAmount} credits to the account.`,
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      <div className="flex items-center gap-4 p-4 bg-primary/10 border border-primary/20 rounded-xl mb-8">
        <ShieldAlert className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold font-headline">ProspectOS Admin Portal</h1>
          <p className="text-sm text-primary/80 font-medium italic">Authorized internal users only</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card/40 border-white/5 terminal-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-secondary" />
              Lead Index Management
            </CardTitle>
            <CardDescription>Bulk upload lead data via CSV parsing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center space-y-4 hover:border-primary/50 transition-colors group cursor-pointer">
              <Upload className="h-10 w-10 text-muted-foreground mx-auto group-hover:text-primary transition-colors" />
              <div>
                <p className="text-sm font-medium">Click or drag CSV file to upload</p>
                <p className="text-xs text-muted-foreground mt-1">Recommended format: UTF-8 CSV (Max 50MB)</p>
              </div>
            </div>
            
            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>Processing CSV rows...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            <Button 
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90" 
              onClick={handleSimulateUpload}
              disabled={isUploading}
            >
              Start Bulk Import
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card/40 border-white/5 terminal-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Account Ledger
            </CardTitle>
            <CardDescription>Manage user credit balances and permissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase">Grant New Credits</label>
                <div className="flex gap-2">
                  <Input 
                    type="number" 
                    value={creditAmount} 
                    onChange={(e) => setCreditAmount(Number(e.target.value))}
                    className="bg-muted/40 border-white/5" 
                  />
                  <Button onClick={handleGrantCredits} className="bg-primary hover:bg-primary/90">
                    <Plus className="h-4 w-4 mr-1" /> Add
                  </Button>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-muted/20 border border-white/5 space-y-3">
                <h4 className="text-xs font-bold text-muted-foreground uppercase">Platform Status</h4>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    Ledger Sync
                  </div>
                  <span className="text-green-400">Active</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    Search Indexer
                  </div>
                  <span className="text-green-400">Stable</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-yellow-400">
                    <AlertCircle className="h-4 w-4" />
                    API Rate Limits
                  </div>
                  <span className="text-yellow-400">84% Load</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/40 border-white/5">
        <CardHeader>
          <CardTitle className="text-lg">Recent Audit Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { time: "2 mins ago", user: "system@prospectos.io", action: "Grant Credits", target: "demo-user-1", value: "+500" },
              { time: "15 mins ago", user: "admin@prospectos.io", action: "Bulk Upload", target: "global_leads", value: "1,500 records" },
              { time: "1 hour ago", user: "system@prospectos.io", action: "Ledger Backup", target: "s3-bucket-primary", value: "SUCCESS" },
            ].map((log, i) => (
              <div key={i} className="flex items-center justify-between text-xs py-2 border-b border-white/5 last:border-0 font-mono">
                <div className="flex gap-4">
                  <span className="text-muted-foreground">{log.time}</span>
                  <span className="text-primary">{log.user}</span>
                  <span className="text-foreground">{log.action}</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-muted-foreground">{log.target}</span>
                  <span className="text-secondary font-bold">{log.value}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
