import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProjectState } from './project.model';

export const selectProjectState = createFeatureSelector<ProjectState>('projects');

export const selectAllProjects = createSelector(
  selectProjectState,
  (state: ProjectState) => state.projects
);

export const selectFilteredProjects = createSelector(
  selectProjectState,
  (state: ProjectState) => state.filteredProjects
);

export const selectSelectedProject = createSelector(
  selectProjectState,
  (state: ProjectState) => state.selectedProject
);

export const selectProjectCategories = createSelector(
  selectProjectState,
  (state: ProjectState) => state.categories
);

export const selectActiveCategory = createSelector(
  selectProjectState,
  (state: ProjectState) => state.activeCategory
);

export const selectSearchTerm = createSelector(
  selectProjectState,
  (state: ProjectState) => state.searchTerm
);

export const selectProjectLoading = createSelector(
  selectProjectState,
  (state: ProjectState) => state.loading
);

export const selectProjectError = createSelector(
  selectProjectState,
  (state: ProjectState) => state.error
);
