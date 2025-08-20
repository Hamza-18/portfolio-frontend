import { createAction, props } from '@ngrx/store';
import { Experience } from './experience.model';

// Load experiences
export const loadExperiences = createAction('[Experience] Load Experiences');
export const loadExperiencesSuccess = createAction(
  '[Experience] Load Experiences Success',
  props<{ experiences: Experience[] }>()
);
export const loadExperiencesFailure = createAction(
  '[Experience] Load Experiences Failure',
  props<{ error: string }>()
);

// Select experience
export const selectExperience = createAction(
  '[Experience] Select Experience',
  props<{ experience: Experience }>()
);

// Clear selected experience
export const clearSelectedExperience = createAction(
  '[Experience] Clear Selected Experience'
);
