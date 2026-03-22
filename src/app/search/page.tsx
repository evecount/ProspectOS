
"use client"

import { useState, useMemo } from 'react'
import { Filter, Search, Download, Plus, ChevronRight, User, Mail, Phone, Building2, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { GLOBAL_LEADS, Lead } from '@/lib/mock-data'
import { useProspectStore } from '@/lib/store'
import { UnlockButton } from '@/components/leads/unlock-button'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog'
import { OutreachPanel } from '@/components/leads/outreach-panel'

export default function SearchPage() {
  const { unlockedLeads } = useProspectStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [industryFilter, setIndustryFilter] = useState('all')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  const filteredLeads = useMemo(() => {
    return GLOBAL_LEADS.filter(lead => {
      const matchesSearch = (
        lead.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
      )
      const matchesIndustry = industryFilter === 'all' || lead.industry === industryFilter
      return matchesSearch && matchesIndustry
    })
  }, [searchQuery, industryFilter])

  const industries = Array.from(new Set(GLOBAL_LEADS.map(l => l.industry)))

  const obfuscate = (str: string) => {
    if (!str) return '---'
    const parts = str.split('@')
    if (parts.length === 2) {
      return `${parts[0].slice(0, 2)}***@${parts[1]}`
    }
    return `${str.slice(0, 3)}***${str.slice(-4)}`
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold">Search Leads</h1>
          <p className="text-muted-foreground">Query the global index of {GLOBAL_LEADS.length.toLocaleString()} verified leads</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-white/5 h-10">
            <Download className="h-4 w-4 mr-2" />
            Export Results
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground h-10">
            <Plus className="h-4 w-4 mr-2" />
            Create Saved List
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="space-y-6 lg:col-span-1">
          <div className="bg-card/40 p-4 rounded-xl border border-white/5 space-y-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-secondary uppercase tracking-wider">
              <Filter className="h-4 w-4" />
              Advanced Filters
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Lead Name / Role</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search keywords..." 
                  className="pl-9 bg-muted/40 border-white/5"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Industry</label>
              <Select onValueChange={setIndustryFilter} defaultValue="all">
                <SelectTrigger className="bg-muted/40 border-white/5">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  {industries.map(ind => (
                    <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Company Size</label>
              <Select defaultValue="all">
                <SelectTrigger className="bg-muted/40 border-white/5">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sizes</SelectItem>
                  <SelectItem value="1-10">1-10 Employees</SelectItem>
                  <SelectItem value="11-50">11-50 Employees</SelectItem>
                  <SelectItem value="51-200">51-200 Employees</SelectItem>
                  <SelectItem value="201+">201+ Employees</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Location</label>
              <Input placeholder="City, Country..." className="bg-muted/40 border-white/5" />
            </div>

            <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-foreground" onClick={() => {
              setSearchQuery('')
              setIndustryFilter('all')
            }}>
              Reset all filters
            </Button>
          </div>
        </div>

        {/* Results Table */}
        <div className="lg:col-span-3">
          <div className="rounded-xl border border-white/5 bg-card/20 overflow-hidden backdrop-blur-sm">
            <Table>
              <TableHeader className="bg-muted/20">
                <TableRow>
                  <TableHead className="w-[200px]">Lead</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Contact Info</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => {
                  const isUnlocked = unlockedLeads.includes(lead.id)
                  return (
                    <TableRow key={lead.id} className="hover:bg-white/5 border-white/5 group transition-colors">
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-bold text-foreground">{lead.firstName} {lead.lastName}</span>
                          <span className="text-xs text-muted-foreground">{lead.jobTitle}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{lead.companyName}</span>
                          <Badge variant="outline" className="w-fit text-[10px] h-4 mt-1 border-white/10 font-normal">
                            {lead.industry}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1 text-xs">
                          <div className="flex items-center gap-2">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            <span className={isUnlocked ? "text-secondary" : "text-muted-foreground font-mono italic"}>
                              {isUnlocked ? lead.email : obfuscate(lead.email)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            <span className={isUnlocked ? "text-secondary" : "text-muted-foreground font-mono italic"}>
                              {isUnlocked ? lead.phone : obfuscate(lead.phone)}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <UnlockButton leadId={lead.id} isUnlocked={isUnlocked} />
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                disabled={!isUnlocked}
                                className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10"
                              >
                                <ChevronRight className="h-5 w-5" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl bg-background border-white/10 max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Lead Detail Profile</DialogTitle>
                              </DialogHeader>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-6">
                                <div className="md:col-span-1 space-y-6">
                                  <div className="space-y-4">
                                    <div className="p-4 rounded-xl bg-muted/30 border border-white/5">
                                      <h3 className="text-xl font-bold mb-1">{lead.firstName} {lead.lastName}</h3>
                                      <p className="text-primary text-sm font-medium">{lead.jobTitle}</p>
                                    </div>
                                    <div className="space-y-3 px-1">
                                      <div className="flex items-center gap-3 text-sm">
                                        <Building2 className="h-4 w-4 text-muted-foreground" />
                                        <span>{lead.companyName}</span>
                                      </div>
                                      <div className="flex items-center gap-3 text-sm">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <span>{lead.location}</span>
                                      </div>
                                      <div className="flex items-center gap-3 text-sm">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-secondary">{lead.email}</span>
                                      </div>
                                      <div className="flex items-center gap-3 text-sm">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-secondary">{lead.phone}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="space-y-3">
                                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">About {lead.companyName}</h4>
                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                      {lead.companyDescription}
                                    </p>
                                  </div>
                                </div>
                                <div className="md:col-span-2">
                                  <OutreachPanel lead={lead} />
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            {filteredLeads.length === 0 && (
              <div className="py-20 text-center space-y-3">
                <Search className="h-12 w-12 text-muted-foreground mx-auto opacity-20" />
                <p className="text-muted-foreground">No leads found matching your filters.</p>
                <Button variant="link" onClick={() => { setSearchQuery(''); setIndustryFilter('all'); }}>Clear all filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
