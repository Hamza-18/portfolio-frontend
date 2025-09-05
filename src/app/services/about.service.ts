import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AboutMe } from '../store/about/about.model';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private apiUrl = 'https://portfolio-backend-vgir.onrender.com';

  constructor(private http: HttpClient) { }

  getAboutMe(): Observable<AboutMe> {
    return this.http.get<AboutMe>(`${this.apiUrl}/about-me`);
  }
}
