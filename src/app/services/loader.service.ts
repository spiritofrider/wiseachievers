import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderState } from '../shared/loader/loader';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();
  
  
  private _loading: boolean = false;
  loadingStatus = new Subject<boolean>();
  constructor() { }
  show(message) {
    this.loaderSubject.next(<LoaderState>{ show: true, text: message });
  }
  hide() {
    this.loaderSubject.next(<LoaderState>{ show: false });
  }

  get loading():boolean {
    return this._loading;
  }

  set loading(value) {
    this._loading = value;
    this.loadingStatus.next(value);
  }

  startLoading() {
  
  } 

  stopLoading() {
  }
}
