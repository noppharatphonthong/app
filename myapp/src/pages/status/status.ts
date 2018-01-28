import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Datastatus } from "../../models/datastatus";
import { StatusServiceProvider } from "../../providers/status-service/status-service";



/**
 * Generated class for the LoginadminPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-status',
  templateUrl: 'status.html',
})
export class StatusPage {
  statusForm: FormGroup; //ชื่อฟอรม   
  address: FormControl;
  villageno: FormControl;     
  data:Datastatus;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private fb: FormBuilder,
              private statusServiceProvider: StatusServiceProvider,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {

                this.address = fb.control('',Validators.required);     
                this.villageno = fb.control('',Validators.required);
                this.statusForm = fb.group({'address': this.address,'villageno': this.villageno});
                
  }
  status():void {
    //console.log(this.myForm.value);     
    //รบัขอมูลตางๆมาจากฟอรม     
    let address = this.statusForm.controls['address'].value;
    let villageno = this.statusForm.controls['villageno'].value;
  

    //เรียกใช provider (AuthServiceProvider)     
    this.statusServiceProvider.status(address,villageno).subscribe(
      (res: any) => {
           this.data = res.json();
           
        }); 
      }
  ionViewDidLoad() {
    console.log('ionViewDidLoad StatusPage');
  }
}
