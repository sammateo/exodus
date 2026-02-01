export interface AnimalFilters {
  species?: string; // e.g., "dog", "cat"
  status?: "adoption" | "found" | "adopted" | "reclaimed";
  gender?: "male" | "female" | "unknown";
  size?: "small" | "medium" | "large";
  age?: string; // e.g., "puppy", "adult", "senior"
}
