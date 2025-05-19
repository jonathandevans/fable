import { DashboardHeader } from "@/components/dashboard/header";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <DashboardHeader />
      <main className="max-w-5xl mx-auto">{children}</main>
    </>
  );
}
