"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { CircleUser, NotebookPen } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { DropdownMenuSeparator } from "../ui/dropdown-menu";
import { logoutAction } from "@/app/(auth)/actions";

const navLinks = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Sites", href: "/dashboard/sites" },
  { name: "Pricing", href: "/dashboard/pricing" },
];

export function DashboardHeader() {
  const pathname = usePathname();

  return (
    <header className="flex justify-between items-center max-w-6xl mx-auto py-4 w-[95%]">
      <div className="flex gap-x-25 items-center">
        <div className="flex items-center gap-x-2 bg-primary py-2 px-4 text-white font-semibold rounded-xl">
          <NotebookPen />
          <p>Scribl.dev</p>
        </div>

        <nav className="flex justify-center gap-x-8 text-center">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                pathname === item.href ? "text-zinc-900" : "text-zinc-900/75",
                "hover:text-zinc-900 transition-all"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="secondary" className="rounded-full">
              <CircleUser className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={async () => {await logoutAction()}}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
