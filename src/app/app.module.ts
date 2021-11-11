import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBandComponent } from './top-band/top-band.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { Section2Component } from './section2/section2.component';
import { Section3Component } from './section3/section3.component';
import { Section4Component } from './section4/section4.component';
import { Section5Component } from './section5/section5.component';
import { ValuesComponent } from './values/values.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { MentorsComponent } from './mentors/mentors.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBandComponent,
    NavbarComponent,
    HomeComponent,
    Section2Component,
    Section3Component,
    Section4Component,
    Section5Component,
    ValuesComponent,
    GalleryComponent,
    ReviewsComponent,
    MentorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
