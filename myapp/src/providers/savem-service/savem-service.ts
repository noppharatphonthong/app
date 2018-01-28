import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable'; 
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch'; 
import 'rxjs/add/observable/throw';
import { Meter2 } from "../../models/meter2";



@Injectable()
export class SavemServiceProvider {

  constructor(public http: Http) {}
  public addmeter(addmeter):  Observable<Meter2> 
  {  
    let myHeader = new Headers();     
    myHeader.append('Content-Type', 'application/json'); 
    //กําหนด header  
    //ประกาศตวัแปร data เพื่อเก็บข้อมูลที่รบัมา  
    console.log('provider',addmeter) ;  
    let meter2 = { 'addmeter': addmeter }
                      console.log('meter2',meter2);
    //ใช method post() สําหรับสง data เพื่อไปบนัทึกขอมูล     
    return this.http.post('http://192.168.43.123/backend/addmeter2.php',meter2, { headers: myHeader })
    .map((res: Response) => 
    {
      let meter2 = res;//รบั json จาก Backend แลว return ออกไปใหเพจ  
      console.log('data',meter2);       
      return meter2;
    }).catch(this.handleError);   
  }
  private handleError(error: any) { 
    return Observable.throw(error.json().errorMessage || 'Server เกิดข้อผดิพลาด');
  }
} 
