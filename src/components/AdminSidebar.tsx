import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  MessageSquare, 
  Server, 
  ChevronLeft,
  Building2,
  BarChart3,
  LogOut
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Services", url: "/services", icon: Server },
  { title: "Clients", url: "/clients", icon: Users },
  { title: "Contact Inquiries", url: "/contacts", icon: MessageSquare },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-gradient-primary text-primary-foreground font-medium shadow-hover border-primary/20" 
      : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground transition-all duration-200";

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} bg-gradient-sidebar shadow-sidebar border-r border-sidebar-border transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarContent className="bg-transparent">
        {/* Logo Section */}
        <div className="p-6 border-b border-sidebar-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Building2 className="h-6 w-6 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-lg font-bold text-sidebar-foreground">SutraIQ</h1>
                <p className="text-xs text-sidebar-foreground/60">Admin Panel</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup className="px-4 py-4">
          <SidebarGroupLabel className="text-sidebar-foreground/80 text-xs font-medium mb-2">
            {!collapsed && "NAVIGATION"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${getNavCls({ isActive: isActive(item.url) })}`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Section */}
        <div className="mt-auto p-4 border-t border-sidebar-border/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-primary-foreground">JD</span>
            </div>
            {!collapsed && (
              <div className="flex-1">
                <p className="text-sm font-medium text-sidebar-foreground">John Doe</p>
                <p className="text-xs text-sidebar-foreground/60">Administrator</p>
              </div>
            )}
          </div>
          {!collapsed && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start gap-2 text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}