import { Component, ElementRef, EventEmitter, Inject, Input,OnInit,
  Output,
} from '@angular/core';
import { Dialog, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { ViewChild } from '@angular/core';
import { NgxCaptureService } from 'ngx-capture';
import { tap } from 'rxjs/operators';
import { CdkDialogOverviewExampleDialog } from './cdk-dialog-overview-example-dialog';
import { userDataService } from './userData.service';
import {NgModule} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

export interface DialogData {
  img: string;
}

/**
 * @title CDK Dialog Overview
 */
@Component({
  selector: 'cdk-dialog-overview-example',
  templateUrl: 'cdk-dialog-overview-example.html',
  styleUrls: ['cdk-dialog-overview-example.css'],
})
export class CdkDialogOverviewExample implements OnInit {
  public img:any;
  name = 'Demo';
  userData:any=[];
  startLoader:boolean;
  typeSelected: string;

  ngOnInit() {
    
  }
  @ViewChild('screen', { static: true }) screen: ElementRef<any>;


  constructor(
    public dialog: Dialog,
    private captureService: NgxCaptureService,
    private UserDataService:userDataService,
    private spinnerService: NgxSpinnerService
  ) {
    this.typeSelected = 'timer';
  } 

  

  onSubmit(formValue: any) {
    console.log(formValue);
  }

  openDialog(): void {
    //loader start
    //this.startLoader=true;
    this.spinnerService.show();
    const dimensions = this.screen.nativeElement.getBoundingClientRect();
    this.captureService
    .getImage(this.screen.nativeElement, false, {
      width: dimensions.width,
      height: dimensions.height,
      useCORS: true,
    })
    .subscribe(result=>{
      //loader close
      //this.startLoader=false;
      this.spinnerService.hide();
      console.log(result);
      const dialogRef = this.dialog.open<string>(CdkDialogOverviewExampleDialog, {

        width:'40%',height:'100%',
        data: { img: result },
        
      });
      
    });
    
    // const dialogRef = this.dialog.open<string>(CdkDialogOverviewExampleDialog, {
    //   data: { img: this.img },
    // });

    // // dialogRef.closed.subscribe((result) => {
    // //   this.img = result;
    // });
   
  }
}
