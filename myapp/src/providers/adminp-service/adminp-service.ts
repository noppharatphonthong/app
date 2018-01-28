import { Injectable } from '@angular/core';
import {Http , Response} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; 
import { Adp } from "../../models/adp";


@Injectable()
export class AdminpServiceProvider {

  constructor(public http: Http) {
    console.log('Hello AdminpServiceProvider Provider');
  }
  getOrder():Observable<Adp[]> {     
    return this.http.get('http://192.168.43.123/backend/loadadminp.php')
      .map((res:Response) => <Adp[]> res.json())     
      .catch(this.handleError); 

}
private handleError(error:any) {     
  return Observable.throw(error.json().errorMessage || 'เกิดข้อผิดพลาดจาก Server');   
}
}