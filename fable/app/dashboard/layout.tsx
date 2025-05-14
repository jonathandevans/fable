import {
  getKindeServerSession,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Logo from "@/public/icon-rounded.png";
import Image from "next/image";
import styles from "./page.module.css";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return redirect("/api/auth/login");

  return (
    <>
      <header className={styles.header}>
        <div>
          <Image src={Logo} alt="Logo" width={100} height={100} />
          <p>Fable</p>
        </div>

        <ul>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/dashboard/sites">Sites</Link>
          </li>
          <li>
            <Link href="/dashboard/pricing">Pricing</Link>
          </li>
        </ul>

        <LogoutLink>Log out</LogoutLink>
      </header>
      {children}
    </>
  );
}
