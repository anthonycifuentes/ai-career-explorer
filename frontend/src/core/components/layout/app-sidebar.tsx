import {
  Bot
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/core/components/ui/sidebar"
import { Link } from "@tanstack/react-router"
import clsx from "clsx"

// Menu items.
const items = [
  {
    title: "Assistant",
    url: "/assistant",
    icon: Bot,
  },
]

export function AppSidebar({ pathname }: { pathname: string }) {
  return (
    <Sidebar variant="inset" collapsible="offcanvas" className="bg-accent">
      <SidebarContent className="bg-accent">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={pathname === item.url}
                    asChild
                    className={clsx(
                      "hover:bg-sidebar-primary/80 hover:text-sidebar-primary-foreground py-5",
                      pathname === item.url &&
                        "!bg-sidebar-primary !text-sidebar-primary-foreground"
                    )}
                  >
                    <Link to={item.url} className="">
                      <item.icon />
                      <span className="truncate text-base">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
