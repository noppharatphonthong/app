import { Component, ViewChild } from '@angular/core';
import { NavController,LoadingController , AlertController } from 'ionic-angular';
import {FormGroup,FormBuilder,FormControl} from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Profind } from '../../models/profind';
import { User } from '../../models/user';
import { InputServiceProvider } from '../../providers/input-service/input-service'; 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	@ViewChild('img') img;
	@ViewChild('filess') filess;
	myImg:any;
	selectedFileName: string = null;
	basefile: any;
    myForm: FormGroup;
    var_name: FormControl;
    var_tel:FormControl;
    var_facebook:FormControl;
    var_email:FormControl;
    sub:Subscription;
    auth:Profind[];
    token:User;
    errorMessage:string;
    todo:any; 
    imgdata:string;
  constructor(public navCtrl: NavController,
    private inputServiceProvider:InputServiceProvider,
    private fb:FormBuilder,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,) {
      this.myForm = fb.group({
          'var_name': this.var_name, 
          'var_tel': this.var_tel, 
          'var_facebook': this.var_facebook,
          'var_email': this.var_email
      });

  }
  propagateChange = (_: any) => { };
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched() { }

 changeListener($event): void {
        // debugger; // uncomment this for debugging purposes
        // this.readThis($event.target);
        this.readThis();
    }
 readThis(): void {
        // debugger; // uncomment this for debugging purposes
        var inputFile = this.filess.nativeElement;
        var file: File = inputFile.files[0];
        var img = this.img.nativeElement;
        var myReader: FileReader = new FileReader();
        myReader.onloadend = (e: any) => {
        	img.src = e.target.result;
            this.imgdata = e.target.result;
        	//console.log(e.target.result);
            this.propagateChange(myReader.result);
            this.selectedFileName = file.name;

        }

        // this.basefile = myReader;
        myReader.readAsDataURL(file);
    }
onClickUpload() {
    document.getElementById('uploadFile').click();
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad InputPage');
  }

  ionViewWillEnter() {       
      this.show_profind(); //เรียกใช method getOrder() 
      console.log(this.auth);

  } 

 
  ionViewWillLeave() {       
      this.sub.unsubscribe(); // unsubscribe ขอมูลที่มาจาก server   
  }
  private show_profind() {         
       this.sub = this.inputServiceProvider.show_profind('show_profind','admin').subscribe(        
           (res) => this.auth = res,       
           (error) => this.errorMessage = <any> error     
           );       
   }

   login():void{
           let var_user = this.myForm.controls['var_name'].value;
           let var_tel = this.myForm.controls['var_tel'].value;
           let var_facebook = this.myForm.controls['var_facebook'].value;
           let var_email = this.myForm.controls['var_email'].value;
           console.log(var_user,var_tel,var_facebook,var_email,this.imgdata );
        let loader = this.loadingCtrl.create({
          content:'กำลังบันทึกข้อมูล'
      });
      loader.present();
      this.inputServiceProvider.profind(var_user,var_tel,var_facebook,var_email,this.imgdata,'profind','admin').subscribe(        
           res => {          
            this.token = res; //รับคาขอมูล json จาก provider (Backend)  
            // if (this.user.results === 'success_update') {

              if (this.token.results=="success_update") {
                    let alert = this.alertCtrl.create({               
                       title: this.token.message,               
                       buttons: ['ตกลง']             
                   });                        
                   alert.present();
                   
              }else{
                let alert = this.alertCtrl.create({               
                       title: 'โปรดตรวจสอบรหัสใหม่อีกครั้ง',               
                       buttons: ['ตกลง']             
                   });                        
               alert.present();
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
        },        
        error => {          
            this.errorMessage = <any> error          
            console.log(this.errorMessage);          
            loader.dismiss(); 
         
              },        
              () => {          
                  loader.dismiss();        
              }     
       );
    }
}

