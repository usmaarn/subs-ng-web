import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { NotificationMenu } from "@/components/notification-menu";
import { SupportMenu } from "@/components/support-menu";
import { UserMenu } from "@/components/user-menu";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ButtonLink } from "../ui/link";
import { DashbaordSidebar } from "../dashboard/DashboardSidebar";
import { useAuthStore } from "@/stores/auth";

type DashboardLayoutProps = {
  children: React.ReactNode;
  title: string;
  description?: string;
  backUrl?: string;
};

export function DashboardLayout({
  children,
  title,
  description,
  backUrl,
}: DashboardLayoutProps) {
  const user = useAuthStore((s) => s.session?.user ?? null);

  const firstName = user?.name?.split(" ")[0] ?? "there";

  return (
    <SidebarProvider>
      <DashbaordSidebar />

      <main className="w-full p-4 sm:p-6 space-y-4 sm:space-y-8 bg-accent">
        {/* Header */}
        <header className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <SidebarTrigger />
            <span className="truncate sm:text-xl font-semibold">
              Welcome, {firstName}
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <SupportMenu />
            <NotificationMenu />
            <UserMenu user={user} />
          </div>
        </header>

        {/* Main content */}
        <main className="mx-auto w-full max-w-screen-2xl flex-1">
          <div className="mb-6 sm:mb-8">
            <div className="flex items-start gap-2">
              {backUrl && (
                <ButtonLink
                  variant="ghost"
                  size="icon"
                  aria-label="Go back"
                  to={backUrl}
                  className="mt-0.5 shrink-0"
                >
                  <HugeiconsIcon icon={ArrowLeft01Icon} className="size-5" />
                </ButtonLink>
              )}

              <div className="min-w-0">
                <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                  {title}
                </h1>

                {description && (
                  <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                    {description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {children}
        </main>
      </main>
    </SidebarProvider>
  );
}
