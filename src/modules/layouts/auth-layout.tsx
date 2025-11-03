import DarkMode from "@/components/shared/dark-mode";
import { buttonVariants } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { LayoutPropsMain } from "@/config/types";
import { ArrowBigLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AuthLayout = ({ children }: LayoutPropsMain) => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="absolute top-4 flex w-full flex-row items-center justify-between">
        <div className="flex-1 pl-2">
          <Link
            href={routes.home}
            className={buttonVariants({
              size: "sm",
              variant: "outline",
              className: "text-xs",
            })}
          >
            <ArrowBigLeft className="size-3" />
            <span>Home</span>
          </Link>
        </div>
        <div className="flex flex-1 flex-shrink-0 items-center justify-center gap-2 p-1">
          <Link href={routes.home} className="flex flex-row items-center gap-2">
            <Image
              src="/images/logo.svg"
              width={100}
              height={50}
              alt="SaaSFlow Logo"
              className="h-4 w-auto"
            />
            <div className="flex items-center justify-center gap-0">
              <h6 className="text-primary text-xl font-bold tracking-tight">
                SaaS
              </h6>
              <h6 className="text-foreground text-xl font-bold tracking-tight">
                Flow
              </h6>
            </div>
          </Link>
        </div>
        <DarkMode className="flex flex-1 items-end pr-2" />
      </div>

      {children}
    </div>
  );
};

export default AuthLayout;
