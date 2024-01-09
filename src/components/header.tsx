"user client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

interface HeaderProps {}

export function Header({}: HeaderProps) {
  const session = useSession();

  return (
    <div>
      {session.status === "authenticated" ? (
        <button onClick={() => signOut()}>Sair</button>
      ) : (
        <Link href="/auth/signin">Entrar</Link>
      )}
    </div>
  );
}
