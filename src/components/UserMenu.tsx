import { useNavigate } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { Logout03Icon, Settings01Icon, UserIcon } from "@hugeicons/core-free-icons"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { clearSession } from "@/server/session"
import { toast } from "@/components/ui/toast"

type UserMenuProps = {
  user?: { name?: string; email?: string } | null
}

export function UserMenu({ user }: UserMenuProps) {
  const navigate = useNavigate()
  const name = user?.name || "User"
  const email = user?.email || ""
  const initials = name.split(" ").filter(Boolean).map((p) => p[0]).join("").slice(0, 2).toUpperCase() || "U"

  async function handleLogout() {
    await clearSession()
    toast.add({ type: "success", description: "Signed out" })
    await navigate({ to: "/login" })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50">
        <Avatar size="lg">
          <AvatarFallback className="bg-primary/10 text-primary font-medium">{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 rounded-xl">
        <div className="px-3 py-2.5">
          <p className="truncate text-sm font-medium">{name}</p>
          {email && <p className="truncate text-xs text-muted-foreground">{email}</p>}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate({ to: "/app/settings" })}>
          <HugeiconsIcon icon={UserIcon} className="size-4" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate({ to: "/app/settings" })}>
          <HugeiconsIcon icon={Settings01Icon} className="size-4" /> Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={handleLogout}>
          <HugeiconsIcon icon={Logout03Icon} className="size-4" /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
