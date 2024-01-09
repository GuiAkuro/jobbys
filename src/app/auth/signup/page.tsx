import { redirect } from "next/navigation";
import { SignUpForm } from "./sign-up-form";
import { getServerSession } from "next-auth";

export default async function SignUp() {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <div>
      <SignUpForm />
    </div>
  );
}
