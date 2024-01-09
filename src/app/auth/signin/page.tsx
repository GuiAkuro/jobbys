import { getServerSession } from "next-auth";
import { SignInForm } from "./sign-in-form";
import { redirect } from "next/navigation";
import { Header } from "@/components/header";

export default async function SignIn() {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <div>
      <SignInForm />
    </div>
  );
}
