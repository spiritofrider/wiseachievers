import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BaseComponent } from './base.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ValuesComponent } from './values/values.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { MentorsComponent } from './mentors/mentors.component';
import { TestExampleComponent } from './test-example/test-example.component';

const routes: Routes = [
{
  path:'',
  component:BaseComponent,
  children: [

    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    },
    {
      path: 'home',
      component : HomeComponent
    },
    {
      path: 'values',
      component : ValuesComponent
    },
    {
      path: 'gallery',
      component : GalleryComponent
    },
    {
      path: 'mentor',
      component : MentorsComponent
    }, 
    {
      path: 'reviews',
      component : ReviewsComponent
    },
    {
      path: 'test',
      component : TestExampleComponent
    },
    {
      path: 'admin',
      loadChildren : () => import('./admin/admin.module').then(mod=> mod.AdminModule)
    },
    {
      path: '**',
      redirectTo: 'home',
      pathMatch: 'full'
    },

  ],
  
},
{
  path: '**',
  redirectTo: 'base',
  pathMatch: 'full'
},
  
 
    
  
];

@NgModule({
  declarations: [HomeComponent, BaseComponent,NavbarComponent,ValuesComponent,GalleryComponent,MentorsComponent,ReviewsComponent,TestExampleComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    FormsModule,
  ]
})
export class BaseModule { }
