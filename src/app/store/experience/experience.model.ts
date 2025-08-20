export interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
  skills: string[];
  logo?: string;
}

export interface ExperienceState {
  experiences: Experience[];
  selectedExperience: Experience | null;
  loading: boolean;
  error: string | null;
}
