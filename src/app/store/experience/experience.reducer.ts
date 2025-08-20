import { createReducer, on } from '@ngrx/store';
import * as ExperienceActions from './experience.actions';
import { ExperienceState } from './experience.model';

export const initialState: ExperienceState = {
  experiences: [],
  selectedExperience: null,
  loading: false,
  error: null
};

export const experienceReducer = createReducer(
  initialState,
  
  // Load experiences
  on(ExperienceActions.loadExperiences, state => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(ExperienceActions.loadExperiencesSuccess, (state, { experiences }) => ({
    ...state,
    experiences,
    loading: false,
    selectedExperience: experiences.length > 0 ? experiences[0] : null
  })),
  
  on(ExperienceActions.loadExperiencesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Select experience
  on(ExperienceActions.selectExperience, (state, { experience }) => ({
    ...state,
    selectedExperience: experience
  })),
  
  // Clear selected experience
  on(ExperienceActions.clearSelectedExperience, state => ({
    ...state,
    selectedExperience: null
  }))
);
