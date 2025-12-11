import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./app/lib/mongodb";
// Your own logic for dealing with plaintext password strings; be careful!
import { saltAndHashPassword } from "@/utils/password";

// Make sure to import or define getUserFromDb in JS
import { getUserFromDb } from "@/utils/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // Specify which fields should be submitted
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "Enter Email",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "Password",
        },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required.");
        }

        // logic to salt and hash password
        const pwHash = saltAndHashPassword(credentials.password);

        // logic to verify if the user exists
        const user = await getUserFromDb(credentials.email, pwHash);

        if (!user) {
          // No user found
          throw new Error("Invalid credentials.");
        }

        // return user object with their profile data
        return user;
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
});
