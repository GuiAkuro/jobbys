"use client";

import { api } from "@/server/api/trpc/react";

export default function Home() {
  const user = api.user.getUser.useQuery();

  return (
    <div>
      <h1>{user.data}</h1>
    </div>
  );
}
