import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Experience } from '../store/experience/experience.model';
import * as ExperienceActions from '../store/experience/experience.actions';
import * as ExperienceSelectors from '../store/experience/experience.selectors';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  experiences$: Observable<Experience[]>;
  selectedExperience$: Observable<Experience | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store) {
    this.experiences$ = this.store.select(ExperienceSelectors.selectExperiences);
    this.selectedExperience$ = this.store.select(ExperienceSelectors.selectSelectedExperience);
    this.loading$ = this.store.select(ExperienceSelectors.selectExperienceLoading);
    this.error$ = this.store.select(ExperienceSelectors.selectExperienceError);
  }

  ngOnInit(): void {
    // Dispatch action to load experiences
    this.store.dispatch(ExperienceActions.loadExperiences());
  }

  selectExperience(experience: Experience): void {
    this.store.dispatch(ExperienceActions.selectExperience({ experience }));
  }
}
