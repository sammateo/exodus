export interface Animal {
  id: string;
  name: string | null;
  species: string;
  breed: string | null;
  gender: "male" | "female" | "unknown" | null;
  age: string | null;
  size: "small" | "medium" | "large" | null;
  description: string | null;
  status: "adoption" | "found" | "adopted" | "reclaimed";
  found_location: string | null;
  found_date: string | null; // ISO date string
  is_public: boolean;
  created_at: string;
  updated_at: string;
}
export interface AnimalPhoto {
  id: string;
  animal_id: string;
  image_url: string;
  file_path: string;
  created_at: string;
}
export interface StaffProfile {
  id: string; // matches auth.users.id
  role: "staff" | "admin";
  created_at: string;
}
export interface AnimalWithPhotos extends Animal {
  photos: AnimalPhoto[];
}
