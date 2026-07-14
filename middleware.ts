import { authMiddleware, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { ROUTES } from "@/lib/constants";

const publicRoutes = ["/", "/api/webhook/register", "/sign-in", "/sign-up"];

export default authMiddleware({
  publicRoutes,
  async afterAuth(auth, req) {
    if (!auth.userId && !publicRoutes.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL(ROUTES.SIGN_IN, req.url));
    }

    if (auth.userId) {
      try {
        const user = await clerkClient.users.getUser(auth.userId);
        const role = user.publicMetadata.role as string | undefined;

        if (role === "admin" && req.nextUrl.pathname === ROUTES.DASHBOARD) {
          return NextResponse.redirect(new URL(ROUTES.ADMIN_DASHBOARD, req.url));
        }

        if (role !== "admin" && req.nextUrl.pathname.startsWith("/admin")) {
          return NextResponse.redirect(new URL(ROUTES.DASHBOARD, req.url));
        }

        if (publicRoutes.includes(req.nextUrl.pathname)) {
          return NextResponse.redirect(
            new URL(
              role === "admin" ? ROUTES.ADMIN_DASHBOARD : ROUTES.DASHBOARD,
              req.url
            )
          );
        }
      } catch (error) {
        return NextResponse.redirect(new URL(ROUTES.HOME, req.url));
      }
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
