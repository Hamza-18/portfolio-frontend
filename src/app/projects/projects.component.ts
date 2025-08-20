import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Project } from '../store/projects/project.model';
import * as ProjectActions from '../store/projects/project.actions';
import * as ProjectSelectors from '../store/projects/project.selectors';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Project[]>;
  filteredProjects$: Observable<Project[]>;
  selectedProject$: Observable<Project | null>;
  categories$: Observable<string[]>;
  activeCategory$: Observable<string>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  searchTerm$: Observable<string>;

  constructor(private store: Store) {
    this.projects$ = this.store.select(ProjectSelectors.selectAllProjects);
    this.filteredProjects$ = this.store.select(ProjectSelectors.selectFilteredProjects);
    this.selectedProject$ = this.store.select(ProjectSelectors.selectSelectedProject);
    this.categories$ = this.store.select(ProjectSelectors.selectProjectCategories);
    this.activeCategory$ = this.store.select(ProjectSelectors.selectActiveCategory);
    this.loading$ = this.store.select(ProjectSelectors.selectProjectLoading);
    this.error$ = this.store.select(ProjectSelectors.selectProjectError);
    this.searchTerm$ = this.store.select(ProjectSelectors.selectSearchTerm);
  }

  ngOnInit(): void {
    // Dispatch action to load projects
    this.store.dispatch(ProjectActions.loadProjects());
  }

  filterByCategory(category: string): void {
    this.store.dispatch(ProjectActions.filterProjectsByCategory({ category }));
  }

  selectProject(project: Project): void {
    this.store.dispatch(ProjectActions.selectProject({ project }));
  }

  closeProjectDetails(): void {
    this.store.dispatch(ProjectActions.clearSelectedProject());
  }

  onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.store.dispatch(ProjectActions.searchProjects({ searchTerm }));
  }
}
