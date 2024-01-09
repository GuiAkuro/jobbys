import "server-only";

import { TRPCError, initTRPC } from "@trpc/server";
import { type NextRequest } from "next/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { db } from "@/server/database";
import { getServerSession } from "next-auth";

interface CreateContextOptions {
  headers: Headers;
}

export const createInnerTRPCContext = async (opts: CreateContextOptions) => {
  const session = await getServerSession();

  return {
    headers: opts.headers,
    session: session,
    db,
  };
};

export const createTRPCContext = async (opts: { req: NextRequest }) => {
  return createInnerTRPCContext({
    headers: opts.req.headers,
  });
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

const authMiddleware = t.middleware(({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next();
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(authMiddleware);
