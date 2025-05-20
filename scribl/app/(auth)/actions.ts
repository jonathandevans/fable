"use server";

import { createAdminClient, createServerClient } from "@/lib/supabase/server";
import { Provider } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export async function createAccountAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const password_retype = formData.get("retype") as string;

  if (email.length === 0) {
    return { error: "Missing email address" };
  }
  if (password !== password_retype) {
    return { error: "Passwords do not match" };
  }

  const { auth } = await createServerClient();
  const { data, error } = await auth.signUp({ email, password });

  if (error) {
    return { error: error.message };
  }

  return redirect(`/register/verify/${data.user?.id}`);
}

export async function passwordLoginAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (email.length === 0) {
    return { error: "Missing email address" };
  }
  if (!email.includes("@")) {
    return { error: "Invalid email address" };
  }
  if (password.length === 0) {
    return { error: "Missing email address" };
  }

  const { auth } = await createServerClient();
  const { error } = await auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  return redirect("/dashboard");
}

export async function oAuthLoginAction(prevState: any, provider: Provider) {
  try {
    const { auth } = await createServerClient();
    const { data, error } = await auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/oauth/callback`,
      },
    });

    if (error) throw new Error(error.message);

    // Redirect to different third-party url
    return { url: data.url };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}

export async function confirmEmail(userId: string) {
  try {
    const supabaseAdmin = await createAdminClient();
    const { data, error } = await supabaseAdmin.auth.admin.getUserById(userId);

    if (error) throw new Error(error.message);

    if (data.user.app_metadata.provider === "email") {
      if (data.user.email_confirmed_at) {
        // Email provider used and verified
        return { verified: true };
      }
      throw new Error("Unverified");
    }

    // User is verified through oath and shouldn't be seeing this page
    return { verified: true };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}

export async function onboardUserAction(prevState: any, formData: FormData) {
  const supabase = await createServerClient();
  const { data } = await supabase
    .from("sites")
    .select()
    .eq("slug", formData.get("username"));

  const { error } = await supabase.from("users").insert({
    id: formData.get("userId"),
    first_name: formData.get("firstName"),
    last_name: formData.get("lastName"),
    username: formData.get("username"),
  });

  if (error) {
    return { error: error.message };
  }

  return redirect("/dashboard");
}

export async function logoutAction() {
  const { auth } = await createServerClient();
  const { error } = await auth.signOut();

  if (error) {
    return { error: error.message };
  }

  return redirect("/");
}
