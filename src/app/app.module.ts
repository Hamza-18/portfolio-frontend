import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { Nl2brPipe } from './pipes/nl2br.pipe';
import { HeaderNavigationComponent } from './header-navigation/header-navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Nl2brPipe,
    HeaderNavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
