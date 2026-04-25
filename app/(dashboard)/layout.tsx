import Link from "next/link";
import { Activity, LayoutDashboard, Package, Settings } from "lucide-react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-muted/30 hidden md:flex flex-col">
        <div className="p-4 border-b">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
            <Activity className="h-5 w-5" />
            Pulse Agent
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted transition-colors"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/runs"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted transition-colors"
          >
            <Activity className="h-4 w-4" />
            Run History
          </Link>
          <Link
            href="/products"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted transition-colors"
          >
            <Package className="h-4 w-4" />
            Products
          </Link>
        </nav>
        <div className="p-4 border-t">
          <Link
            href="/settings"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted transition-colors"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        <header className="h-14 border-b flex items-center px-6 md:hidden">
          <Link href="/" className="font-semibold">Pulse Agent</Link>
        </header>
        <div className="flex-1 p-6">{children}</div>
      </main>
    </div>
  );
}
