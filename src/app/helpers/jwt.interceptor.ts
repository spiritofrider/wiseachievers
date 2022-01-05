import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    private requestCounter = 0;
    bsModalRef: any;
    approval: any;

    constructor(private loader: LoaderService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    this.requestCounter++;
    console.log("interceptor",this.requestCounter)      
       request = request.clone({
               /*  setHeaders: {
                 Authorization: `Bearer ` + sessionStorage.getItem('accessToken')
                }, withCredentials: true */
            })
    this.loader.show('')            

    return next.handle(request)
            .pipe(tap((event: HttpEvent<any>) => {             
            }, (error) => {        
            }),
                finalize(() => {
                    this.requestCounter--;
                    if (this.requestCounter == 0) {
                        this.loader.hide();
                    }
                })
            );
    }

    


}
