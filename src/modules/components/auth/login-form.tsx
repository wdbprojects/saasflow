"use client";

import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchemaType } from "@/schemas/auth-schemas";
import { useRouter } from "next/navigation";
import { routes } from "@/config/routes";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { loginAction } from "@/_actions/auth-actions";
import { authClient } from "@/lib/auth-client";
import { FaGoogle } from "react-icons/fa";

const RegisterForm = () => {
  const [pendingLogin, startLoginTransition] = useTransition();
  const [isGooglePending, startGoogleTransition] = useTransition();

  const router = useRouter();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { handleSubmit, control, reset } = form;

  const onSubmit = (data: LoginSchemaType) => {
    startLoginTransition(async () => {
      const response = await loginAction(data);
      if (response.success) {
        toast.success(response.message);
        reset();
        router.push(routes.dashboard);
      } else {
        toast.error(response.message);
      }
    });
  };

  const loginWithGoogle = () => {
    startGoogleTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
        fetchOptions: {
          onRequest: () => {},
          onResponse: () => {},
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        },
      });
    });
  };

  return (
    <div className="flex w-full flex-col gap-4 sm:w-sm">
      <Card className="p-2 py-6">
        <CardHeader className="mb-0 text-center">
          <CardTitle className="text-xl">Welcome back!</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="register-user" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="gap-2">
              {/* EMAIL */}
              <Controller
                control={control}
                name="email"
                render={({ field, fieldState }) => {
                  return (
                    <Field className="gap-1">
                      <FieldLabel htmlFor="name">Email</FieldLabel>
                      <Input
                        id="email"
                        type="text"
                        placeholder="m@example.com"
                        autoComplete="off"
                        aria-invalid={fieldState.invalid}
                        {...field}
                      />
                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                          className="text-xs italic"
                        />
                      )}
                    </Field>
                  );
                }}
              />
              {/* PASSWORD */}
              <Controller
                control={control}
                name="password"
                render={({ field, fieldState }) => {
                  return (
                    <Field className="gap-1">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        autoComplete="off"
                        aria-invalid={fieldState.invalid}
                        {...field}
                      />
                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                          className="text-xs italic"
                        />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>

            <div className="mt-6 flex w-full flex-col items-center justify-between gap-2">
              <Button
                size="default"
                className="w-full text-white"
                type="submit"
                variant="default"
                form="register-user"
                disabled={pendingLogin}
              >
                {pendingLogin ? (
                  <div className="flex flex-row items-center justify-center gap-2">
                    <Loader2 className="size-3.5 animate-spin" />
                    <span>Pending...</span>
                  </div>
                ) : (
                  <div className="flex flex-row items-center justify-center gap-2">
                    <LogIn className="animage-spin size-3.5" />
                    <span>Login</span>
                  </div>
                )}
              </Button>
              <div className="flex w-full justify-end">
                <Button
                  size="sm"
                  className="text-xs"
                  type="button"
                  variant="link"
                  disabled={pendingLogin}
                  onClick={() => {
                    reset();
                  }}
                >
                  Reset Form
                </Button>
              </div>
            </div>
          </form>
          <div className="pt-4 pb-6">
            <FieldSeparator className="[&>span]:bg-card">
              Or continue with
            </FieldSeparator>
          </div>
          <Field>
            <Button
              variant="outline"
              className="w-full"
              type="button"
              disabled={isGooglePending}
              onClick={loginWithGoogle}
            >
              {isGooglePending ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="size-3.5 animate-spin" />
                  <span>Loading...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <FaGoogle />
                  <span>Sign In with Google</span>
                </div>
              )}
            </Button>
          </Field>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
