import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { User } from "../../models/user";
import { LoginuserPage } from "../loginuser/loginuser";
import { Meter2 } from "../../models/meter2";
import { HomePage } from "../home/home";
import { SavemServiceProvider } from "../../providers/savem-service/savem-service";
import { Admin } from "../../models/admin";
import { AdminServiceProvider } from "../../providers/admin-service/admin-service";

/**
 * Generated class for the OfflinePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-offline',
  templateUrl: 'offline.html',
})
export class OfflinePage {
  loginForm: FormGroup; //ชื่อฟอรม   
  address: FormControl;
  villageno: FormControl;    
  savemeter: FormControl; 
  meter2:Meter2[]; 
  name; 
  details;
  results;


  loginaForm: FormGroup; //ชื่อฟอรม   
  username: FormControl;   
  password: FormControl;  
  data:Admin;
  data2:any=[];
  global = { PROJECT_ARRAY:[] };

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private fb: FormBuilder,
              public storage:Storage,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private savemServiceProvider:SavemServiceProvider,
              private adminServiceProvider: AdminServiceProvider)

                { 
                this.address = fb.control('',Validators.required);     
                this.villageno = fb.control('',Validators.required);
                this.savemeter = fb.control('',Validators.required);  
                this.loginForm = fb.group({'address': this.address,'villageno': this.villageno,'savemeter': this.savemeter});
               
              
                this.username = fb.control('',Validators.required);     
                this.password = fb.control('',Validators.required);  
                this.loginaForm = fb.group({'username': this.username,'password': this.password});
              }
               
  
  login():void {
    
    //รบัขอมูลตางๆมาจากฟอรม     
    let address = this.loginForm.controls['address'].value;
    let villageno = this.loginForm.controls['villageno'].value;
    let savemeter = this.loginForm.controls['savemeter'].value;
    
    console.log(  this.loginForm.controls['address'].value,  
                  this.loginForm.controls['villageno'].value,
                  this.loginForm.controls['savemeter'].value); 

           
              
         
              if(localStorage.getItem('setvalue')!=null){
                  this.global.PROJECT_ARRAY =JSON.parse(localStorage.getItem('setvalue'));
          
              }
             this.details = { address:address,
                              villageno:villageno,
                              savemeter:savemeter};
          
             this.global.PROJECT_ARRAY.push(this.details);
             localStorage.setItem('setvalue',JSON.stringify(this.global.PROJECT_ARRAY));
              this.results = this.global.PROJECT_ARRAY;
              console.log('Meter',this.global);
              console.log('Meter',this.results);
            
          }

  savem(results):void {
    console.log('Meterresults',this.results);
    let addmeter = this.results;
    console.log('addmeter',addmeter);

    this.savemServiceProvider.addmeter(this.results).subscribe(
      (res: any) => {
                      this.meter2= res;
                      
                    });
                    let alert = this.alertCtrl.create({               
                        title: "บันทึก Meter เรียบร้อย",buttons: ['ตกลง']             
                      });             
                      //console.log('signup ok');             
                      alert.present();             
                      
    
    
    localStorage.clear();
    this.loginForm.reset();
    this.navCtrl.push(HomePage)
  }

  logina():void {
    //console.log(this.myForm.value);     
    //รบัขอมูลตางๆมาจากฟอรม     
    let username = this.loginaForm.controls['username'].value;
    let password = this.loginaForm.controls['password'].value;
   

    //เรียกใช provider (AuthServiceProvider)     
    this.adminServiceProvider.login(username,password).subscribe(
      (res: any) => {
           this.data = res.json();
           
           if (this.data.status === 'ok') { 
            this.data2 = Array.of(this.data);
            console.log('status',this.data.status);
            this.data2.status2='กดปุ่ม';
            
            console.log('status2',this.data2);
            this.loginaForm.reset();
            //reset form 
              
          } else { 
            //ถาสถานะเทากับ 'error' ใหทํางานและแสดงขอความในสวนนี้ 
            let alert = this.alertCtrl.create({
              title: this.data.message,buttons: ['ตกลง']             
            });          
            // console.log('signup not ok');             
            alert.present();          
          }       
        }); 
      }

      delete(prod,results):void {
        console.log('prod',prod);

        let index = this.results.indexOf(prod);
      
           console.log('index',index);
      

        localStorage.clear();
        this.navCtrl.setRoot(OfflinePage);
        }
      }
      
     
                
  // list_value() {
  //   this.name = 'game';
  //   var global = { PROJECT_ARRAY:[] };
  //   if(localStorage.getItem('setvalue')!=null){
  //       global.PROJECT_ARRAY =JSON.parse(localStorage.getItem('setvalue'));

  //   }
  //  this.details = {name:this.name};

  //  global.PROJECT_ARRAY.push(this.details);
  //  localStorage.setItem('setvalue',JSON.stringify(global.PROJECT_ARRAY));
  //   this.results = global.PROJECT_ARRAY;
    

  // }


