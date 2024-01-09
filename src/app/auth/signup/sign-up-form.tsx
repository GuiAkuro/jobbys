"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/server/api/trpc/react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Input } from "@/components/ui/input";

interface SignUpFormProps {}

const signUpFormSchema = z
  .object({
    email: z.string().email("Informe um e-mail válido."),
    name: z.string().min(2, "O nome deve ter no minimo 2 caracteres."),
    password: z.string().min(6, "A senha tem que ter no minimo 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "A confirmação da senha tem que ter no minimo 6 caracteres"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "O a senha e a confrimação de senha devem ser iguais",
      });
    }
  });

export function SignUpForm({}: SignUpFormProps) {
  const signUpMutation = api.user.create.useMutation({
    onSuccess: () => {
      signUpForm.reset();
    },
  });

  const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
  });

  function handleSignUp(data: z.infer<typeof signUpFormSchema>) {
    signUpMutation.mutate(data);
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto">
        <form className="p-6" onSubmit={signUpForm.handleSubmit(handleSignUp)}>
          <div className="mb-4 flex flex-col">
            <label className="mb-1 text-sm" htmlFor="">
              E-mail
            </label>
            <Input {...signUpForm.register("email")} />

            {signUpForm.formState.errors["email"] && (
              <p className="mt-1 text-sm text-red-400">
                {signUpForm.formState.errors["email"].message}
              </p>
            )}
          </div>

          <div className="mb-4 flex flex-col">
            <label className="mb-1 text-sm" htmlFor="">
              Nome
            </label>
            <Input {...signUpForm.register("name")} />

            {signUpForm.formState.errors["name"] && (
              <p className="mt-1 text-sm text-red-400">
                {signUpForm.formState.errors["name"].message}
              </p>
            )}
          </div>

          <div className="mb-4 flex flex-col">
            <label className="mb-1 text-sm" htmlFor="">
              Senha
            </label>
            <Input {...signUpForm.register("password")} />

            {signUpForm.formState.errors["password"] && (
              <p className="mt-1 text-sm text-red-400">
                {signUpForm.formState.errors["password"].message}
              </p>
            )}
          </div>

          <div className="mb-4 flex flex-col">
            <label className="mb-1 text-sm" htmlFor="">
              Confirme a senha
            </label>
            <Input {...signUpForm.register("confirmPassword")} />

            {signUpForm.formState.errors["confirmPassword"] && (
              <p className="mt-1 text-sm text-red-400">
                {signUpForm.formState.errors["confirmPassword"].message}
              </p>
            )}
          </div>

          <Button className="bg-purple-500">Registrar-se</Button>
        </form>
      </div>
    </div>
  );
}
