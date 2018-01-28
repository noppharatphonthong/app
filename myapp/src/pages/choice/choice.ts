import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginadminPage } from "../loginadmin/loginadmin";
import { PaymentPage } from "../payment/payment";
import { AdminpPage } from "../adminp/adminp";

/**
 * Generated class for the ChoicePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choice',
  templateUrl: 'choice.html',
})
export class ChoicePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoicePage');
  }

  nextLoginadmin(){
    this.navCtrl.push(LoginadminPage)
  }
  nextPayment(){
    this.navCtrl.push(PaymentPage)
  }
  nextAdminp(){
    this.navCtrl.push(AdminpPage)
  }
}
