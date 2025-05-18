"use client";

import { confirmEmail } from "@/app/(auth)/actions";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, Loader2 } from "lucide-react";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyRoute() {
  const { userId } = useParams();
  const [waiting, setWaiting] = useState<boolean>(true);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await confirmEmail(userId as string);
      if (res.verified) {
        setWaiting(false);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!waiting) {
      const timeout = setTimeout(() => {
        redirect("/onboarding");
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [waiting]);

  return (
    <Card className="max-w-xl mx-auto w-[90%] mt-10">
      <CardHeader>
        {waiting ? (
          <>
            <Loader2 className="size-15 animate-spin text-primary bg-primary/20 rounded-full p-2 mx-auto" />
            <CardTitle className="text-xl mt-2">
              Verify your email address.
            </CardTitle>
            <CardDescription>
              We've just sent you an email. Head over to your email and click
              the link to verify your account.
            </CardDescription>
          </>
        ) : (
          <>
            <CheckCircle2 className="size-15 text-green-500 bg-green-500/20 rounded-full p-2 mx-auto" />
            <CardTitle className="text-xl mt-2">Almost there...</CardTitle>
            <CardDescription>
              You've verified your account, now we just need a couple more
              details to finish setting up your account.
            </CardDescription>
          </>
        )}
      </CardHeader>
    </Card>
  );
}
