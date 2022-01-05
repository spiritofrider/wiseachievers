import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopLayoutComponent } from './layout/top-layout/top-layout.component';
import { SharedModule } from './shared/shared.module';
import { BaseModule } from './base/base.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './app.material.module';
import {ModalModule} from 'ngx-bootstrap/modal'
import { JwtInterceptor } from './helpers/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    TopLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BaseModule,
    HttpClientModule,
    MaterialModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule
    ],
  providers: [
    {provide:HTTP_INTERCEPTORS,
    useClass:JwtInterceptor,
  multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
