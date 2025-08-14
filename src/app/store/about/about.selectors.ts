import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AboutState } from './about.reducer';

export const selectAboutState = createFeatureSelector<AboutState>('about');

export const selectAboutMe = createSelector(
  selectAboutState,
  (state: AboutState) => state.aboutMe
);

export const selectAboutMeLoading = createSelector(
  selectAboutState,
  (state: AboutState) => state.loading
);

export const selectAboutMeError = createSelector(
  selectAboutState,
  (state: AboutState) => state.error
);
