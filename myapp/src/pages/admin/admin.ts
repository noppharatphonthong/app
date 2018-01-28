import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AdminServiceProvider } from "../../providers/admin-service/admin-service";
import { Admin } from '../../models/admin'; 
import { LoginadminPage } from "../loginadmin/loginadmin";
import { HomePage } from "../home/home";
import { ChoicePage } from "../choice/choice";

/**
 * Generated class for the LoginadminPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {
  loginForm: FormGroup; //ชื่อฟอรม   
  username: FormControl;   
  password: FormControl;  
  data:Admin;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private fb: FormBuilder,
              private adminServiceProvider: AdminServiceProvider,
              private alertCtrl: AlertController) {

                this.username = fb.control('',Validators.required);     
                this.password = fb.control('',Validators.required);  
                this.loginForm = fb.group({'username': this.username,'password': this.password});
                
  }
  login():void {
    //console.log(this.myForm.value);     
    //รบัขอมูลตางๆมาจากฟอรม     
    let username = this.loginForm.controls['username'].value;
    let password = this.loginForm.controls['password'].value;
   

    //เรียกใช provider (AuthServiceProvider)     
    this.adminServiceProvider.login(username,password).subscribe(
      (res: any) => {
           this.data = res.json();
           if (this.data.status === 'ok') { 
            // ถาสถานะเทากบั 'ok' แสดงวาบันทกึขอมูลเรียบรอย             
            // let alert = this.alertCtrl.create({               
            //   title: this.data.message,buttons: ['ตกลง']             
            // });             
            // //console.log('signup ok');             
            // alert.present();             
            this.loginForm.reset(); 
            //reset form 
            this.navCtrl.push(ChoicePage)         
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
    
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }

  nextloginadminPage(){
    this.navCtrl.setRoot(LoginadminPage)
  }
}


