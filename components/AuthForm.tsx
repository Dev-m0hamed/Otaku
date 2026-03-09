"use client";

import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from "@/components/ui/field";
import Link from "next/link";
import { signIn } from "next-auth/react";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, signUpSchema } from "@/lib/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Upload from "./Upload";

interface Props<T extends FieldValues> {
  type: "signIn" | "signUp";
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
}

const schemas = {
  signIn: signInSchema,
  signUp: signUpSchema,
};

const FIELD_NAMES = {
  fullName: "Full name",
  email: "Email",
  password: "Password",
  avatar: "Upload your avatar",
};

const FIELD_TYPES = {
  fullname: "text",
  email: "email",
  password: "password",
};

function AuthForm<T extends FieldValues>({
  type,
  defaultValues,
  onSubmit,
}: Props<T>) {
  const schema = schemas[type];
  const { push } = useRouter();
  const form = useForm<T>({
    resolver: zodResolver(schema as any),
    defaultValues: defaultValues as DefaultValues<T>,
  });
  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);
    if (result.success) {
      toast.success(
        type === "signIn" ? "Signed in successfully!" : "Account created!",
      );
      push("/");
    } else {
      toast.error(result.error || "Something went wrong. Please try again.");
    }
  };
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">
              {type === "signIn" ? "Welcome Back" : "Create Your Anime World"}
            </h1>
          </div>
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === "avatar" ? (
                      <Upload value={field.value} onChange={field.onChange} />
                    ) : (
                      <Input
                        required
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        {...field}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Field>
            <Button type="submit">
              {type === "signIn" ? "Sign In" : "Create Account"}
            </Button>
          </Field>
          <FieldSeparator>Or continue with</FieldSeparator>
          <Field>
            <Button
              variant="outline"
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Login with Google
            </Button>
            <FieldDescription className="text-center">
              {type === "signIn"
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <Link
                href={type === "signIn" ? "/sign-up" : "/sign-in"}
                className="underline underline-offset-4"
              >
                {type === "signIn" ? "Sign Up" : "Sign In"}
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </Form>
  );
}

export default AuthForm;
