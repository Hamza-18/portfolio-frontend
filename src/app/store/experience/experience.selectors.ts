import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExperienceState } from './experience.model';

export const selectExperienceState = createFeatureSelector<ExperienceState>('experience');

export const selectExperiences = createSelector(
  selectExperienceState,
  (state: ExperienceState) => state.experiences
);

export const selectSelectedExperience = createSelector(
  selectExperienceState,
  (state: ExperienceState) => state.selectedExperience
);

export const selectExperienceLoading = createSelector(
  selectExperienceState,
  (state: ExperienceState) => state.loading
);

export const selectExperienceError = createSelector(
  selectExperienceState,
  (state: ExperienceState) => state.error
);
