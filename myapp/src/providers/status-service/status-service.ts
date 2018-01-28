import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable'; 
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch'; 
import 'rxjs/add/observable/throw';
import { Datastatus } from "../../models/datastatus";


@Injectable()
export class StatusServiceProvider {

  constructor(public http: Http) {}
  public status(address:string,villageno:string):  Observable<Datastatus> 
  {  
    let myHeader = new Headers();     
    myHeader.append('Content-Type', 'application/json'); 
    //กําหนด header  
    //ประกาศตวัแปร data เพื่อเก็บข้อมูลที่รบัมา  
    console.log(address,villageno) ;  
    let data = {'address': address,
                'villageno': villageno}
    //ใช method post() สําหรับสง data เพื่อไปบนัทึกขอมูล     
    return this.http.post('http://192.168.43.123/backend/status.php',data, { headers: myHeader })
    .map((res: Response) => 
    {
      let data = res;//รบั json จาก Backend แลว return ออกไปใหเพจ  
      console.log(data);       
      return data;
    }).catch(this.handleError);   
  }
  private handleError(error: any) { 
    return Observable.throw(error.json().errorMessage || 'Server เกิดข้อผดิพลาด');
  }
} 


