"use server";

import { createSupabaseClient } from "@/lib/supabase/server";
import { Provider } from "@supabase/supabase-js";

export async function createAccountAction(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const password_retype = formData.get("retype") as string;

    if (email.length === 0) throw new Error("Missing email address");
    if (password !== password_retype) throw new Error("Passwords do not match");

    const { auth } = await createSupabaseClient();
    const { data, error } = await auth.signUp({
      email,
      password,
    });

    if (error) throw new Error(error.message);

    return {
      redirect: `${process.env.BASE_URL}/register/verify/${data.user?.id}`,
    };
  } catch (error: unknown) {
    console.log("createAccountAction: ", error);
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "Something went wrong..." };
  }
}

export async function passwordLoginAction(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (email.length === 0) throw new Error("Missing email address");
    if (!email.includes("@")) throw new Error("Invalid email address");
    if (password.length === 0) throw new Error("Missing password");

    const { auth } = await createSupabaseClient();
    const { error } = await auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);

    return { redirect: `${process.env.BASE_URL}/dashboard` };
  } catch (error: unknown) {
    console.log("passwordLoginAction: ", error);
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "Something went wrong..." };
  }
}

export async function oAuthLoginAction(prevState: any, provider: Provider) {
  try {
    const { auth } = await createSupabaseClient();
    const { data, error } = await auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${process.env.BASE_URL}/oauth/callback`,
      },
    });

    if (error) throw new Error(error.message);

    return { redirect: data.url };
  } catch (error) {
    console.log("oAuthLoginAction: ", error);
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "Something went wrong..." };
  }
}
