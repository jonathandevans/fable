"use client";

import { oAuthLoginAction } from "@/app/(auth)/actions";
import { Button } from "../ui/button";
import { Github, Loader2 } from "lucide-react";
import { startTransition, useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function OAuthLogin() {
  const router = useRouter();
  const [data, login, pending] = useActionState(oAuthLoginAction, undefined);
  useEffect(() => {
    if (data?.redirect) {
      router.push(data.redirect);
    }
  }, [data]);

  return (
    <>
      <Button
        className="bg-black text-white w-full"
        onClick={async () => {
          startTransition(() => login("github"));
        }}
        disabled={pending}
      >
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Please wait...
          </>
        ) : (
          <>
            <Github className="size-4" />
            Login with Github
          </>
        )}
      </Button>
      <p className="text-xs text-red-500 mt-2">{data?.error}</p>
    </>
  );
}
