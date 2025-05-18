"use client";

import { FormEvent, useActionState, useRef, useTransition } from "react";
import { passwordLoginAction } from "@/app/(auth)/actions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Alert, AlertDescription } from "../ui/alert";

export function LoginForm() {
  const [data, login] = useActionState(passwordLoginAction, undefined);
  const [pending, startTransition] = useTransition();

  const errorRef = useRef<HTMLParagraphElement>(null);
  const emailErrorRef = useRef<HTMLParagraphElement>(null);
  const passwordErrorRef = useRef<HTMLParagraphElement>(null);

  const searchParams = useSearchParams();
  const verified = searchParams.get("verified");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    let valid = true;

    if (formData.get("email") === "") {
      emailErrorRef.current!.innerText = "Missing email address";
      valid = false;
    } else if (
      !(formData.get("email") as string).includes("@") ||
      (formData.get("email") as string).length < 3
    ) {
      emailErrorRef.current!.innerText = "Invalid email address";
      valid = false;
    }

    if (formData.get("password") === "") {
      passwordErrorRef.current!.innerText = "Missing password";
      valid = false;
    }

    if (valid)
      startTransition(() => {
        login(formData);
      });
  };

  return (
    <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
      {verified && <Alert>
        <AlertDescription>
          Your account has been verified, log back in to complete the onboarding
          process.
        </AlertDescription>
      </Alert>}

      <div className="grid gap-y-2">
        <Label>Email</Label>
        <Input
          name="email"
          disabled={pending}
          onChange={() => {
            errorRef.current!.innerText = "";
            emailErrorRef.current!.innerText = "";
          }}
        />
        <p className="text-xs text-red-500" ref={emailErrorRef} />
      </div>
      <div className="grid gap-y-2">
        <Label>Password</Label>
        <Input
          name="password"
          type="password"
          disabled={pending}
          onChange={() => {
            errorRef.current!.innerText = "";
            passwordErrorRef.current!.innerText = "";
          }}
        />
        <p className="text-xs text-red-500" ref={passwordErrorRef} />
      </div>
      <p className="text-xs text-red-500" ref={errorRef}>
        {data?.error}
      </p>
      <Button disabled={pending}>
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Please wait
          </>
        ) : (
          "Login"
        )}
      </Button>
    </form>
  );
}
