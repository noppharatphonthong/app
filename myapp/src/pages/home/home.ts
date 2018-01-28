import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AdminPage } from "../admin/admin";
import { UserPage } from "../user/user";
import { OfflinePage } from "../offline/offline";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  ionViewDidLoad() {
    
        console.log('ionViewDidLoad SittingPage');
      }
    
      nextadmin(){
        this.navCtrl.push(AdminPage)
      }
      nextuser(){
        this.navCtrl.push(UserPage)
      }
      nextoffline(){
          this.navCtrl.push(OfflinePage)
      }
}
