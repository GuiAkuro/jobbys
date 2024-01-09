"use client";

import { Header } from "@/components/header";
import { api } from "@/server/api/trpc/react";

export default function Dashboard() {
  const user = api.user.getUser.useQuery();

  return (
    <div>
      <Header />

      {user.isLoading ? (
        <span>carregando</span>
      ) : (
        <h1>Bem-vindo ao Dashboard {user.data?.name}</h1>
      )}
    </div>
  );
}
