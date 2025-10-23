"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchemaType } from "@/config/types";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import { routes } from "@/config/routes";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

const RegisterForm = () => {
  const [pendingLogin, startLoginTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<RegisterSchemaType>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const { handleSubmit, control, reset } = form;

  const onSubmit = (values: z.infer<RegisterSchemaType>) => {
    startLoginTransition(async () => {
      const { name, email, password } = values;
      await signUp.email(
        { name: name, email: email, password: password },
        {
          onRequest: () => {},
          onResponse: () => {},
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
          onSuccess: () => {
            toast.success("Registered successfully, you can log in now!");
            router.push(routes.login);
          },
        },
      );
    });
  };

  return (
    <div className="flex w-full flex-col gap-6 sm:w-sm md:w-md">
      <Card>
        <CardHeader>
          <CardTitle>Welcome back!</CardTitle>
          <CardDescription>
            Enter your email and password to log in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={control}
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your name"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={control}
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={control}
                name="password"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <div className="mt-8 flex w-full flex-row items-center justify-between gap-2">
                <Button
                  size="sm"
                  className="w-full flex-1"
                  type="button"
                  variant="secondary"
                  disabled={pendingLogin}
                  onClick={() => {
                    reset();
                  }}
                >
                  Reset
                </Button>
                <Button
                  size="sm"
                  className="w-full flex-1 text-white"
                  type="submit"
                  variant="default"
                  disabled={pendingLogin}
                >
                  {pendingLogin ? (
                    <div className="flex flex-row items-center justify-center gap-2">
                      <Loader2 className="size-3.5 animate-spin" />
                      <span>Loading...</span>
                    </div>
                  ) : (
                    <div className="flex flex-row items-center justify-center gap-2">
                      <LogIn className="animage-spin size-3.5" />
                      <span>Register</span>
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
