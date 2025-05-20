"use server";

import { createServerClient } from "@/lib/supabase/server";

export async function newSite(prevState: any, formData: FormData) {
  const supabase = await createServerClient();
  
}