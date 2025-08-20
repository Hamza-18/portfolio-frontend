import { Component, OnInit } from '@angular/core';
import { ExperienceService } from './experience.service';
import { Experience } from './experience.model';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  experiences: Experience[] = [];
  selectedExperience: Experience | null = null;
  loading = true;
  error = false;

  constructor(private experienceService: ExperienceService) {}

  ngOnInit(): void {
    this.experienceService.getExperiences().subscribe({
      next: (data) => {
        this.experiences = data;
        if (data.length > 0) {
          this.selectedExperience = data[0];
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching experiences:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  selectExperience(experience: Experience): void {
    this.selectedExperience = experience;
  }
}
