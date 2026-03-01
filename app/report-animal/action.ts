"use server";

import { CreateAnimalReportActionState } from "@/components/report/report-animal-form";
import { createClient } from "@/lib/supabase/server";
import { AnimalReport } from "@/types/report-types";
import { refresh, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function reportAnimal(
  _: CreateAnimalReportActionState,
  formData: FormData,
): Promise<CreateAnimalReportActionState> {
  const supabase = await createClient();

  const animal: CreateAnimalReportActionState = {
    name: formData.get("animal-name")?.valueOf() as string,
    species: formData.get("animal-species")?.valueOf() as string,
    breed: formData.get("animal-breed")?.valueOf() as string,
    gender: formData.get("animal-gender")?.valueOf() as
      | "male"
      | "female"
      | "unknown"
      | null,
    age: formData.get("animal-age")?.valueOf() as string,
    size: formData.get("animal-size")?.valueOf() as
      | "small"
      | "medium"
      | "large"
      | null,
    description: formData.get("animal-description")?.valueOf() as string,
    status: "pending",
    photo: formData.get("animal-photo")?.valueOf() as File | undefined,
    report_type: formData.get("report-type")?.valueOf() as "found" | "lost",
    last_seen_location: formData.get("last-seen-location")?.valueOf() as string,
    last_seen_date: formData.get("last-seen-date")?.valueOf() as string,
    contact_name: formData.get("contact-name")?.valueOf() as string,
    contact_email: formData.get("contact-email")?.valueOf() as string,
    contact_phone: formData.get("contact-phone")?.valueOf() as string,
  };

  console.log(animal);

  const { photo, ...animalDetails } = animal;

  const { data, error } = await supabase
    .from("animal_reports")
    .insert([animalDetails])
    .select();

  if (error) {
    console.error(error);
  }
  if (data) {
    const savedAnimal = data[0] as AnimalReport;
    //upload image
    if (photo && photo.size > 0) {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("animal-photos")
        .upload(
          `report/${savedAnimal.id}/${animal.name}_photo.${photo.name.split(".").pop()}`,
          photo as File,
        );
      if (uploadError) {
        console.error(uploadError);
      }
      if (uploadData) {
        console.log(`photo uploaded successfully for animal: ${animal.name}`);
        // get image url
        const { data: imageUrl } = supabase.storage
          .from("animal-photos")
          .getPublicUrl(uploadData.path);

        console.log(
          `image url retrieved successfully for animal: ${animal.name}`,
        );

        //save animal photo record
        const { data: animalPhotoData, error: animalPhotoError } =
          await supabase
            .from("animal_report_photos")
            .insert([
              {
                report_id: savedAnimal.id,
                image_url: imageUrl.publicUrl,
                file_path: uploadData.path,
              },
            ])
            .select();
        if (animalPhotoError) {
          console.error(animalPhotoError);
        }
        if (animalPhotoData) {
          console.log(`animal photo data saved successfully: ${animal.name}`);
        }
      }
    }
    //revalidate page
    refresh();
    revalidatePath("/registry");
    redirect("/report-animal?submission=true");
  }
  return animal;
}

export async function createAnimalFromReport(reportId: string) {
  const supabase = await createClient();

  const { data: report } = await supabase
    .from("animal_reports")
    .select("*")
    .eq("id", reportId)
    .single();

  if (!report) throw new Error("Report not found");

  const { data: animal, error } = await supabase
    .from("animals")
    .insert({
      name: report.name,
      species: report.species,
      breed: report.breed,
      gender: report.gender,
      age: report.age,
      size: report.size,
      description: report.description,
      status: report.report_type === "found" ? "found" : "adoption",
      found_location: report.last_seen_location,
      found_date: report.last_seen_date,
      is_public: false, // staff can review before publishing
    })
    .select()
    .single();

  if (error) throw error;

  // Copy photos
  const { data: photos } = await supabase
    .from("animal_report_photos")
    .select("*")
    .eq("report_id", reportId);

  if (photos) {
    await supabase.from("animal_photos").insert(
      photos.map((p) => ({
        animal_id: animal.id,
        image_url: p.image_url,
        file_path: p.file_path,
      })),
    );
  }

  // Mark report as processed
  await supabase
    .from("animal_reports")
    .update({ status: "processed" })
    .eq("id", reportId);
}
