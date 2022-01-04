import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment'
import { CONSTOBJ } from '../shared/shared-constant';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private httpClient: HttpClient) { }


  getAllUsers(){
    return this.httpClient.get(environment.baseUrlNode+CONSTOBJ['admin']['getAllUsers'])
  }

  editUsers(id,body){
    return this.httpClient.put(environment.baseUrlNode+CONSTOBJ['admin']['editUser']+id,body)
  }

  loginUser(formbody){
    return this.httpClient.post(environment.baseUrlNode+CONSTOBJ['login'],formbody)
  }


}
