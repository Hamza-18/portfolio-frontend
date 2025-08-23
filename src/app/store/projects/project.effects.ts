import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as ProjectActions from './project.actions';
import { Project } from './project.model';

// Use absolute import for the service
import { ProjectService } from '../../../app/services/project.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectEffects {
  loadProjects$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ProjectActions.loadProjects),
      mergeMap(() => 
        this.projectService.getProjects().pipe(
          map((projects: Project[]) => {
            console.log("load projects");
            return ProjectActions.loadProjectsSuccess({ projects });
          }),
          catchError(error => 
            of(ProjectActions.loadProjectsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private projectService: ProjectService
  ) {}
}
