import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Experience } from './experience.model';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  
  // Sample data - in a real app you might fetch this from an API
  private experiences: Experience[] = [
    {
      company: 'Wavelet',
      position: 'Senior Backend Developer',
      duration: 'Jan 2023 - Present',
      description: 'Led the development of scalable microservices architecture, optimizing API performance and implementing robust security protocols.',
      skills: ['Node.js', 'Express', 'MongoDB', 'Docker', 'Kubernetes'],
      logo: 'assets/images/wavelet-logo.png'
    },
    {
      company: 'CodeCraft',
      position: 'Full Stack Engineer',
      duration: 'Mar 2020 - Dec 2022',
      description: 'Designed and developed full-stack applications with responsive UIs and RESTful APIs, improving system performance by 40%.',
      skills: ['Angular', 'TypeScript', 'PostgreSQL', 'AWS', 'CI/CD'],
      logo: 'assets/images/codecraft-logo.png'
    },
    {
      company: 'TechNova',
      position: 'Backend Developer',
      duration: 'Jun 2018 - Feb 2020',
      description: 'Built and maintained backend services handling millions of requests daily, implementing efficient data processing pipelines.',
      skills: ['Python', 'Django', 'Redis', 'Celery', 'Git'],
      logo: 'assets/images/technova-logo.png'
    }
  ];

  constructor() { }

  getExperiences(): Observable<Experience[]> {
    // Simulating API call with of() operator
    return of(this.experiences);
  }
}
