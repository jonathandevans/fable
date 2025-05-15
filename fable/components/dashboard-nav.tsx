"use client";

import Image from "next/image";
import Logo from "@/public/icon-transparent.png";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { CircleUser, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { DropdownMenuSeparator } from "./ui/dropdown-menu";

const navLinks = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Sites", href: "/dashboard/sites" },
  { name: "Pricing", href: "/dashboard/pricing" },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <header className="grid grid-cols-3 justify-between items-center max-w-7xl mx-auto py-2 px-[2%] border-b border-zinc-300">
      <div className="flex items-center">
        <Image src={Logo} alt="Logo" width={60} height={60} />
        <p className="font-semibold text-primary">Fable</p>
      </div>

      <nav className="flex justify-center gap-x-8 text-center">
        {navLinks.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              pathname === item.href ? "text-primary" : "text-primary/85",
              "hover:text-primary transition-all"
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="secondary" className="rounded-full">
              <CircleUser className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <LogoutLink>Log out</LogoutLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
