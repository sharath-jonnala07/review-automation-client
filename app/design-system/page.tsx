import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DesignSystemShowcase } from "@/components/layout/design-system-showcase";
import { Button } from "@/components/ui/button";

export default function DesignSystemPage() {
  return (
    <div className="min-h-full bg-[#FAF6F0]">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Button asChild variant="ghost" className="mb-4 text-[#0A524C] hover:bg-white/80 hover:text-[#10756D]">
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            Back to dashboard
          </Link>
        </Button>
        <DesignSystemShowcase />
      </div>
    </div>
  );
}
