//import { auth } from "@/auth";
// export { auth as middleware } from "@/auth";

export { authMiddleware as middleware } from "next-auth";

import { auth } from "@/auth";

export const authMiddleware = auth((req) => {
  // Protect specific routes
  return true;
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
