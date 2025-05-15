import {
  getKindeServerSession,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Logo from "@/public/icon-transparent.png";
import Image from "next/image";
import styles from "./page.module.css";
import { DashboardLinks } from "@/components/dashboard-links/dashboard-links";

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
        <div className={styles.logo}>
          <Image src={Logo} alt="Logo" width={60} height={60} />
          <p>Fable</p>
        </div>

        <nav className={styles.nav}>
          <DashboardLinks />
        </nav>

        <div className={styles.account}>
          <LogoutLink>Log out</LogoutLink>
        </div>
      </header>
      {children}
    </>
  );
}
