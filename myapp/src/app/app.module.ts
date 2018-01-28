import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from "../pages/tabs/tabs";
import { AdminPage } from "../pages/admin/admin";
import { UserPage } from "../pages/user/user";
import { LoginadminPage } from "../pages/loginadmin/loginadmin";
import { LoginuserPage } from "../pages/loginuser/loginuser";
import { AdminServiceProvider } from '../providers/admin-service/admin-service';
import { HttpModule } from "@angular/http";
import { UserServiceProvider } from '../providers/user-service/user-service';
import { MeterServiceProvider } from '../providers/meter-service/meter-service';
import { AddmeterServiceProvider } from '../providers/addmeter-service/addmeter-service';
import { ChoicePage } from "../pages/choice/choice";
import { PaymentPage } from "../pages/payment/payment";
import { PaymentServiceProvider } from '../providers/payment-service/payment-service';
import { PaymentaddServiceProvider } from '../providers/paymentadd-service/paymentadd-service';
import { UserpPage } from "../pages/userp/userp";
import { UsermPage } from "../pages/userm/userm";
import { ProblemServiceProvider } from '../providers/problem-service/problem-service';
import { StatusServiceProvider } from '../providers/status-service/status-service';
import { StatusPage } from "../pages/status/status";
import { AdminpPage } from "../pages/adminp/adminp";
import { AdminpServiceProvider } from '../providers/adminp-service/adminp-service';
import { NextpServiceProvider } from '../providers/nextp-service/nextp-service';
import { AddmeterpServiceProvider } from '../providers/addmeterp-service/addmeterp-service';
import { OfflinePage } from "../pages/offline/offline";
import { Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage';
import { SavemServiceProvider } from '../providers/savem-service/savem-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,TabsPage,AdminPage,UserPage,LoginadminPage,LoginuserPage,ChoicePage,PaymentPage,UserpPage,UsermPage,StatusPage,AdminpPage,OfflinePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
    

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,TabsPage,AdminPage,UserPage,LoginadminPage,LoginuserPage,ChoicePage,PaymentPage,UserpPage,UsermPage,StatusPage,AdminpPage,OfflinePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AdminServiceProvider,
    UserServiceProvider,
    MeterServiceProvider,
    AddmeterServiceProvider,
    PaymentServiceProvider,
    PaymentaddServiceProvider,
    ProblemServiceProvider,
    StatusServiceProvider,
    AdminpServiceProvider,
    NextpServiceProvider,
    AddmeterpServiceProvider,
    SavemServiceProvider
  ]
})
export class AppModule {}
