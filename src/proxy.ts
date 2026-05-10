import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);
const isBillingRoute = createRouteMatcher(["/dashboard/billing"]);

export default clerkMiddleware(async (auth, req) => {
  const { isAuthenticated, redirectToSignIn, sessionClaims } = await auth();

  if (!isAuthenticated && isProtectedRoute(req)) return redirectToSignIn();

  if (isAuthenticated && isProtectedRoute(req) && !isBillingRoute(req)) {
    const meta = (sessionClaims?.publicMetadata ?? {}) as Record<string, unknown>;
    const status = meta.subscriptionStatus as string | undefined;
    const trialEndsAt = meta.trialEndsAt as string | undefined;

    const isExpired =
      status === "EXPIRED" ||
      status === "CANCELED" ||
      (status === "TRIALING" &&
        trialEndsAt !== undefined &&
        new Date(trialEndsAt) < new Date());

    if (isExpired) {
      return NextResponse.redirect(new URL("/dashboard/billing", req.url));
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
