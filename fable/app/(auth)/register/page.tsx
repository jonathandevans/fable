import { RegisterForm } from "@/components/register-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, User } from "lucide-react";
import Link from "next/link";

export default function RegisterRoute() {
  return (
    <Card className="max-w-xl mx-auto w-[90%] mt-10">
      <CardHeader>
        <User className="bg-primary/20 p-2 size-15 rounded-full mx-auto text-primary" />
        <CardTitle className="text-center font-semibold text-2xl">
          Create an Account
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        <div>
          <Button className="bg-black text-white w-full">
            <Github />
            Github
          </Button>
        </div>

        <p className="text-center text-muted-foreground">or</p>

        <RegisterForm />
      </CardContent>
      <CardFooter>
        <Button
          variant="link"
          className="text-muted-foreground text-sm mx-auto"
          asChild
        >
          <Link href="/login">Already have an account?</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
