import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { Nl2brPipe } from './pipes/nl2br.pipe';
import { HeaderNavigationComponent } from './header-navigation/header-navigation.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { aboutReducer } from './store/about/about.reducer';
import { AboutEffects } from './store/about/about.effects';
import { BackgroundComponent } from 'src/shared/background/background.component';
import { ExperienceComponent } from './experience/experience.component';
import { ProjectsComponent } from './projects/projects.component';

// Service imports
import { ExperienceService } from './services/experience.service';
import { ProjectService } from './services/project.service';

// New store imports
import { experienceReducer } from './store/experience/experience.reducer';
import { projectReducer } from './store/projects/project.reducer';
import { ExperienceEffects } from './store/experience/experience.effects';
import { ProjectEffects } from './store/projects/project.effects';
import { ContactMeComponent } from './contact-me/contact-me.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Nl2brPipe,
    HeaderNavigationComponent,
    AboutMeComponent,
    BackgroundComponent,
    ExperienceComponent,
    ProjectsComponent,
    ContactMeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forRoot({
      about: aboutReducer,
      experience: experienceReducer,
      projects: projectReducer
    }),
    EffectsModule.forRoot([
      AboutEffects,
      ExperienceEffects,
      ProjectEffects
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    })
  ],
  providers: [
    ExperienceService,
    ProjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
