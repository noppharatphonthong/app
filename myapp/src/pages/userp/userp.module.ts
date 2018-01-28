import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserpPage } from './userp';

@NgModule({
  declarations: [
    UserpPage,
  ],
  imports: [
    IonicPageModule.forChild(UserpPage),
  ],
})
export class UserpPageModule {}
