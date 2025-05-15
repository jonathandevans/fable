"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./dashboard-links.module.css";

export function DashboardLinks() {
  const pathname = usePathname();

  return (
    <ul>
      <li>
        <Link
          href="/dashboard"
          className={pathname === "/dashboard" ? styles.active : ""}
        >
          Dashboard
        </Link>
      </li>
      <li>
        <Link
          href="/dashboard/sites"
          className={pathname === "/sites" ? styles.active : ""}
        >
          Sites
        </Link>
      </li>
      <li>
        <Link
          href="/dashboard/pricing"
          className={pathname === "/pricing" ? styles.active : ""}
        >
          Pricing
        </Link>
      </li>
    </ul>
  );
}
