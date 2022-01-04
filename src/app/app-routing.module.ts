import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopLayoutComponent } from './layout/top-layout/top-layout.component';

const routes: Routes = [

  {
    path: '',
    component: TopLayoutComponent,
    children : [
      {
        path: '',
        redirectTo: 'base',
        pathMatch: 'full'
      },
      {
        path: 'base',
        loadChildren: ()=> import('./base/base.module').then(mod => mod.BaseModule)
      },
      {
        path: '**',
        redirectTo: 'base',
        pathMatch: 'full'
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
