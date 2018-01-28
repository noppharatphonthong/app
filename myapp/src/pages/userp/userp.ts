import { Component, ViewChild } from '@angular/core';
import { NavController,LoadingController , AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { ProblemServiceProvider } from "../../providers/problem-service/problem-service";
import { Datap } from "../../models/datap";
import { Meter } from "../../models/meter";
import { MeterServiceProvider } from "../../providers/meter-service/meter-service";

@Component({
  selector: 'page-userp',
  templateUrl: 'userp.html'
})
export class UserpPage {
	@ViewChild('img') img;
  @ViewChild('filess') filess;
  problemForm:FormGroup; 
    myImg:any;
    selectedFileName: string = null;
    basefile: any;
    sub:Subscription;
    errorMessage:string;
    imgdata:string;
    prob: FormControl;
    datap:Datap;

    meterForm: FormGroup;
    address: FormControl;
    villageid: FormControl;
    villageno: FormControl;   
    data:Meter;
    
  constructor(public navCtrl: NavController,
              private problemServiceProvider:ProblemServiceProvider,
              private meterServiceProvider:MeterServiceProvider,
              private fb:FormBuilder,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,) {

                this.address = fb.control('',Validators.required);     
                this.villageno = fb.control('',Validators.required);  
                this.meterForm = fb.group({ 'address': this.address,
                                            'villageno': this.villageno});

                this.prob = fb.control('',Validators.required);
                this.villageid = fb.control('',Validators.required);
                this.problemForm = fb.group({ 'prob': this.prob,'villageid':this.villageid});

                      
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
          console.log(this.imgdata);
            this.propagateChange(myReader.result);
            this.selectedFileName = file.name;

        }

        // this.basefile = myReader;
        myReader.readAsDataURL(file);
    }
onClickUpload() {
    document.getElementById('uploadFile').click();
  }
  meter():void {
    //console.log(this.myForm.value);     
    //รบัขอมูลตางๆมาจากฟอรม     
    let address = this.meterForm.controls['address'].value;
    let villageno = this.meterForm.controls['villageno'].value;
    
    let loader = this.loadingCtrl.create({
      content:'กำลังบันทึกข้อมูล'
  });
  loader.present();
    //เรียกใช provider (AuthServiceProvider)     
    this.meterServiceProvider.meter(address,villageno).subscribe(
      res => {
                      this.data = res; 
                    },
                      error => {          
                          this.errorMessage = <any> error          
                          console.log(this.errorMessage);          
                          loader.dismiss(); 
                       
                            },        
                            () => {          
                                loader.dismiss();        
                            
                              
                    }); 
                  }

 public isReadonly() {return true;}
  problem():void {
    //console.log(this.myForm.value);     
    //รบัขอมูลตางๆมาจากฟอรม   
    let imgp = this.imgdata;  
    let prob = this.problemForm.controls['prob'].value;
    let villageid = this.problemForm.controls['villageid'].value;
    
    
    
    console.log(prob);
    console.log(imgp);
    let loader = this.loadingCtrl.create({
      content:'กำลังบันทึกข้อมูล'
  });
  loader.present();

    //เรียกใช provider (AuthServiceProvider)  
    
    //*********************************อย่าสลับตำแหน่งในวงเล็บ *******************************
    this.problemServiceProvider.problem(imgp,prob,villageid).subscribe(
      res => {
                      this.datap = res; 
                      this.problemForm.reset(); 
                      this.meterForm.reset();
                    },
                      error => {          
                          this.errorMessage = <any> error          
                          console.log(this.errorMessage);          
                          loader.dismiss(); 
                       
                            },        
                            () => {          
                                loader.dismiss();        
                            
                              
                    }); 
                  }
}

