import "server-only";

import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";
import { db } from "../database";

export const config = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "E-mail", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        if (credentials && credentials.email && credentials.password) {
          const user = await db.user.findFirst({
            where: {
              email: credentials.email,
            },
          });

          if (user && user.password) {
            const passwordMatch = await bcrypt.compare(
              credentials.password as string,
              user.password,
            );

            if (passwordMatch) {
              return user;
            }
          }
        }

        return null;
      },
    }),
  ],

  pages: {
    signIn: "/auth/signin",
  },
} satisfies NextAuthOptions;
