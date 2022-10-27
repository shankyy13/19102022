import { Component, VERSION } from '@angular/core';
import { userDataService } from './userData.service';
import { Dialog, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import {NotifyActionComponent} from './NotifyAction.component';
import { NgxSpinnerService } from 'ngx-spinner';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {  DetailsComponents } from './detailsColumn.component';


@Component({
  selector: 'userList',
  templateUrl: './userList.component.html',
  styleUrls: [ './userList.component.css' ]
})
export class userList  {
  userData:any=[];
  dataSource = this.userData;
  displayedColumns: string[] = ['ID', 'Comments','display', 'Image','Review','action'];
  ImageUrl:any;
  happy:boolean=false;
  Angry:boolean=false;
  Neutral:boolean=false;
  isNotifyClicked:boolean=false;
  Id:any;
  isfullView:boolean=false;
  idMatch:any;

 constructor(private UserDataService:userDataService,public dialog: Dialog,private spinnerService: NgxSpinnerService){
  this.spinnerService.show();
   this.UserDataService.getUserData().subscribe((data)=>{
    this.spinnerService.hide();
    this.userData=data;
  
    
  })
 
 }
 share()
 {
  
  this.dialog.open(NotifyActionComponent,{
  width:'500px',
  height:'400px'
  });
 }
 details(val:any)
 {
    this.dialog.open(DetailsComponents, {
    data: { user: val }, 
  }); 
 }

 fullView(val:any,data:any){
  this.isfullView=val;
  this.Id=data;
 }
//  applyFilter(event: Event) {
//   const filterValue = (event.target as HTMLInputElement).value;
//   this.dataSource.filter = filterValue.trim().toLowerCase();

//   if (this.dataSource.paginator) {
//     this.dataSource.paginator.firstPage();
//   }
// }
 
}
export interface DetailsData {
  user: any;
}
