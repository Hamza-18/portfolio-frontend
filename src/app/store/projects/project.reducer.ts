import { createReducer, on } from '@ngrx/store';
import * as ProjectActions from './project.actions';
import { ProjectState } from './project.model';

export const initialState: ProjectState = {
  projects: [],
  filteredProjects: [],
  selectedProject: null,
  categories: ['All'],
  activeCategory: 'All',
  searchTerm: '',
  loading: false,
  error: null
};

export const projectReducer = createReducer(
  initialState,
  
  // Load projects
  on(ProjectActions.loadProjects, state => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(ProjectActions.loadProjectsSuccess, (state, { projects }) => {
    // Extract unique categories
    const categorySet = new Set<string>();
    projects.forEach(project => categorySet.add(project.category));
    const categories = ['All', ...Array.from(categorySet)];
    
    return {
      ...state,
      projects,
      filteredProjects: projects,
      categories,
      loading: false
    };
  }),
  
  on(ProjectActions.loadProjectsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Filter by category
  on(ProjectActions.filterProjectsByCategory, (state, { category }) => {
    const filteredProjects = category === 'All'
      ? state.projects
      : state.projects.filter(project => project.category === category);
    
    // Also apply current search term if any
    const finalFiltered = state.searchTerm
      ? filterBySearchTerm(filteredProjects, state.searchTerm)
      : filteredProjects;
    
    return {
      ...state,
      activeCategory: category,
      filteredProjects: finalFiltered
    };
  }),
  
  // Search projects
  on(ProjectActions.searchProjects, (state, { searchTerm }) => {
    // First filter by active category
    const categoryFiltered = state.activeCategory === 'All'
      ? state.projects
      : state.projects.filter(project => project.category === state.activeCategory);
    
    // Then filter by search term if present
    const filteredProjects = searchTerm
      ? filterBySearchTerm(categoryFiltered, searchTerm)
      : categoryFiltered;
    
    return {
      ...state,
      searchTerm,
      filteredProjects
    };
  }),
  
  // Select project
  on(ProjectActions.selectProject, (state, { project }) => ({
    ...state,
    selectedProject: project
  })),
  
  // Clear selected project
  on(ProjectActions.clearSelectedProject, state => ({
    ...state,
    selectedProject: null
  }))
);

// Helper function for search filtering
function filterBySearchTerm(projects: any[], searchTerm: string) {
  const term = searchTerm.toLowerCase();
  return projects.filter(project => 
    project.title.toLowerCase().includes(term) || 
    project.description.toLowerCase().includes(term) ||
    project.technologies.some((tech: string) => tech.toLowerCase().includes(term))
  );
}
