"use client";

import Link from "next/link";
import { NotebookPen } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Sites", href: "/dashboard/sites" },
  { name: "Pricing", href: "/dashboard/pricing" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="flex justify-between items-center max-w-6xl mx-auto py-4 w-[95%]">
      <div className="flex gap-x-25 items-center">
        <div className="flex items-center gap-x-2 bg-primary py-2 px-4 text-white font-semibold rounded-xl">
          <NotebookPen />
          <p>Scribl.dev</p>
        </div>

        {/* <nav className="flex justify-center gap-x-8 text-center">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-black hover:underline transition-all"
            >
              {item.name}
            </Link>
          ))}
        </nav> */}
      </div>

      <div className="flex gap-x-4">
        <Link href="/login" className="px-4 py-2 hover:underline">
          Log in
        </Link>
        <Link
          href="/register"
          className="bg-amber-400 px-4 py-2 hover:underline"
        >
          Register
        </Link>
      </div>
    </header>
  );
}
