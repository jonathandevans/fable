"use client";

import {
  FormEvent,
  useActionState,
  useRef,
  useTransition,
} from "react";
import { createAccountAction } from "@/app/(auth)/actions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Loader2 } from "lucide-react";

export function RegisterForm() {
  const [state, createAccount] = useActionState(createAccountAction, undefined);
  const [pending, startTransition] = useTransition();
  const errorRef = useRef<HTMLParagraphElement>(null);
  const emailErrorRef = useRef<HTMLParagraphElement>(null);
  const passwordErrorRef = useRef<HTMLParagraphElement>(null);
  const retypeErrorRef = useRef<HTMLParagraphElement>(null);

  const retypeRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
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
    } else if ((formData.get("password") as string).length < 6) {
      passwordErrorRef.current!.innerText = "Password is too short";
      valid = false;
    }

    if (formData.get("retype") !== formData.get("password")) {
      retypeErrorRef.current!.innerText = "Passwords do not match";
      valid = false;
    }

    if (valid) startTransition(() => createAccount(formData));
  };

  return (
    <form
      className="flex flex-col gap-y-4"
      onSubmit={handleSubmit}
      action={createAccount}
    >
      <div className="grid gap-y-2">
        <Label>Email</Label>
        <Input
          name="email"
          type="email"
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
          onChange={(e) => {
            errorRef.current!.innerText = "";
            passwordErrorRef.current!.innerText = "";
            retypeErrorRef.current!.innerText = "";

            if (
              retypeRef.current!.value.length > 0 &&
              retypeRef.current!.value !== e.target.value
            ) {
              retypeErrorRef.current!.innerText = "Passwords do not match";
            }
          }}
        />
        <p className="text-xs text-red-500" ref={passwordErrorRef} />
      </div>
      <div className="grid gap-y-2">
        <Label>Retype Password</Label>
        <Input
          name="retype"
          type="password"
          disabled={pending}
          ref={retypeRef}
          onChange={() => {
            errorRef.current!.innerText = "";
            retypeErrorRef.current!.innerText = "";
          }}
        />
        <p className="text-xs text-red-500" ref={retypeErrorRef} />
      </div>
      <p className="text-xs text-red-500" ref={errorRef}>
        {state?.error}
      </p>
      <Button disabled={pending}>
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Please wait
          </>
        ) : (
          "Create an account"
        )}
      </Button>
    </form>
  );
}
