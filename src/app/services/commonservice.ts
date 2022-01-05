import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment'
import { CONSTOBJ } from '../shared/shared-constant';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private httpClient: HttpClient,private _snackBar:MatSnackBar) { }


  getAllUsers(){
    return this.httpClient.get(environment.baseUrlNode+CONSTOBJ['admin']['getAllUsers'])
  }

  editUsers(id,body){
    return this.httpClient.put(environment.baseUrlNode+CONSTOBJ['admin']['editUser']+id,body)
  }

  loginUser(formbody){
    return this.httpClient.post(environment.baseUrlNode+CONSTOBJ['login'],formbody)
  }


  snackBar(message: string, snackStyle: string) {    
    this._snackBar.open(message, '', {      
      duration: 3000,
      panelClass: [snackStyle]    
    });

    }
private isAdmin = new BehaviorSubject<any>([])
private isActive = new BehaviorSubject<any>([])


updatedIsAdmin = this.isAdmin.asObservable();
updatedIsActive = this.isActive.asObservable();


  updateData(data:any,keyToShare){
    switch(keyToShare){
      case 'isAdmin':
        this.isAdmin.next(data)
      break;
      case 'isActive':
        this.isActive.next(data)
      break;
    }
  }

}
