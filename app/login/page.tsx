import { createClient } from "@/lib/supabase/server";
import { loginWithGoogle, signup } from "./actions";

export default async function LoginPage() {
  const supabase = await createClient();
  const login = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };
  return (
    <form>
      {/* <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required /> */}
      <button formAction={loginWithGoogle}>Log in</button>
      {/* <button formAction={signup}>Sign up</button> */}
    </form>
  );
}
