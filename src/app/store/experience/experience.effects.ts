import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as ExperienceActions from './experience.actions';
import { Experience } from './experience.model';

// Use absolute import for the service
import { ExperienceService } from '../../../app/services/experience.service';

@Injectable({
  providedIn: 'root'
})
export class ExperienceEffects {
  loadExperiences$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ExperienceActions.loadExperiences),
      mergeMap(() => 
        this.experienceService.getExperiences().pipe(
          map((experiences: Experience[]) => 
            ExperienceActions.loadExperiencesSuccess({ experiences })
          ),
          catchError(error => 
            of(ExperienceActions.loadExperiencesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private experienceService: ExperienceService
  ) {}
}
