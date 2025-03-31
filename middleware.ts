import {  clerkMiddleware,createRouteMatcher  } from "@clerk/nextjs/server";

console.log("Middleware loaded", process.env.CLERK_REDIRECT_AFTER_SIGN_IN_URL);

const isProtectedRoute = createRouteMatcher([
    process.env.CLERK_REDIRECT_AFTER_SIGN_IN_URL || "/dashboard(.*)",
  ]);
export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) await auth.protect()
  })

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
