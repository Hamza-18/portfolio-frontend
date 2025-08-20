import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import * as AboutActions from '../store/about/about.actions';
import { AboutMe } from '../store/about/about.model';
import { selectAboutMe } from '../store/about/about.selectors';

@Injectable({ providedIn: 'root' })
export class AboutMeResolver implements Resolve<AboutMe> {
  constructor(private store: Store) {}

  resolve(): Observable<AboutMe> {
    return this.store.pipe(
      select(selectAboutMe),
      tap(aboutMe => {
        if (!aboutMe) {
            console.log('loading...');
          this.store.dispatch(AboutActions.loadAboutMe());
        }
      }),
  filter((aboutMe): aboutMe is AboutMe => !!aboutMe),
  take(1)
    );
  }
}
