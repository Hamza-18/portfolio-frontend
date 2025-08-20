export interface Project {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  featured: boolean;
  category: string;
}

export interface ProjectState {
  projects: Project[];
  filteredProjects: Project[];
  selectedProject: Project | null;
  categories: string[];
  activeCategory: string;
  searchTerm: string;
  loading: boolean;
  error: string | null;
}
