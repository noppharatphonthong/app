var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { InputServiceProvider } from '../../providers/input-service/input-service';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, inputServiceProvider, fb, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.inputServiceProvider = inputServiceProvider;
        this.fb = fb;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.selectedFileName = null;
        this.propagateChange = function (_) { };
        this.myForm = fb.group({
            'var_name': this.var_name,
            'var_tel': this.var_tel,
            'var_facebook': this.var_facebook,
            'var_email': this.var_email
        });
    }
    HomePage.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    HomePage.prototype.registerOnTouched = function () { };
    HomePage.prototype.changeListener = function ($event) {
        // debugger; // uncomment this for debugging purposes
        // this.readThis($event.target);
        this.readThis();
    };
    HomePage.prototype.readThis = function () {
        var _this = this;
        // debugger; // uncomment this for debugging purposes
        var inputFile = this.filess.nativeElement;
        var file = inputFile.files[0];
        var img = this.img.nativeElement;
        var myReader = new FileReader();
        myReader.onloadend = function (e) {
            img.src = e.target.result;
            _this.imgdata = e.target.result;
            //console.log(e.target.result);
            _this.propagateChange(myReader.result);
            _this.selectedFileName = file.name;
        };
        // this.basefile = myReader;
        myReader.readAsDataURL(file);
    };
    HomePage.prototype.onClickUpload = function () {
        document.getElementById('uploadFile').click();
    };
    HomePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad InputPage');
    };
    HomePage.prototype.ionViewWillEnter = function () {
        this.show_profind(); //เรียกใช method getOrder() 
        console.log(this.auth);
    };
    HomePage.prototype.ionViewWillLeave = function () {
        this.sub.unsubscribe(); // unsubscribe ขอมูลที่มาจาก server   
    };
    HomePage.prototype.show_profind = function () {
        var _this = this;
        this.sub = this.inputServiceProvider.show_profind('show_profind', 'admin').subscribe(function (res) { return _this.auth = res; }, function (error) { return _this.errorMessage = error; });
    };
    HomePage.prototype.login = function () {
        var _this = this;
        var var_user = this.myForm.controls['var_name'].value;
        var var_tel = this.myForm.controls['var_tel'].value;
        var var_facebook = this.myForm.controls['var_facebook'].value;
        var var_email = this.myForm.controls['var_email'].value;
        console.log(var_user, var_tel, var_facebook, var_email, this.imgdata);
        var loader = this.loadingCtrl.create({
            content: 'กำลังบันทึกข้อมูล'
        });
        loader.present();
        this.inputServiceProvider.profind(var_user, var_tel, var_facebook, var_email, this.imgdata, 'profind', 'admin').subscribe(function (res) {
            _this.token = res; //รับคาขอมูล json จาก provider (Backend)  
            // if (this.user.results === 'success_update') {
            if (_this.token.results == "success_update") {
                var alert_1 = _this.alertCtrl.create({
                    title: _this.token.message,
                    buttons: ['ตกลง']
                });
                alert_1.present();
            }
            else {
                var alert_2 = _this.alertCtrl.create({
                    title: 'โปรดตรวจสอบรหัสใหม่อีกครั้ง',
                    buttons: ['ตกลง']
                });
                alert_2.present();
            }
            // console.log(this.a); 
            // let user = this.jwtHelper.decodeToken(token);        
            // }else{
            //   let alert = this.alertCtrl.create({               
            //            title: 'โปรดตรวจสอบรหัสใหม่อีกครั้ง',               
            //            buttons: ['ตกลง']             
            //        });                        
            //    alert.present();
            // }
        }, function (error) {
            _this.errorMessage = error;
            console.log(_this.errorMessage);
            loader.dismiss();
        }, function () {
            loader.dismiss();
        });
    };
    __decorate([
        ViewChild('img'),
        __metadata("design:type", Object)
    ], HomePage.prototype, "img", void 0);
    __decorate([
        ViewChild('filess'),
        __metadata("design:type", Object)
    ], HomePage.prototype, "filess", void 0);
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController,
            InputServiceProvider,
            FormBuilder,
            LoadingController,
            AlertController])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map