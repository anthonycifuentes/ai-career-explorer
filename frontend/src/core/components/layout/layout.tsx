import { Outlet, useRouterState } from "@tanstack/react-router"
import { SidebarInset, SidebarProvider } from "../ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { SiteHeader } from "./site-header"

const Layout = () => {
  const state = useRouterState()
  const currentPath = state.location.pathname
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 56)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
      className="!bg-accent"
    >
      <AppSidebar pathname={currentPath} />
      <SidebarInset className="max-h-screen-dvh-minus-spacing">
        <SiteHeader />
        <main className="flex flex-1 flex-col overflow-y-auto">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Layout
