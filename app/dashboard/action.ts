"use server";

import { createClient } from "@/lib/supabase/server";
import { Animal } from "@/types/data-types";
import { refresh, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface CreateAnimalActionState extends Omit<
  Animal,
  "id" | "created_at" | "updated_at"
> {
  photo: File | undefined;
}

export async function createAnimal(
  _: CreateAnimalActionState,
  formData: FormData,
): Promise<CreateAnimalActionState> {
  const supabase = await createClient();

  const animal: CreateAnimalActionState = {
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
    status: formData.get("animal-status")?.valueOf() as
      | "adoption"
      | "found"
      | "adopted"
      | "reclaimed",
    found_location:
      formData.get("animal-status")?.valueOf() === "found"
        ? (formData.get("animal-found-location")?.valueOf() as string)
        : null,
    found_date:
      formData.get("animal-status")?.valueOf() === "found"
        ? (formData.get("animal-found-date")?.valueOf() as string)
        : null,
    is_public: true,
    photo: formData.get("animal-photo")?.valueOf() as File | undefined,
  };

  console.log(animal);

  const { photo, ...animalDetails } = animal;

  const { data, error } = await supabase
    .from("animals")
    .insert([animalDetails])
    .select();

  if (error) {
    console.error(error);
  }
  if (data) {
    const savedAnimal = data[0] as Animal;
    //upload image
    if (photo && photo.size > 0) {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("animal-photos")
        .upload(
          `${savedAnimal.id}/${animal.name}_photo.${photo.name.split(".").pop()}`,
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
            .from("animal_photos")
            .insert([
              {
                animal_id: savedAnimal.id,
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
    revalidatePath("/dashboard");
    redirect("/dashboard");
  }
  return animal;
}
