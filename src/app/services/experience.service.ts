import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Experience } from '../store/experience/experience.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private apiUrl = 'https://portfolio-backend-vgir.onrender.com';

  constructor(private http: HttpClient) { }

  getExperiences(): Observable<Experience[]> {
    // Simulating API call with of() operator
      return this.http.get<Experience[]>(`${this.apiUrl}/experience`);
  }
}
