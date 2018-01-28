import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { User } from '../../models/user'; 
import { LoginuserPage } from "../loginuser/loginuser";


/**
 * Generated class for the LoginadminPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  loginForm: FormGroup; //ชื่อฟอรม   
  address: FormControl;
  villageno: FormControl;    
  password: FormControl;  
  data:User;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private fb: FormBuilder,
              private userServiceProvider: UserServiceProvider,
              private alertCtrl: AlertController) {

                this.address = fb.control('',Validators.required);     
                this.villageno = fb.control('',Validators.required);
                this.password = fb.control('',Validators.required);  
                this.loginForm = fb.group({'address': this.address,'villageno': this.villageno,'password': this.password});
                
  }
  login():void {
    //console.log(this.myForm.value);     
    //รบัขอมูลตางๆมาจากฟอรม     
    let address = this.loginForm.controls['address'].value;
    let villageno = this.loginForm.controls['villageno'].value;
    let password = this.loginForm.controls['password'].value;
    
    //เรียกใช provider (AuthServiceProvider)     
    this.userServiceProvider.login(address,villageno,password).subscribe(
      (res: any) => {
           this.data = res.json();
           if (this.data.status === 'ok') { 
            //ถาสถานะเทากบั 'ok' แสดงวาบันทกึขอมูลเรียบรอย             
            // let alert = this.alertCtrl.create({               
            //   title: this.data.message,buttons: ['ตกลง']             
            // });             
            // //console.log('signup ok');             
            // alert.present();             
            this.loginForm.reset(); 
            //reset form 
            this.navCtrl.push(LoginuserPage)         
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
    console.log('ionViewDidLoad UserPage');
  }
}
