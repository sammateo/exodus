import Image from "next/image";
import { loginWithGoogle, signout } from "./login/actions";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <h1>Welcome to the Barbados RSPCA Adoption Information Portal</h1>
      {user && <Link href={"/dashboard"}>Dashboard</Link>}
      <p>{user?.user_metadata.name}</p>
      <form>
        {!user && <button formAction={loginWithGoogle}>Login</button>}
        {user && <button formAction={signout}>Sign Out</button>}
      </form>
    </div>
  );
}
