import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './common/filter/filter.component';
import { MaterialModule } from '../app.material.module';
import { LoginComponent } from './common/login/login.component';
import { SignupComponent } from './common/signup/signup.component';
import { LoaderComponent } from './loader/loader.component';
import { ConfirmationComponent } from './common/confirmation/confirmation.component';



@NgModule({
  declarations: [
    FilterComponent,
    LoginComponent,
    SignupComponent,
    LoaderComponent,
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    FilterComponent,
    LoginComponent,
    SignupComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
