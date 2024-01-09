import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button, button } from "./ui/button";

interface HeaderProps {}

export function Header({}: HeaderProps) {
  const session = useSession();

  return (
    <header className="h-20 border-b border-neutral-800">
      <div className="container mx-auto flex h-full items-center justify-between">
        <Link href="/">Jobbys</Link>

        {session.status === "authenticated" ? (
          <Button onClick={() => signOut()}>Sair</Button>
        ) : (
          <div className="flex gap-4">
            <Link className={button()} href="/auth/signin">
              Entrar
            </Link>

            <Link className={button({ outlined: true })} href="/auth/signup">
              Cadastrar-se
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
