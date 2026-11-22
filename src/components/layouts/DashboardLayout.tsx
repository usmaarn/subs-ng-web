import type { ReactNode } from "react"
import { Link, useLocation, useNavigate } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  DashboardSquare01Icon,
  Wallet01Icon,
  TransactionHistoryIcon,
  Invoice01Icon,
  Settings01Icon,
  CustomerSupportIcon,
  Tag01Icon,
  GiftIcon,
  Logout03Icon,
  ArrowDown01Icon,
  SmartPhone01Icon,
  Wifi01Icon,
  Tv01Icon,
  ZapIcon,
  CreditCardIcon,
  ArrowLeftRightIcon,
  File02Icon,
} from "@hugeicons/core-free-icons"

import { Brand } from "@/components/Brand"
import { NotificationMenu } from "@/components/NotificationMenu"
import { UserMenu } from "@/components/UserMenu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { clearSession } from "@/server/session"
import { toast } from "@/components/ui/toast"

type AppLayoutProps = {
  title: string
  description?: string
  children: ReactNode
  action?: ReactNode
}

const serviceItems = [
  { label: "Airtime", to: "/app/services/airtime", icon: SmartPhone01Icon },
  { label: "Data", to: "/app/services/data", icon: Wifi01Icon },
  { label: "Cable TV", to: "/app/services/cable-tv", icon: Tv01Icon },
  { label: "Electricity", to: "/app/services/electricity", icon: ZapIcon },
  { label: "Recharge Cards", to: "/app/services/recharge-card", icon: CreditCardIcon },
  { label: "Airtime to Cash", to: "/app/services/airtime-to-cash", icon: ArrowLeftRightIcon },
  { label: "Exam Cards", to: "/app/services/exam-card", icon: File02Icon },
] as const

const mainItems = [
  { label: "Dashboard", to: "/app", icon: DashboardSquare01Icon },
  { label: "Wallet", to: "/app/wallet", icon: Wallet01Icon },
  { label: "Transactions", to: "/app/transactions", icon: TransactionHistoryIcon },
  { label: "Commissions", to: "/app/commission", icon: GiftIcon },
  { label: "Pricing", to: "/app/pricing", icon: Tag01Icon },
] as const

const accountItems = [
  { label: "Settings", to: "/app/settings", icon: Settings01Icon },
  { label: "Support", to: "/app/support", icon: CustomerSupportIcon },
] as const

export function AppLayout({ title, description, children, action }: AppLayoutProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const pathname = location.pathname
  const servicesActive = pathname.startsWith("/app/services")

  async function handleLogout() {
    await clearSession()
    toast.add({ type: "success", description: "Signed out successfully" })
    await navigate({ to: "/login" })
  }

  return (
    <SidebarProvider>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader className="border-b border-sidebar-border/60 px-4 py-4">
          <div className="flex items-center gap-2 overflow-hidden">
            <Brand />
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainItems.map((item) => {
                  const active = item.to === "/app" ? pathname === "/app" : pathname.startsWith(item.to)
                  return (
                    <SidebarMenuItem key={item.to}>
                      <SidebarMenuButton
                        isActive={active}
                        tooltip={item.label}
                        render={<Link to={item.to} />}
                      >
                        <HugeiconsIcon icon={item.icon} />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}

                <Collapsible defaultOpen={servicesActive} className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger
                      render={
                        <SidebarMenuButton isActive={servicesActive} tooltip="Services">
                          <HugeiconsIcon icon={Invoice01Icon} />
                          <span>Services</span>
                          <HugeiconsIcon icon={ArrowDown01Icon} className="ml-auto transition-transform group-data-[open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      }
                    />
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {serviceItems.map((item) => (
                          <SidebarMenuSubItem key={item.to}>
                            <SidebarMenuSubButton
                              isActive={pathname === item.to}
                              render={<Link to={item.to} />}
                            >
                              <HugeiconsIcon icon={item.icon} />
                              <span>{item.label}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          <SidebarGroup>
            <SidebarGroupLabel>Account</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {accountItems.map((item) => (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton
                      isActive={pathname.startsWith(item.to)}
                      tooltip={item.label}
                      render={<Link to={item.to} />}
                    >
                      <HugeiconsIcon icon={item.icon} />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-sidebar-border/60 p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleLogout} tooltip="Sign out">
                <HugeiconsIcon icon={Logout03Icon} />
                <span>Sign out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:px-6">
          <SidebarTrigger className="-ml-1" />
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-semibold sm:text-lg">{title}</h1>
            {description && <p className="hidden truncate text-xs text-muted-foreground sm:block">{description}</p>}
          </div>
          {action}
          <div className="ml-auto flex items-center gap-2">
            <NotificationMenu />
            <UserMenu />
          </div>
        </header>

        <div className="flex-1 p-4 sm:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
