import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTOBJ } from 'src/app/shared/shared-constant';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private httpClient: HttpClient) { }


  getTest1Questionlist(){
    return this.httpClient.get(environment.baseTestUrlNode+CONSTOBJ['test']['getTest1List'])
  }

}
