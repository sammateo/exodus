"use server";

import { createClient } from "@/lib/supabase/server";
import { AnimalReportFilters } from "@/types/filter-types";
import { AnimalReportWithPhotos } from "@/types/report-types";

export async function getAnimalReportsWithPhotos(
  filters?: AnimalReportFilters,
) {
  const supabase = await createClient();

  let query = supabase
    .from("animal_reports")
    .select(
      `
      *,
      photos:animal_report_photos (*)
    `,
    )
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

  return data as AnimalReportWithPhotos[];
}
export async function getAnimalReportDetailsWithPhotos(reportId: string) {
  const supabase = await createClient();

  let query = supabase
    .from("animal_reports")
    .select(
      `
      *,
      photos:animal_report_photos (*)
    `,
    )
    .order("created_at", { ascending: false })
    .eq("id", reportId)
    .single();

  const { data, error } = await query;

  if (error) {
    console.error(error);
    return null;
  }

  return data as AnimalReportWithPhotos;
}
