import "server-only";
import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  create: privateProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ input }) => {
      return input;
    }),

  getUser: privateProcedure.query(() => {
    return "hello teste";
  }),
});
