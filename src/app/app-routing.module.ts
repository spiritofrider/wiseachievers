import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { HomeComponent } from './home/home.component';
import { MentorsComponent } from './mentors/mentors.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ValuesComponent } from './values/values.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'values',
    component: ValuesComponent
  },
  {
    path: 'gallery',
    component: GalleryComponent
  },
  {
    path: 'reviews',
    component: ReviewsComponent
  },
  {
    path: 'mentors',
    component: MentorsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
