
"use client"

import { useState } from 'react'
import { FolderPlus, FileText, Trash2, Download, ExternalLink, Mail, Phone, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { useProspectStore } from '@/lib/store'
import { GLOBAL_LEADS } from '@/lib/mock-data'
import { Badge } from '@/components/ui/badge'

export default function ListsPage() {
  const { savedLists, unlockedLeads, addList } = useProspectStore()
  const [activeListId, setActiveListId] = useState(savedLists[0]?.id)

  const activeList = savedLists.find(l => l.id === activeListId)
  
  // Show unlocked leads for the list, or all unlocked leads if it's the default view
  const displayLeads = GLOBAL_LEADS.filter(lead => 
    unlockedLeads.includes(lead.id) && 
    (!activeList || activeList.leadIds.length === 0 || activeList.leadIds.includes(lead.id))
  )

  const handleExportCSV = () => {
    if (displayLeads.length === 0) return
    
    const headers = ['First Name', 'Last Name', 'Job Title', 'Email', 'Phone', 'Company', 'Industry', 'Location']
    const rows = displayLeads.map(l => [
      l.firstName, l.lastName, l.jobTitle, l.email, l.phone, l.companyName, l.industry, l.location
    ])
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers, ...rows].map(e => e.join(",")).join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `${activeList?.name || 'unlocked_leads'}.csv`)
    document.body.appendChild(link)
    link.click()
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold">Lead Management</h1>
          <p className="text-muted-foreground">Manage your folders and exported contact data</p>
        </div>
        <Button onClick={() => {
          const name = prompt("Enter list name:")
          if (name) addList(name)
        }} className="bg-primary text-primary-foreground">
          <FolderPlus className="h-4 w-4 mr-2" />
          Create New Folder
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-2">Folders</h3>
          <div className="space-y-1">
            {savedLists.map((list) => (
              <Button
                key={list.id}
                variant={activeListId === list.id ? "secondary" : "ghost"}
                className={`w-full justify-between group ${activeListId === list.id ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground'}`}
                onClick={() => setActiveListId(list.id)}
              >
                <div className="flex items-center gap-2">
                  <FileText className={`h-4 w-4 ${activeListId === list.id ? 'text-primary' : ''}`} />
                  {list.name}
                </div>
                <Badge variant="outline" className="text-[10px] group-hover:bg-primary/20">{list.leadIds.length || 0}</Badge>
              </Button>
            ))}
          </div>
          
          <div className="pt-6">
            <Card className="bg-muted/10 border-white/5 border-dashed">
              <CardContent className="p-4 text-center">
                <p className="text-xs text-muted-foreground mb-3">Total Unlocked Contacts</p>
                <div className="text-2xl font-bold text-secondary">{unlockedLeads.length}</div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{activeList?.name || "All Contacts"}</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleExportCSV} disabled={displayLeads.length === 0} className="border-white/5">
                <Download className="h-4 w-4 mr-2" />
                Export as CSV
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-white/5 bg-card/20 overflow-hidden backdrop-blur-sm">
            <Table>
              <TableHeader className="bg-muted/20">
                <TableRow>
                  <TableHead>Contact</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Email & Phone</TableHead>
                  <TableHead className="text-right">Manage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayLeads.map((lead) => (
                  <TableRow key={lead.id} className="hover:bg-white/5 border-white/5 group transition-colors">
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold">{lead.firstName} {lead.lastName}</span>
                        <span className="text-xs text-muted-foreground">{lead.jobTitle}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{lead.companyName}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 text-xs">
                        <div className="flex items-center gap-2 text-secondary">
                          <Mail className="h-3 w-3" />
                          {lead.email}
                        </div>
                        <div className="flex items-center gap-2 text-secondary">
                          <Phone className="h-3 w-3" />
                          {lead.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-card border-white/10">
                          <DropdownMenuItem className="gap-2">
                            <ExternalLink className="h-4 w-4" /> View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive gap-2">
                            <Trash2 className="h-4 w-4" /> Remove from list
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {displayLeads.length === 0 && (
              <div className="py-20 text-center space-y-3">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto opacity-10" />
                <p className="text-muted-foreground italic">No contacts in this list yet.</p>
                <Button variant="outline" size="sm" asChild className="border-white/10">
                  <a href="/search">Browse Global Database</a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
