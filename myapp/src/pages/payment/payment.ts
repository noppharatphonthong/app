import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Money } from "../../models/money";
import { PaymentServiceProvider } from "../../providers/payment-service/payment-service";
import { PaymentaddServiceProvider } from "../../providers/paymentadd-service/paymentadd-service";
import { Payment2 } from "../../models/payment2";


/**
 * Generated class for the PaymentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  moneyForm: FormGroup;
  address: FormControl;  
  villageno: FormControl;
 
  addmoneyForm: FormGroup;
  name_last: FormControl;
  villageid: FormControl;
  owe: FormControl;
  current_money: FormControl;
  total_money: FormControl;
  savemoney: FormControl; 
  data:Money;
  datamoney:Payment2;
  errorMessage:String;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private fb: FormBuilder,
              private paymentServiceProvider: PaymentServiceProvider,
              private paymentaddServiceProvider: PaymentaddServiceProvider,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {

                this.address = fb.control('',Validators.required);     
                this.villageno = fb.control('',Validators.required);  
                this.moneyForm = fb.group({'address': this.address,'villageno': this.villageno});

                this.name_last = fb.control('',Validators.required);
                this.villageid = fb.control('',Validators.required);      
                this.owe = fb.control('',Validators.required); 
                this.current_money = fb.control('',Validators.required);
                this.total_money = fb.control('',Validators.required); 
                this.savemoney = fb.control('',Validators.required);
                this.addmoneyForm = fb.group({'name_last': this.name_last,
                                              'villageid': this.villageid,
                                              'owe': this.owe,
                                              'current_money': this.current_money,
                                              'total_money': this.total_money,
                                              'savemoney': this.savemoney,});

    
                
  }
  money():void {
    //console.log(this.myForm.value);     
    //รบัขอมูลตางๆมาจากฟอรม     
    let address = this.moneyForm.controls['address'].value;
    let villageno = this.moneyForm.controls['villageno'].value;
    
    let loader = this.loadingCtrl.create({
      content:'กำลังบันทึกข้อมูล'
  });
  loader.present();
    //เรียกใช provider (AuthServiceProvider)     
    this.paymentServiceProvider.money(address,villageno).subscribe(
      res => {
                      this.data = res; 
                    },
                      error => {          
                          this.errorMessage = <any> error          
                          console.log(this.errorMessage);          
                          loader.dismiss(); 
                       
                            },        
                            () => {          
                                loader.dismiss();        
                            
                              
                    }); 
                  }

public isReadonly() {return true;}
addmoney():void {
  console.log(this.addmoneyForm.value);     
  //รบัขอมูลตางๆมาจากฟอรม     
  let savemoney= this.addmoneyForm.controls['savemoney'].value;
  let villageid = this.addmoneyForm.controls['villageid'].value;
  let total_money = this.addmoneyForm.controls['total_money'].value;

  if(total_money==savemoney){
  //เรียกใช provider (AuthServiceProvider)     
  this.paymentaddServiceProvider.addmoney(savemoney,villageid,total_money).subscribe(
    (res: any) => {
                    this.datamoney = res.json();
                    
                  });
                  let alert = this.alertCtrl.create({               
                      title: "บันทึกการชำระเงินเรียบร้อย",buttons: ['ตกลง']             
                    });             
                    //console.log('signup ok');             
                    alert.present();             
                    this.addmoneyForm.reset(); 
                    this.moneyForm.reset();
  }else{
    let alert = this.alertCtrl.create({               
      title: "กรอกค่าบริการผิดกรุณา [กดปุ่มตรวจสอบผู้ใช้น้ำ] และกรอกค่าบริการใหม่",buttons: ['ตกลง']             
    });             
    //console.log('signup ok');             
    alert.present();             
    this.addmoneyForm.reset(); 
  }
}
                  


  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

}
