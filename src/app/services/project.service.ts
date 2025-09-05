import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Project } from '../store/projects/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient) { }

    private apiUrl = 'https://portfolio-backend-vgir.onrender.com';
  
  getProjects(): Observable<Project[]> {
      return this.http.get<Project[]>(`${this.apiUrl}/projects`);
    }

}
