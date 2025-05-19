import { OnboardingForm } from "@/components/auth/onboarding-form";
import { createServerClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function OnboardingRoute() {
  const supabase = await createServerClient();
  const { data, error } = await supabase.auth.getUser();
  let userId;
  if (data.user) {
    userId = data.user.id;
  } else notFound();

  return <OnboardingForm userId={userId} />;
}
