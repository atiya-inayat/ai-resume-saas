import { signIn } from "@/auth";

export default function SignIn() {
  return (
    <form
      action={async (formData) => {
        "use server";

        await signIn("credentials", formData);
      }}
      className="flex flex-col gap-4"
    >
      <label>
        Email
        <input name="email" type="email" required />
      </label>

      <label>
        Password
        <input name="password" type="password" required />
      </label>

      <button type="submit">Sign In</button>
    </form>
  );
}
