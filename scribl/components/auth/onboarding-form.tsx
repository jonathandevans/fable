"use client";

import { onboardUserAction } from "@/app/(auth)/actions";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useActionState } from "react";

export function OnboardingForm({ userId }: { userId: string }) {
  const [state, action] = useActionState(onboardUserAction, null);

  return (
    <form action={action}>
      <input type="hidden" value={userId} name="userId" />
      <Card className="max-w-xl mx-auto w-[90%] mt-10">
        <CardHeader>
          <CardTitle className="font-semibold text-2xl">
            Onboarding...
          </CardTitle>
          <CardDescription>
            You're almost done! We just need a few extra details to set up your
            account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-y-4">
          <div className="grid gap-y-2">
            <Label>First Name</Label>
            <Input type="text" placeholder="John" name="firstName" />
          </div>
          <div className="grid gap-y-2">
            <Label>Last Name</Label>
            <Input type="text" placeholder="Smith" name="lastName" />
          </div>
          <div className="grid gap-y-2">
            <Label>Username</Label>
            <p className="text-muted-foreground text-xs">
              Usernames can only contain letters, numbers and dashes
            </p>
            <Input type="text" placeholder="johnsmithblogs" name="username" />
          </div>
          {state?.error && (
            <p className="text-xs text-red-500">{state.error}</p>
          )}
        </CardContent>
        <CardFooter>
          <Button className="w-full">Get Started</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
