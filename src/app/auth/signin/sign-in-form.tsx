"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Header } from "@/components/header";

interface SignInFormProps {}

const signInFormSchema = z.object({
  email: z.string().email("Informe um e-mail válido."),
  password: z.string().min(6),
});

export function SignInForm({}: SignInFormProps) {
  const router = useRouter();
  const signInForm = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
  });

  async function handleSignIn(data: z.infer<typeof signInFormSchema>) {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.ok) {
      router.push("/dashboard");
    }
  }

  return (
    <div>
      <Header />

      <div className="container mx-auto">
        <form className="p-6" onSubmit={signInForm.handleSubmit(handleSignIn)}>
          <div className="mb-4 flex flex-col">
            <label className="mb-1 text-sm" htmlFor="">
              E-mail
            </label>
            <Input {...signInForm.register("email")} />

            {signInForm.formState.errors["email"] && (
              <p className="mt-1 text-sm text-red-400">
                {signInForm.formState.errors["email"].message}
              </p>
            )}
          </div>

          <div className="mb-4 flex flex-col">
            <label className="mb-1 text-sm" htmlFor="">
              Senha
            </label>
            <Input {...signInForm.register("password")} type="password" />

            {signInForm.formState.errors["password"] && (
              <p className="mt-1 text-sm text-red-400">
                {signInForm.formState.errors["password"].message}
              </p>
            )}
          </div>

          <Button className="bg-purple-500">Entrar</Button>
        </form>
      </div>
    </div>
  );
}
