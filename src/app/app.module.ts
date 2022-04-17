import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TopLayoutComponent } from "./layout/top-layout/top-layout.component";
import { SharedModule } from "./shared/shared.module";
import { BaseModule } from "./base/base.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./app.material.module";
import { ModalModule } from "ngx-bootstrap/modal";
import { JwtInterceptor } from "./helpers/jwt.interceptor";
import { LoaderComponent } from "./shared/loader/loader.component";
import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  SPINNER_TYPES,
  NGX_POSITIONS,
  PB_DIRECTIONS,
} from "ngx-ui-loader";

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "#0062cc",
  bgsPosition: NGX_POSITIONS.bottomCenter,
  bgsSize: 40,
  bgsType: SPINNER_TYPES.ballSpinClockwiseFadeRotating,
  pbDirection: PB_DIRECTIONS.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness
};

@NgModule({
  declarations: [AppComponent, TopLayoutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BaseModule,
    HttpClientModule,
    MaterialModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  exports: [LoaderComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
