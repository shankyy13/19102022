import {Component, Inject, Input,OnInit} from '@angular/core';
import {Dialog, DialogRef, DIALOG_DATA} from '@angular/cdk/dialog';
import { NgxSpinnerService } from 'ngx-spinner';

import {FormControl} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { userDataService } from './userData.service';
import { DetailsData } from './userList.component';
/**
 * @title Card with multiple sections
 */
 @Component({
  selector: 'detailsColumn',
  templateUrl: 'detailsColumn.component.html',
  styleUrls: ['detailsColumn.component.css'],
})
export class DetailsComponents implements OnInit{
  userData:any=[];
 
  constructor(private UserDataService:userDataService,
    @Inject(DIALOG_DATA) public data: DetailsData,
    private spinnerService: NgxSpinnerService,
    private snackBar: MatSnackBar)
    {
   
      
    }
  
 
  ngOnInit(){}
   
 
}