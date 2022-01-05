import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './common/filter/filter.component';
import { MaterialModule } from '../app.material.module';
import { LoginComponent } from './common/login/login.component';
import { SignupComponent } from './common/signup/signup.component';
import { ContactUsComponent } from './common/contact-us/contact-us.component';
import { LoaderComponent } from './loader/loader.component';



@NgModule({
  declarations: [
    FilterComponent,
    LoginComponent,
    SignupComponent,
    ContactUsComponent,
    LoaderComponent
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
    ContactUsComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
