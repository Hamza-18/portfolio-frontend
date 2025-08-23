import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Project } from '../store/projects/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient) { }

    private apiUrl = 'http://localhost:5000';
  
  getProjects(): Observable<Project[]> {
      return this.http.get<Project[]>(`${this.apiUrl}/projects`);
    }

}
