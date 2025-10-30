"use client";

import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchemaType } from "@/schemas/auth-schemas";
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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { registerAction } from "@/_actions/auth-actions";
import { FaGoogle } from "react-icons/fa";

const RegisterForm = () => {
  const [pendingRegister, startRegisterTransition] = useTransition();
  const [isGooglePending, startGoogleTransition] = useTransition();

  const router = useRouter();

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });
  const { handleSubmit, control, reset } = form;

  const onSubmit = (data: RegisterSchemaType) => {
    startRegisterTransition(async () => {
      const response = await registerAction(data);
      if (response.success) {
        toast.success(response.message);
        reset();
        router.push(routes.login);
      } else {
        toast.error(response.message);
      }
    });
  };

  const loginWithGoogle = () => {
    startGoogleTransition(async () => {});
  };

  return (
    <div className="flex w-full flex-col gap-4 sm:w-sm">
      <Card className="p-2 py-6">
        <CardHeader className="mb-0 text-center">
          <CardTitle className="text-xl">Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="register-user" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="gap-2">
              {/* FULL NAME */}
              <Controller
                control={control}
                name="name"
                render={({ field, fieldState }) => {
                  return (
                    <Field className="gap-1">
                      <FieldLabel htmlFor="name">Name</FieldLabel>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
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
                      <FieldDescription className="text-xs tracking-tight">
                        We will use this to contact you. We will not share your
                        email with anyone else.
                      </FieldDescription>
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
                      <FieldDescription className="text-xs tracking-tight">
                        Must be at least 8 characters long.
                      </FieldDescription>
                    </Field>
                  );
                }}
              />
              {/* CONFIRM PASSWORD */}
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field, fieldState }) => {
                  return (
                    <Field className="gap-1">
                      <FieldLabel htmlFor="confirmPassword">
                        Confirm Password
                      </FieldLabel>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
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
            <div className="mt-8 flex w-full flex-col items-center justify-between gap-2">
              <Button
                size="default"
                className="w-full text-white"
                type="submit"
                variant="default"
                form="register-user"
                disabled={pendingRegister}
              >
                {pendingRegister ? (
                  <div className="flex flex-row items-center justify-center gap-2">
                    <Loader2 className="size-3.5 animate-spin" />
                    <span>Pending...</span>
                  </div>
                ) : (
                  <div className="flex flex-row items-center justify-center gap-2">
                    <LogIn className="animage-spin size-3.5" />
                    <span>Register</span>
                  </div>
                )}
              </Button>
              <div className="flex w-full justify-end">
                <Button
                  size="sm"
                  className="text-xs"
                  type="button"
                  variant="link"
                  disabled={pendingRegister}
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
