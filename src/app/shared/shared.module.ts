import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './common/filter/filter.component';
import { MaterialModule } from '../app.material.module';
import { LoginComponent } from './common/login/login.component';



@NgModule({
  declarations: [
    FilterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    FilterComponent,
    LoginComponent
  ]
})
export class SharedModule { }
