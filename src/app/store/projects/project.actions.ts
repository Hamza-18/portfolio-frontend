import { createAction, props } from '@ngrx/store';
import { Project } from './project.model';

// Load projects
export const loadProjects = createAction('[Projects] Load Projects');
export const loadProjectsSuccess = createAction(
  '[Projects] Load Projects Success',
  props<{ projects: Project[] }>()
);
export const loadProjectsFailure = createAction(
  '[Projects] Load Projects Failure',
  props<{ error: string }>()
);

// Filter projects
export const filterProjectsByCategory = createAction(
  '[Projects] Filter By Category',
  props<{ category: string }>()
);

// Search projects
export const searchProjects = createAction(
  '[Projects] Search Projects',
  props<{ searchTerm: string }>()
);

// Select project
export const selectProject = createAction(
  '[Projects] Select Project',
  props<{ project: Project }>()
);

// Clear selected project
export const clearSelectedProject = createAction(
  '[Projects] Clear Selected Project'
);
