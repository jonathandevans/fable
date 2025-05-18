"use client";

import { oAuthLoginAction } from "@/app/(auth)/actions";
import { Button } from "../ui/button";
import { Github, Loader2, LucideProps } from "lucide-react";
import {
  ForwardRefExoticComponent,
  RefAttributes,
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import { Provider } from "@supabase/supabase-js";

export function OAuthLogin() {
  return (
    <div className="grid gap-y-4">
      <SocialLink name="Github" provider="github" Icon={Github} />
    </div>
  );
}

function SocialLink({
  name,
  provider,
  Icon,
}: {
  name: string;
  provider: Provider;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}) {
  const [state, login, pending] = useActionState(oAuthLoginAction, undefined);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (state?.url) {
      setLoading(true);
      window.location.href = state.url;
    }
  }, [state]);

  return (
    <div className="grid gap-y-2">
      <Button
        className="bg-black text-white w-full"
        disabled={pending || loading}
        onClick={() => startTransition(() => login(provider))}
      >
        {pending || loading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Please wait...
          </>
        ) : (
          <>
            <Icon className="size-4" />
            Login with {name}
          </>
        )}
      </Button>
      {state?.error && <p className="text-xs text-red-500">{state.error}</p>}
    </div>
  );
}
