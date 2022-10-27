import {Component, Inject, Input} from '@angular/core';
import {Dialog, DialogRef, DIALOG_DATA} from '@angular/cdk/dialog';
import { DialogData } from './cdk-dialog-overview-example';
import { userDataService } from './userData.service';
import { FormGroup,Validators,FormControl } from '@angular/forms';
import { HostBinding, EventEmitter, Output, ElementRef} from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'cdk-dialog-overview-example-dialog',
  templateUrl: 'cdk-dialog-overview-example-dialog.html',
  styleUrls: ['cdk-dialog-overview-example-dialog.css'],
})

export class CdkDialogOverviewExampleDialog {
  isCancelClicked: boolean =true;
  // myTextarea:any;
  regform!:FormGroup;
  recognition:any;
  isChecked:boolean=false;
  
  color: ThemePalette = 'primary';
  @Input()
  content: string;
  @Output() focusout = new EventEmitter();
  userData:any=[];

  browserName = '';
  browserVersion = '';
  osVersion='';
  

  constructor(public dialogRef: DialogRef<string>,
     @Inject(DIALOG_DATA) public data: DialogData,
     private UserDataService:userDataService,
     private el:ElementRef,
     private spinnerService: NgxSpinnerService,
     //private toastrService: ToastrService,
     private snackBar: MatSnackBar) 
     {
    this.regform=new FormGroup({
      name:new FormControl(null,Validators.required),
      wallet:new FormControl(null,Validators.required),
      address:new FormControl(null,Validators.required),
      isChecked:new FormControl(false),
      
    })
    const {webkitSpeechRecognition} : IWindow = <IWindow><unknown>window;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.onresult = (event:any)=> {
     // this.el.nativeElement.querySelector(".content").value += event.results[0][0].transcript
     this.regform.get('address')?.setValue(event.results[0][0].transcript) 
      // console.log('in rsult ',event.results[0][0].transcript) 
     // document.getElementById('toolbar').focus();
     this.showHide("add")
    };

    this.recognition.onnomatch = () => {
      this.showHide("add");

      
    }
 
  }
 
  ngOnInit(): void {
    //Initialize the html controls in reactive form to retrieve its value
    this.browserName = this.detectBrowserName();
    this.browserVersion = this.detectBrowserVersion();
    this.osVersion = this.detectOsVersion();
  }

  detectBrowserName() { 
    const agent = window.navigator.userAgent.toLowerCase()
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'Edge';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'Opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return 'Chrome';
      case agent.indexOf('trident') > -1:
        return 'Ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
  }
   
  detectBrowserVersion(){
      var userAgent = navigator.userAgent, tem, 
      matchTest = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
      
      if(/trident/i.test(matchTest[1])){
          tem =  /\brv[ :]+(\d+)/g.exec(userAgent) || [];
          return 'IE '+(tem[1] || '');
      }
      if(matchTest[1]=== 'Chrome'){
          tem = userAgent.match(/\b(OPR|Edge)\/(\d+)/);
          if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
      }
      matchTest= matchTest[2]? [matchTest[1], matchTest[2]]: [navigator.appName, navigator.appVersion, '-?'];
      if((tem= userAgent.match(/version\/(\d+)/i))!= null) matchTest.splice(1, 1, tem[1]);
      return matchTest.join(' ');
  }
  detectOsVersion()
  {
    var Name = "Unknown OS";
        if (navigator.userAgent.indexOf("Win") != -1) Name = 
          "Windows OS";
        if (navigator.userAgent.indexOf("Mac") != -1) Name = 
          "Macintosh";
        if (navigator.userAgent.indexOf("Linux") != -1) Name = 
          "Linux OS";
        if (navigator.userAgent.indexOf("Android") != -1) Name = 
          "Android OS";
        if (navigator.userAgent.indexOf("like Mac") != -1) Name = 
          "iOS";
          return Name;
    }


  onSubmit() {
    this.spinnerService.show();
    const payload:any = {'name':this.regform.value.name,
                      'address':this.regform.value.address,
                      'wallet':this.regform.value.wallet ,
                    }
    if(this.isCancelClicked)
    {
       payload['img']=this.data.img;
    }
    payload['browserName']=this.browserName;
    payload['browserVarsion']=this.browserVersion;
    payload['osName']=this.osVersion;

    this.UserDataService.uploadfile(payload).subscribe(resp => {

      //console.log(resp)
      this.dialogRef.close();
      this.spinnerService.hide();                            
         // alert("Rep is submitted with rep id : "+ resp.id);
        //  this.toastrService.success("Rep is submitted with rep id : "+ resp.id);
        this.snackBar.open("Rep is submitted with rep id : "+ resp.id, 'close', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });
         })

   
  }
  showHide(action: string){
    if(action === "add") {
      document.getElementsByClassName('voice')[0].classList.add("show");
    } else {
       document.getElementsByClassName('voice')[0].classList.remove("show");
    }
  }
  onFocusOut(event: any){
    this.focusout.emit(event)
  }

  onCancel(val: boolean){
    this.isCancelClicked=val;
   }
   hideImage(){
    document.getElementsByClassName('voice')[0].classList.add("show");
  }
   record(event: any) {
     event.stopPropagation();
    this.showHide("remove");
    this.recognition.start();
  }
}
export interface IWindow extends Window {
  webkitSpeechRecognition: any;
  
}
