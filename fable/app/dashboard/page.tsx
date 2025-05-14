import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function DashboardRoute() {
  return (
    <>
      <p>dashboard</p>
      <LogoutLink>Log out</LogoutLink>
    </>
  );
}
