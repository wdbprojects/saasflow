"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { routes } from "@/config/routes";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { Loader2, LogOut } from "lucide-react";

const SignOutButton = () => {
  const [pendingLogout, startLogoutTransition] = useTransition();

  const router = useRouter();

  const handleLogout = () => {
    startLogoutTransition(async () => {
      await signOut({
        fetchOptions: {
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
          onSuccess: () => {
            toast.warning("User signed out successfully");
            router.push(routes.home);
          },
        },
      });
    });
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      className="w-[150px]"
      onClick={handleLogout}
      disabled={pendingLogout}
    >
      {pendingLogout ? (
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="size-3.5 animate-spin" />
          <span>Logging out...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          <LogOut className="size-3.5" />
          <span>Log out</span>
        </div>
      )}
    </Button>
  );
};

export default SignOutButton;
