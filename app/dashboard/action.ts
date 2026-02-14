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
export interface UpdateAnimalActionState extends CreateAnimalActionState {
  /**
   * When true, the photo of the animal is being updated
   */
  update_photo: boolean;
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
export async function updateAnimal(
  animalId: string,
  _: UpdateAnimalActionState,
  formData: FormData,
): Promise<UpdateAnimalActionState> {
  const supabase = await createClient();

  const animal: UpdateAnimalActionState = {
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
    update_photo: (formData.get("animal-update-photo")?.valueOf() ===
      "on") as boolean,
    photo: formData.get("animal-photo")?.valueOf() as File | undefined,
  };

  const { photo, update_photo, ...animalDetails } = animal;

  const { data, error } = await supabase
    .from("animals")
    .update([animalDetails])
    .eq("id", animalId)
    .select();

  if (error) {
    console.error(error);
  }

  if (data) {
    if (update_photo) {
      //delete current photo
      await deleteAnimalPhotoFromStorage(animalId);

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
              .update([
                {
                  image_url: imageUrl.publicUrl,
                  file_path: uploadData.path,
                },
              ])
              .eq("animal_id", animalId)
              .select();
          if (animalPhotoError) {
            console.error(animalPhotoError);
          }
          if (animalPhotoData) {
            console.log(
              `animal photo data updated successfully: ${animal.name}`,
            );
          }
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

const deleteAnimalPhotoFromStorage = async (animal_id: string) => {
  const supabase = await createClient();

  //  get path

  let { data: animal_photos, error: animal_photos_error } = await supabase
    .from("animal_photos")
    .select("file_path")
    .eq("animal_id", animal_id);

  if (animal_photos_error) {
    console.error(animal_photos_error);
    return;
  }
  if (animal_photos && animal_photos.length > 0) {
    //  remove from path
    const photoPaths: string[] = animal_photos.map((photo) => {
      if (photo.file_path) {
        try {
          const decoded = decodeURIComponent(photo.file_path);
          return decoded;
        } catch (error) {
          return photo.file_path;
        }
      }
    });
    const { error: fileDeleteError } = await supabase.storage
      .from("animal-photos")
      .remove(photoPaths);
    if (fileDeleteError) {
      console.error(fileDeleteError);
    }
  }
};

export async function deleteAnimal(animal_id: string) {
  const supabase = await createClient();
  //remove photo from bucket
  await deleteAnimalPhotoFromStorage(animal_id);

  //remove from animal photos

  const { error: animalPhotosDeleteError } = await supabase
    .from("animal_photos")
    .delete()
    .eq("animal_id", animal_id);

  if (animalPhotosDeleteError) {
    console.error(animalPhotosDeleteError);
  }

  //remove from animals table

  const { error: animalDeleteError } = await supabase
    .from("animals")
    .delete()
    .eq("id", animal_id);

  if (animalDeleteError) {
    console.error(animalDeleteError);
  } else {
    revalidatePath("/dashboard");
    refresh();
    return;
  }
}
