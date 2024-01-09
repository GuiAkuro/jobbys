"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/server/api/trpc/react";

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
      <form className="p-6" onSubmit={signUpForm.handleSubmit(handleSignUp)}>
        <div className="flex flex-col">
          <label htmlFor="">E-mail</label>
          <input
            className="border text-black"
            type="text"
            {...signUpForm.register("email")}
          />

          {signUpForm.formState.errors["email"] && (
            <p>{signUpForm.formState.errors["email"].message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="">Nome</label>
          <input
            className="border text-black"
            type="text"
            {...signUpForm.register("name")}
          />

          {signUpForm.formState.errors["name"] && (
            <p>{signUpForm.formState.errors["name"].message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="">Senha</label>
          <input
            className="border text-black"
            type="text"
            {...signUpForm.register("password")}
          />

          {signUpForm.formState.errors["password"] && (
            <p>{signUpForm.formState.errors["password"].message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="">Confirme a senha</label>
          <input
            className="border text-black"
            type="text"
            {...signUpForm.register("confirmPassword")}
          />

          {signUpForm.formState.errors["confirmPassword"] && (
            <p>{signUpForm.formState.errors["confirmPassword"].message}</p>
          )}
        </div>

        <button className="bg-purple-500">Registrar-se</button>
      </form>
    </div>
  );
}
