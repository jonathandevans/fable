"use server";

import { createSupabaseClient } from "@/lib/supabase/server";

export const createAccountAction = async (prev: any, formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const password_retype = formData.get("retype") as string;

    if (password !== password_retype)
      return "Passwords do not match";

    const { auth } = await createSupabaseClient();

    const { error } = await auth.signUp({
      email,
      password,
    });

    if (error) throw error;
  } catch (error) {
    return "Something went wrong...";
  }
};
