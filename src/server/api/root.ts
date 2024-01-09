import "server-only";

import { createTRPCRouter } from "@/server/api/trpc";
import { jobRouter } from "./routes/job";
import { userRouter } from "./routes/user";

export const appRouter = createTRPCRouter({
  job: jobRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
