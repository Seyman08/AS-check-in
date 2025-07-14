import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define routes that should remain PUBLIC
const isPublicRoute = createRouteMatcher([
  "/", // Home page (optional public)
  "/sign-in(.*)", // Sign in page
  "/sign-up(.*)", // Sign up page
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|.*\\.(?:svg|png|jpg|jpeg|css|js|ico|woff|woff2|ttf|json)).*)",
    "/(api|trpc)(.*)",
  ],
};
