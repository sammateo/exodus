"use server";
import { createClient } from "@/lib/supabase/server";
import type { Animal, AnimalWithPhotos } from "@/types/data-types";
import { AnimalFilters } from "@/types/filter-types";

export async function getAnimals(filters?: AnimalFilters): Promise<Animal[]> {
  const supabase = await createClient();

  let query = supabase
    .from("animals")
    .select("*")
    .eq("is_public", true)
    .order("created_at", { ascending: false });

  if (filters?.species) query = query.eq("species", filters.species);
  if (filters?.status) query = query.eq("status", filters.status);
  if (filters?.gender) query = query.eq("gender", filters.gender);
  if (filters?.size) query = query.eq("size", filters.size);
  if (filters?.age) query = query.eq("age", filters.age);

  const { data, error } = await query;

  if (error) {
    console.error(error);
    return [];
  }

  return data || [];
}

export async function getAnimalsWithPhotos(filters?: AnimalFilters) {
  const supabase = await createClient();

  let query = supabase
    .from("animals")
    .select(
      `
      *,
      photos:animal_photos (*)
    `,
    )
    .eq("is_public", true)
    .order("created_at", { ascending: false });

  if (filters?.species) query = query.eq("species", filters.species);
  if (filters?.status) query = query.eq("status", filters.status);
  if (filters?.gender) query = query.eq("gender", filters.gender);
  if (filters?.size) query = query.eq("size", filters.size);
  if (filters?.age) query = query.eq("age", filters.age);

  const { data, error } = await query;

  if (error) {
    console.error(error);
    return [];
  }

  return data as AnimalWithPhotos[];
}

export async function getAnimalDetailsWithPhotos(id?: string) {
  const supabase = await createClient();

  let query = supabase
    .from("animals")
    .select(
      `
      *,
      photos:animal_photos (*)
    `,
    )
    .eq("is_public", true)
    .eq("id", id)
    .single();

  const { data, error } = await query;

  if (error) {
    console.error(error);
    return undefined;
  }

  return data as AnimalWithPhotos;
}
