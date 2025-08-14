import { createReducer, on } from '@ngrx/store';
import * as AboutActions from './about.actions';
import { AboutMe } from './about.model';

export interface AboutState {
  aboutMe: AboutMe | null;
  loading: boolean;
  error: any;
}

export const initialState: AboutState = {
  aboutMe: null,
  loading: false,
  error: null
};

export const aboutReducer = createReducer(
  initialState,
  on(AboutActions.loadAboutMe, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AboutActions.loadAboutMeSuccess, (state, { aboutMe }) => ({
    ...state,
    aboutMe,
    loading: false
  })),
  on(AboutActions.loadAboutMeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
