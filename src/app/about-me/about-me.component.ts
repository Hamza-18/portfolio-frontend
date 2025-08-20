import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { AboutMe } from '../store/about/about.model';
import * as AboutActions from '../store/about/about.actions';
import * as AboutSelectors from '../store/about/about.selectors';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {
  aboutMe$: Observable<AboutMe | null>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(private store: Store) {
    this.aboutMe$ = this.store.select(AboutSelectors.selectAboutMe);
    this.loading$ = this.store.select(AboutSelectors.selectAboutMeLoading);
    this.error$ = this.store.select(AboutSelectors.selectAboutMeError);
  }

  ngOnInit(): void {
    this.aboutMe$ = this.store.select(AboutSelectors.selectAboutMe).pipe(
      tap((aboutMe) => {
        if (!aboutMe) {
          console.log("here")
          this.store.dispatch(AboutActions.loadAboutMe());
        }
      })
    );
  }
}
