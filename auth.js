// Import NextAuth core
import NextAuth from "next-auth";
// Import credentials provider for email/password login
import Credentials from "next-auth/providers/credentials";
// MongoDB adapter for NextAuth
import { MongoDBAdapter } from "@auth/mongodb-adapter";
// Client promise for connecting to MongoDB
import clientPromise from "./app/lib/mongodb";
// Zod for validating login input
import { ZodError } from "zod";
import { signInSchema } from "./app/lib/zod";
// Utility to hash passwords
import { saltAndHashPassword, verifyPassword } from "@/utils/password";
// Function to get user from DB
import { getUserFromDb } from "@/utils/db";

// Export NextAuth configuration
export const { handlers, signIn, signOut, auth } = NextAuth({
  // Providers define how users can sign in
  providers: [
    Credentials({
      // Define fields that the user will enter
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Password",
        },
      },

      // This function runs when a user tries to log in
      authorize: async (credentials) => {
        try {
          // 1️⃣ Validate credentials using Zod
          // This ensures email is valid and password has min length
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          // 3️⃣ Fetch the user from DB with email
          const user = await getUserFromDb(email);

          // 4️⃣ If no user found, return null to indicate invalid login
          if (!user) return null;

          //   compare password
          const isValid = await verifyPassword(password, user.hashedPassword);
          if (!isValid) {
            return null;
          }

          // 5️⃣ If user found, return user object
          // NextAuth will store this in the session
          return user;
        } catch (error) {
          // 6️⃣ If input validation fails, Zod throws a ZodError
          if (error instanceof ZodError) return null;

          // 7️⃣ Any other errors also fail login
          return null;
        }
      },
    }),
  ],

  // 8️⃣ Use MongoDB adapter to store sessions and users
  adapter: MongoDBAdapter(clientPromise),

  // 9️⃣ Optional: session and callback settings can go here
});
