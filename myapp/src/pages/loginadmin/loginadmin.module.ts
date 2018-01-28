import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginadminPage } from './loginadmin';

@NgModule({
  declarations: [
    LoginadminPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginadminPage),
  ],
})
export class LoginadminPageModule {}
