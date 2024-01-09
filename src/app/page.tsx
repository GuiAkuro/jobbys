"use client";

import { Header } from "@/components/header";
import { api } from "@/server/api/trpc/react";

export default function Home() {
  const user = api.user.getUser.useQuery();

  return (
    <div>
      <Header />

      <h1>{user.data}</h1>
    </div>
  );
}
