import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function HomeRoute() {
  return (
    <div>
      <LoginLink>Log in</LoginLink>
      <RegisterLink>Register</RegisterLink>
    </div>
  );
}
