"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface SignInFormProps {}

const signInFormSchema = z.object({
  email: z.string().email("Informe um e-mail válido."),
  password: z.string().min(6),
});

export function SignInForm({}: SignInFormProps) {
  const router = useRouter();
  const signInForm = useForm<z.infer<typeof signInFormSchema>>();

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
      <form className="p-6" onSubmit={signInForm.handleSubmit(handleSignIn)}>
        <div className="flex flex-col">
          <label htmlFor="">E-mail</label>
          <input
            className="border text-black"
            type="text"
            {...signInForm.register("email")}
          />

          {signInForm.formState.errors["email"] && (
            <p>{signInForm.formState.errors["email"].message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="">Senha</label>
          <input
            className="border text-black"
            type="text"
            {...signInForm.register("password")}
          />

          {signInForm.formState.errors["password"] && (
            <p>{signInForm.formState.errors["password"].message}</p>
          )}
        </div>

        <button className="bg-purple-500">Entrar</button>
      </form>
    </div>
  );
}
