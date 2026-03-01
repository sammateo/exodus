export interface AnimalReport {
  id: string;
  report_type: "lost" | "found";
  name: string | null;
  species: string;
  breed: string | null;
  gender: "male" | "female" | "unknown" | null;
  age: string | null;
  size: "small" | "medium" | "large" | null;
  description: string | null;
  last_seen_location: string | null;
  last_seen_date: string | null;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  status: "pending" | "processed" | "rejected";
  created_at: string;
}

export interface AnimalReportPhoto {
  id: string;
  report_id: string;
  image_url: string;
  file_path: string;
  created_at: string;
}
export interface AnimalReportWithPhotos extends AnimalReport {
  photos: AnimalReportPhoto[];
}
