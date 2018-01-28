import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable'; 
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch'; 
import 'rxjs/add/observable/throw';
import { Meter }from '../../models/meter';
import { Addmeterp } from "../../models/addmeterp";

@Injectable()
export class AddmeterpServiceProvider {

  constructor(public http: Http) {}
  public addmeter(savemeter:string,villageid:string):  Observable<Addmeterp> 
  {  
    let myHeader = new Headers();     
    myHeader.append('Content-Type', 'application/json'); 
    //กําหนด header  
    //ประกาศตวัแปร data เพื่อเก็บข้อมูลที่รบัมา  
    console.log(savemeter) ;  
    let datameterp = { 'savemeter': savemeter,
                      'villageid':villageid}
                      console.log(datameterp);
    //ใช method post() สําหรับสง data เพื่อไปบนัทึกขอมูล     
    return this.http.post('http://192.168.43.123/backend/addmeterp.php',datameterp, { headers: myHeader })
    .map((res: Response) => 
    {
      let datameterp = res;//รบั json จาก Backend แลว return ออกไปใหเพจ  
      console.log(datameterp);       
      return datameterp;
    }).catch(this.handleError);   
  }
  private handleError(error: any) { 
    return Observable.throw(error.json().errorMessage || 'Server เกิดข้อผดิพลาด');
  }
} 


