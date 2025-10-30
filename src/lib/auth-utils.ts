import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { routes } from "@/config/routes";

export const requireAuth = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect(routes.login);
  }
  return session;
};

export const requireUnauth = async (path: keyof typeof routes) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    redirect(routes[path]);
  }
  return session;
};
