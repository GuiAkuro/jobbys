"user client";

import { signOut } from "next-auth/react";

interface HeaderProps {}

export function Header({}: HeaderProps) {
  return (
    <div>
      <button onClick={() => signOut()}>Sair</button>
    </div>
  );
}
