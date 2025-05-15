import { DashboardNav } from "@/components/dashboard-nav";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <DashboardNav />
      <main className="max-w-5xl mx-auto">{children}</main>
    </>
  );
}
