import {
  AppWindowIcon,
  ArrowLeftRightIcon,
  BellIcon,
  BookOpenTextIcon,
  CreditCardIcon,
  FileTextIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  SmartphoneIcon,
  TagIcon,
  TrophyIcon,
  TvIcon,
  WalletIcon,
  WifiIcon,
  ZapIcon,
} from "@hugeicons/core-free-icons";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link, NavLink } from "react-router";
import { cn } from "cn";

const menus = [
  {
    title: "workspace",
    children: [
      {
        title: "Overview",
        url: "/app",
        icon: LayoutDashboardIcon,
      },
      {
        title: "Transactions",
        url: "/app/transactions",
        icon: WalletIcon,
      },
      {
        title: "Beneficiaries",
        url: "/app/beneficiaries",
        icon: BookOpenTextIcon,
      },
      {
        title: "Rewards",
        url: "/app/rewards",
        icon: TrophyIcon,
      },
    ]
  },
  {
    title: "services",
    children: [
      {
        title: "All services",
        url: "/app/services",
        icon: AppWindowIcon,
      },
      {
        title: "Airtime",
        url: "/app/services/airtime",
        icon: SmartphoneIcon,
      },
      {
        title: "Data",
        url: "/app/services/data",
        icon: WifiIcon,
      },
      {
        title: "Recharge cards",
        url: "/app/services/recharge-card",
        icon: CreditCardIcon,
      },
      {
        title: "Airtime to cash",
        url: "/app/services/airtime-to-cash",
        icon: ArrowLeftRightIcon,
      },
      {
        title: "Cable TV",
        url: "/app/services/cable-tv",
        icon: TvIcon,
      },
      {
        title: "Electricity",
        url: "/app/services/electricity",
        icon: ZapIcon,
      },
      {
        title: "Exam cards",
        url: "/app/services/exam-card",
        icon: FileTextIcon,
      },
    ],
  },
  {
    title: "others",
    children: [
      {
        title: "Pricing",
        url: "/app/pricing",
        icon: TagIcon,
      },
      {
        title: "Notifications",
        url: "/app/notifications",
        icon: BellIcon,
      },
    ]
  }
];

export function DashbaordSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="h-18 justify-center px-4">
        <Link to="/app" className="flex items-center">
          <img
            src="/logo.png"
            width={120}
            height={40}
            alt="Subs.NG"
            className="max-h-10 max-w-full object-contain"
          />
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3">
        {/* Main navigation */}
        {menus.map((menu, index) => (
          <SidebarGroup className="" key={index}>
            <SidebarGroupLabel className="uppercase mb-2 px-3 text-xs font-medium tracking-wider text-muted-foreground">
              {menu.title}
            </SidebarGroupLabel>

            <SidebarMenu className="gap-1">
              {menu.children?.map((item) => {
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      render={({ className, ...props }) => (
                        <NavLink
                          to={item.url}
                          {...props}
                          className={({ isActive }) => cn(
                            className,
                            "h-10 rounded-lg px-3",
                            isActive && "bg-primary/10 font-medium text-primary"
                          )}
                        >
                          <HugeiconsIcon icon={item.icon} className="size-4.5" />
                          <span>{item.title}</span>
                        </NavLink>
                      )}
                    />
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Account settings */}
      <SidebarFooter className="border-t p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={({ className, ...props }) => (
                <NavLink
                  {...props}
                  to="/app/settings"
                  className={({ isActive }) => cn(
                    className,
                    "h-auto min-h-12 rounded-lg px-2 py-2 flex",
                    isActive && "bg-primary/10 font-medium text-primary"
                  )}
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <HugeiconsIcon icon={SettingsIcon} className="size-5" />
                  </div>

                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span className="truncate text-sm font-medium">
                      Account Settings
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      Manage your account
                    </span>
                  </div>
                </NavLink>
              )}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
