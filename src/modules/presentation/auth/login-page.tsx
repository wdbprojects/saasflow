import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { auth } from "@/lib/auth";
import LoginForm from "@/modules/components/auth/login-form";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect(routes.dashboard);
  }

  return (
    <div>
      <LoginForm />
      <p className="text-muted-foreground text-center text-sm">
        Don&apos;t have an account?{" "}
        <Button variant="link" className="px-1" asChild>
          <Link href={routes.register}>Register</Link>
        </Button>
      </p>
    </div>
  );
};

export default LoginPage;
