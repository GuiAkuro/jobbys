import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "E-mail", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        if (
          credentials &&
          credentials.email === "g.alves.oliv@gmail.com" &&
          credentials.password === "123"
        ) {
          return {
            id: "1",
            name: "Guilherme",
            email: "g.alves.oliv@gmail.com",
          };
        }

        return null;
      },
    }),
  ],
});
