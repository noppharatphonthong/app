import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MeterServiceProvider } from "../../providers/meter-service/meter-service";
import { Meter } from '../../models/meter'; 
import { AddmeterServiceProvider } from "../../providers/addmeter-service/addmeter-service";

import { AdminPage } from "../admin/admin";
import { Addmeter } from "../../models/addmeter";
import { Addmeterp } from "../../models/addmeterp";
import { AddmeterpServiceProvider } from "../../providers/addmeterp-service/addmeterp-service";


/**
 * Generated class for the LoginadminPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loginadmin',
  templateUrl: 'loginadmin.html',
})
export class LoginadminPage {
  meterForm: FormGroup;
  address: FormControl;  
  villageno: FormControl;
  admeter: FormControl; 
  name_last: FormControl;
  villageid: FormControl;
  total_meter: FormControl; 
  data:Meter;
  datameterp:Addmeterp;
  datameter:Addmeter;
  addForm: FormGroup;  
  savemeter: FormControl;
  errorMessage:String;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private fb: FormBuilder,
              private meterServiceProvider: MeterServiceProvider,
              private addmeterServiceProvider: AddmeterServiceProvider,
              private addmeterpServiceProvider:AddmeterpServiceProvider,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {

                this.address = fb.control('',Validators.required);     
                this.villageno = fb.control('',Validators.required);  
                this.meterForm = fb.group({'address': this.address,'villageno': this.villageno});

                this.name_last = fb.control('',Validators.required);
                this.villageid = fb.control('',Validators.required);
                this.total_meter = fb.control('',Validators.required);
                this.savemeter = fb.control('',Validators.required);
                this.addForm = fb.group({ 'savemeter': this.savemeter,
                                          'name_last': this.name_last,
                                          'villageid': this.villageid,
                                          'total_meter' : this.total_meter});
                
  }
  meter():void {
    //console.log(this.myForm.value);     
    //รบัขอมูลตางๆมาจากฟอรม     
    let address = this.meterForm.controls['address'].value;
    let villageno = this.meterForm.controls['villageno'].value;
    
    let loader = this.loadingCtrl.create({
      content:'กำลังบันทึกข้อมูล'
  });
  loader.present();
    //เรียกใช provider (AuthServiceProvider)     
    this.meterServiceProvider.meter(address,villageno).subscribe(
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
  addmeter():void {
    console.log(this.addForm.value);     
    //รบัขอมูลตางๆมาจากฟอรม     
    let savemeter = this.addForm.controls['savemeter'].value;
    let villageid = this.addForm.controls['villageid'].value;
    let total_meter = this.addForm.controls['total_meter'].value;
    if(total_meter<=savemeter){
    //เรียกใช provider (AuthServiceProvider)     
    this.addmeterServiceProvider.addmeter(savemeter,villageid,total_meter).subscribe(
      (res: any) => {
                      this.datameterp = res.json();
                      
                    });
                    let alert = this.alertCtrl.create({               
                        title: "บันทึก Meter เรียบร้อย",buttons: ['ตกลง']             
                      });             
                      //console.log('signup ok');             
                      alert.present();             
                      this.addForm.reset(); 
                      this.meterForm.reset();
    }else{
      // let alert = this.alertCtrl.create({               
      //   title: "ค่า Meter ผิดกรุณา [กดปุ่มตรวจสอบผู้ใช้น้ำ] และกรอกค่า Meter ใหม่",buttons: ['ตกลง']          
      //    });             
      // //console.log('signup ok'); 
               
      // alert.present();             
      // this.addForm.reset(); 
      let prompt = this.alertCtrl.create({
        title: 'ข้อมูล Meter ผิด',
        message: "ถ้ากรอก Meter ปัจจุบันผิด กรุณา [กดปุ่มกรอกค่า Meter ใหม่] และกรอกค่า Meter ใหม่ หรือถ้ากรอก Meter ปัจจุบันถูกแล้วให้กดแก้ไข Meter",
       
        
        inputs: [
          {
            name: 'meterp',
            placeholder: 'กรอกค่า Meter ปัจจุบันเพิ่อแก้ไข'
          },
        ],
        buttons: [
          {
            text: 'กรอกค่า Meter ใหม่'
           
          },
          {
            text: 'แก้ไข Meter',
            handler: datam => {
              console.log(datam);
              savemeter=datam;
              this.addmeterp(datam,villageid);
            }
          }
        ]
      });
      prompt.present();
      this.addForm.reset(); 
    }
  }
  addmeterp(datam,villageid):void {
    console.log(this.addForm.value);     
    //รบัขอมูลตางๆมาจากฟอรม     
    let savemeter = datam.meterp;
    console.log(savemeter);
    console.log(villageid);
    if(savemeter){
    //เรียกใช provider (AuthServiceProvider)     
    this.addmeterpServiceProvider.addmeter(savemeter,villageid).subscribe(
      (res: any) => {
                      this.datameter= res.json();
                      
                    });
                    let alert = this.alertCtrl.create({               
                        title: "แก้ไข Meter เรียบร้อย",buttons: ['ตกลง']             
                      });             
                      //console.log('signup ok');             
                      alert.present();             
                      this.addForm.reset(); 
                      this.meterForm.reset();

      }
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginadminPage');
  }

}


