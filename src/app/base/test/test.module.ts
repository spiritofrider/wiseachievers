import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { TestScreenComponent } from './test-screen/test-screen.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { CareerProfilerComponent } from './career-profiler/career-profiler.component';


const routes: Routes = [
  {
    path: '',
    children:[
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'
      },
      {
        path: 'main',
        component : TestComponent  
      },
      {
        path: 'test1',
        component : TestScreenComponent
      },
      {
        path: '**',
        redirectTo: 'main',
        pathMatch: 'full'
      },

    ]
  },

  {
    path: '**',
    redirectTo: 'test',
    pathMatch: 'full'
  },

]


@NgModule({
  declarations: [
    TestComponent,
    TestScreenComponent,
    CareerProfilerComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    FormsModule,
    ChartsModule
  ]
})
export class TestModule { }
