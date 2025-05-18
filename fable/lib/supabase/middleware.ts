import { createServerClient } from "@supabase/ssr";
import { User } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return protectRoutes(user, request, supabaseResponse);
}

function protectRoutes(
  user: User | null,
  request: NextRequest,
  supabaseResponse: NextResponse
) {
  const createRedirectResponse = (url: string) => {
    const _url = request.nextUrl.clone();
    _url.pathname = url;
    const response = NextResponse.redirect(_url);
    supabaseResponse.cookies.getAll().forEach(({ name, value }) => {
      response.cookies.set(name, value);
    });

    return response;
  };

  if (!user && request.nextUrl.pathname.startsWith("/onboarding")) {
    return createRedirectResponse("/login?verified=true");
  }
  if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
    return createRedirectResponse("/login");
  }

  if (
    user &&
    (request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/register"))
  ) {
    return createRedirectResponse("/dashboard");
  }

  return supabaseResponse;
}
