import { LoginForm } from "@/components/auth/login-form";
import { OAuthLogin } from "@/components/auth/oauth-login";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "lucide-react";
import Link from "next/link";

export default function LoginRoute() {
  return (
    <Card className="max-w-xl mx-auto w-[90%] mt-10">
      <CardHeader>
        <User className="bg-primary/20 p-2 size-15 rounded-full mx-auto text-primary" />
        <CardTitle className="text-center font-semibold text-2xl">
          Log In
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        <div>
          <OAuthLogin />
        </div>

        <p className="text-center text-muted-foreground">or</p>

        <LoginForm />
      </CardContent>
      <CardFooter>
        <Button
          variant="link"
          className="text-muted-foreground text-sm mx-auto"
        >
          <Link href="/register">Don't have an account yet?</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
