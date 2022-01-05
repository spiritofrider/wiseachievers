import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { LoaderService } from '../services/loader.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    private requestCounter = 0;
    bsModalRef: any;
    approval: any;

    constructor(private router: Router, private storageService: StorageService,
        private loader: LoaderService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    this.requestCounter++;
    console.log(this.requestCounter)      
       request = request.clone({
               /*  setHeaders: {
                 Authorization: `Bearer ` + sessionStorage.getItem('accessToken')
                }, withCredentials: true */
            })
    return next.handle(request)
            .pipe(tap((event: HttpEvent<any>) => {             
            this.loader.show('')            
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
