import { withAuth } from "next-auth/middleware";
import { authRoutes, publicApiRoutes } from "./server/auth/routes";

export default withAuth({
  callbacks: {
    authorized: async ({ req, token }) => {
      if (authRoutes.includes(req.nextUrl.pathname)) {
        return true;
      }

      if (publicApiRoutes.includes(req.nextUrl.pathname)) {
        return true;
      }

      if (token) {
        return true;
      }

      return false;
    },
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
