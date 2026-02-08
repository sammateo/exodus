import { signout } from "./login/actions";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import HomeLanding from "@/components/landing/home-landing";
import HomeFooter from "@/components/footer/home-footer";
import NavigationBar from "@/components/navigation/navigation-bar";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <NavigationBar />
        <HomeLanding />
      </main>
      <HomeFooter />
    </div>
  );
}
