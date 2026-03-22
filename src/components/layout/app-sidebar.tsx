
"use client"

import * as React from "react"
import { Search, Database, ListChecks, ShieldAlert, BarChart3, Settings, LogOut, Cpu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { useProspectStore } from "@/lib/store"
import { Badge } from "@/components/ui/badge"

const navigation = [
  { name: "Search leads", href: "/search", icon: Search },
  { name: "My Lists", href: "/lists", icon: ListChecks },
  { name: "Global Database", href: "/", icon: Database },
  { name: "Outreach Assistant", href: "/outreach", icon: Cpu },
]

const adminNavigation = [
  { name: "Admin Dashboard", href: "/admin", icon: ShieldAlert },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { credits } = useProspectStore()

  return (
    <Sidebar collapsible="icon" className="border-r border-white/5">
      <SidebarHeader className="h-16 flex items-center px-6">
        <Link href="/" className="flex items-center gap-2 font-headline font-bold text-xl text-primary">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground">
            P
          </div>
          <span className="group-data-[collapsible=icon]:hidden">ProspectOS</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.name}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminNavigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.name}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="group-data-[collapsible=icon]:hidden mb-4 p-3 rounded-lg bg-card border border-white/5">
          <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Available Credits</div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-secondary">{credits}</span>
            <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">PRO</Badge>
          </div>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Logout">
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
