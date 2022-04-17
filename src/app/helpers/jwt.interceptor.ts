import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap, finalize } from "rxjs/operators";
import { LoaderService } from "../services/loader.service";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private requestCounter = 0;
  bsModalRef: any;
  approval: any;

  constructor(
    private loader: LoaderService,
    private ngxService: NgxUiLoaderService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.requestCounter++;
    request = request.clone({});
    //this.loader.show('')
    this.ngxService.start();

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {},
        (error) => {}
      ),
      finalize(() => {
        this.requestCounter--;
        if (this.requestCounter == 0) {
          this.ngxService.stop();
        }
      })
    );
  }
}
