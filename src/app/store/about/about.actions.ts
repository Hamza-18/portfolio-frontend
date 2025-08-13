import { createAction, props } from '@ngrx/store';
import { AboutMe } from './about.model';

export const loadAboutMe = createAction('[About] Load About Me');

export const loadAboutMeSuccess = createAction(
  '[About] Load About Me Success',
  props<{ aboutMe: AboutMe }>()
);

export const loadAboutMeFailure = createAction(
  '[About] Load About Me Failure',
  props<{ error: any }>()
);
