import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AboutService } from '../../services/about.service';
import * as AboutActions from './about.actions';

@Injectable()
export class AboutEffects {
  loadAboutMe$ = createEffect(() => this.actions$.pipe(
    ofType(AboutActions.loadAboutMe),
    mergeMap(() => this.aboutService.getAboutMe()
      .pipe(
        map(aboutMe => {console.log(aboutMe); return AboutActions.loadAboutMeSuccess({ aboutMe })}),
        catchError(error => {console.log(error); return of(AboutActions.loadAboutMeFailure({ error }))})
      ))
  ));

  constructor(
    private actions$: Actions,
    private aboutService: AboutService
  ) {}
}
