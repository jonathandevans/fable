"use client";

import { useActionState, useRef, useState } from "react";
import { createAccountAction } from "@/app/actions";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function RegisterForm() {
  const passwordRef = useRef<HTMLInputElement>(null);
  const retypeRef = useRef<HTMLInputElement>(null);

  // The client should focus on each item at least once
  const [emailFocus, setEmailFocus] = useState<boolean>(false);
  const [passwordFocus, setPasswordFocus] = useState<boolean>(false);
  const [retypeFocus, setRetypeFocus] = useState<boolean>(false);
  const clientFocus =
    emailFocus === true && passwordFocus === true && retypeFocus === true;

  // There should be no errors once the client has updated the input
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [retypeError, setRetypeError] = useState<boolean>(false);
  const clientError =
    emailError === true || passwordError === true || retypeError === true;

  // Once a client clicks off a component they should be told the error
  const emailErrorText = useRef<HTMLParagraphElement>(null);
  const passwordErrorText = useRef<HTMLParagraphElement>(null);
  const retypeErrorText = useRef<HTMLParagraphElement>(null);

  const [error, createAccount] = useActionState(createAccountAction, null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const { pending } = useFormStatus();

  return (
    <form className="flex flex-col gap-y-4" action={createAccount}>
      <div className="grid gap-y-2">
        <Label>Email</Label>
        <Input
          name="email"
          type="email"
          disabled={pending}
          onFocus={(e) => {
            setEmailFocus(true);
            if (e.target.value.length === 0) {
              setEmailError(true);
            }
          }}
          onChange={(e) => {
            // Check whether the component meets the requirements
            errorRef.current!.innerText = "";
            setEmailError(false);
            emailErrorText.current!.innerText = "";

            if (!e.target.value.includes("@")) {
              setEmailError(true);
            }
          }}
          onBlur={(e) => {
            // Inform the user whether they meet the requirements
            if (!e.target.value.includes("@")) {
              emailErrorText.current!.innerText = "Not a valid email address";
            }
          }}
        />
        <p className="text-xs text-red-500" ref={emailErrorText} />
      </div>
      <div className="grid gap-y-2">
        <Label>Password</Label>
        <Input
          name="password"
          type="password"
          disabled={pending}
          ref={passwordRef}
          onFocus={(e) => {
            setPasswordFocus(true);
            if (e.target.value.length === 0) {
              setPasswordError(true);
            }
          }}
          onChange={(e) => {
            errorRef.current!.innerText = "";
            setPasswordError(false);
            passwordErrorText.current!.innerText = "";
            setRetypeError(false);
            retypeErrorText.current!.innerText = "";

            if (
              retypeRef.current!.value !== "" &&
              e.target.value !== retypeRef.current?.value
            ) {
              retypeErrorText.current!.innerText = "Passwords do not match";
              setRetypeError(true);
            }

            if (e.target.value.length < 6) {
              setPasswordError(true);
            }
          }}
          onBlur={(e) => {
            if (e.target.value.length < 6)
              passwordErrorText.current!.innerText = "Password is too short";
          }}
        />
        <p className="text-xs text-red-500" ref={passwordErrorText} />
      </div>
      <div className="grid gap-y-2">
        <Label>Retype Password</Label>
        <Input
          name="retype"
          type="password"
          disabled={pending}
          ref={retypeRef}
          onFocus={(e) => {
            setRetypeFocus(true);
            if (e.target.value.length === 0) {
              setRetypeError(true);
            }
          }}
          onChange={(e) => {
            errorRef.current!.innerText = "";
            setRetypeError(false);
            retypeErrorText.current!.innerText = "";

            if (e.target.value !== passwordRef.current?.value) {
              setRetypeError(true);
            }
          }}
          onBlur={(e) => {
            if (e.target.value !== passwordRef.current?.value)
              retypeErrorText.current!.innerText = "Passwords do not match";
          }}
        />
        <p className="text-xs text-red-500" ref={retypeErrorText} />
      </div>
      <p className="text-xs text-red-500" ref={errorRef}>
        {error}
      </p>
      <Button disabled={pending || clientError || !clientFocus}>
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
