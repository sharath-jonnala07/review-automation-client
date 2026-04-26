"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BookOpen,
  LayoutDashboard,
  Package,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  icon: typeof Activity;
  exact?: boolean;
};

const primaryNav: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/runs", label: "Run History", icon: Activity },
  { href: "/products", label: "Products", icon: Package },
];

const secondaryNav: NavItem[] = [
  { href: "/design-system", label: "Design System", icon: BookOpen, exact: true },
  { href: "/settings", label: "Settings", icon: Settings, exact: true },
];

function isActivePath(pathname: string, item: NavItem) {
  if (item.exact) {
    return pathname === item.href;
  }
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

function SidebarLink({ item, pathname }: { item: NavItem; pathname: string }) {
  const active = isActivePath(pathname, item);
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "border-[#10756D]/15 bg-[#E7F3F1] text-[#0A524C] shadow-[inset_0_0_0_1px_rgba(16,117,109,0.08)]"
          : "border-transparent text-[#334155] hover:border-[#10756D]/10 hover:bg-[#E7F3F1] hover:text-[#10756D]"
      )}
    >
      <Icon className="h-4 w-4" />
      {item.label}
    </Link>
  );
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#FAF6F0]">
      <aside className="hidden min-h-screen w-64 shrink-0 flex-col border-r border-[#E6DDD0] bg-white/55 backdrop-blur-xl md:flex">
        <div className="border-b border-[#E6DDD0] p-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#10756D] text-white">
              <Activity className="h-5 w-5" />
            </span>
            Pulse Agent
          </Link>
        </div>
        <nav className="flex-1 space-y-2 p-4">
          {primaryNav.map((item) => (
            <SidebarLink key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>
        <div className="space-y-2 border-t border-[#E6DDD0] p-4">
          {secondaryNav.map((item) => (
            <SidebarLink key={item.href} item={item} pathname={pathname} />
          ))}
        </div>
      </aside>

      <main className="flex min-h-screen flex-1 flex-col">
        <header className="flex min-h-14 flex-wrap items-center gap-3 border-b border-[#E6DDD0] bg-white/70 px-4 py-3 md:hidden">
          <Link href="/" className="font-semibold">
            Pulse Agent
          </Link>
          <nav className="ml-auto flex flex-wrap gap-2 text-xs font-semibold text-[#64748B]">
            {primaryNav.concat(secondaryNav.filter((item) => item.href !== "/design-system")).map((item) => {
              const active = isActivePath(pathname, item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(active ? "text-[#0A524C]" : undefined)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>
        <div className="flex-1 p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
