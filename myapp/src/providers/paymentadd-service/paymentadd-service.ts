import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable'; 
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch'; 
import 'rxjs/add/observable/throw';
import { Payment2 } from "../../models/payment2";


@Injectable()
export class PaymentaddServiceProvider {

  constructor(public http: Http) {}
  public addmoney(savemoney:string,villageid:string,total_money:string):  Observable<Payment2> 
  {  
    let myHeader = new Headers();     
    myHeader.append('Content-Type', 'application/json'); 
    //กําหนด header  
    //ประกาศตวัแปร data เพื่อเก็บข้อมูลที่รบัมา  
    console.log(savemoney) ;  
    let datamoney = { 'savemoney': savemoney,
                      'villageid':villageid,
                      'total_money':total_money}
                      console.log(datamoney);
    //ใช method post() สําหรับสง data เพื่อไปบนัทึกขอมูล     
    return this.http.post('http://192.168.43.123/backend/addmoney.php',datamoney, { headers: myHeader })
    .map((res: Response) => 
    {
      let datamoney = res;//รบั json จาก Backend แลว return ออกไปใหเพจ  
      console.log(datamoney);       
      return datamoney;
    }).catch(this.handleError);   
  }
  private handleError(error: any) { 
    return Observable.throw(error.json().errorMessage || 'Server เกิดข้อผดิพลาด');
  }
} 


