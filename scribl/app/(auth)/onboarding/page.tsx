"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBrowserClient } from "@/lib/supabase/client";
import { notFound } from "next/navigation";

export default async function OnboardingRoute() {
  const supabase = createBrowserClient();
  const { data, error } = await supabase.auth.getUser();
  let userId;
  if (data.user) {
    userId = data.user.id;
  } else notFound();

  return (
    <form>
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
        </CardContent>
        <CardFooter>
          <Button className="w-full">Get Started</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
