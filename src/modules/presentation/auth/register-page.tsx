import Link from "next/link";
import RegisterForm from "@/modules/components/auth/register-form";
import { requireUnauth } from "@/lib/auth-utils";
import { routes } from "@/config/routes";
import { Button } from "@/components/ui/button";

const RegisterPage = async () => {
  await requireUnauth("about");
  return (
    <div>
      <RegisterForm />
      <p className="text-muted-foreground text-center text-sm">
        Already have an account?{" "}
        <Button variant="link" className="px-1" asChild>
          <Link href={routes.login}>Login</Link>
        </Button>
      </p>
    </div>
  );
};

export default RegisterPage;
