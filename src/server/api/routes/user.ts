import "server-only";

import * as bcrypt from "bcrypt";

import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string().min(2),
        password: z.string().min(6),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const hasedPassword = await bcrypt.hash(input.password, 10);

      return ctx.db.user.create({
        data: {
          email: input.email,
          name: input.name,
          password: hasedPassword,
        },
      });
    }),

  getUser: privateProcedure.query(() => {
    return "hello from private route";
  }),
});
