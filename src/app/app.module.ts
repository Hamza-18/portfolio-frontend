import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Nl2brPipe,
    HeaderNavigationComponent,
    AboutMeComponent,
    BackgroundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({ about: aboutReducer }),
    EffectsModule.forRoot([AboutEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
