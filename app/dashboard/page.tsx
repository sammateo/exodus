import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: animals, error } = await supabase.from("animals").select("*");

  if (error) {
    console.error(error);
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Total animals: {animals?.length ?? 0}</p>
    </div>
  );
}
