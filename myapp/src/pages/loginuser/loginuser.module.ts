import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginuserPage } from './loginuser';

@NgModule({
  declarations: [
    LoginuserPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginuserPage),
  ],
})
export class LoginuserPageModule {}
