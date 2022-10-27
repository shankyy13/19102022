import {Component, Inject, Input,OnInit} from '@angular/core';
import {Dialog, DialogRef, DIALOG_DATA} from '@angular/cdk/dialog';
import {FormControl} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
/**
 * @title Card with multiple sections
 */
@Component({
  selector: 'notifyActionComponent',
  templateUrl: 'NotifyAction.component.html',
  styleUrls: ['NotifyAction.component.css'],
})
export class NotifyActionComponent implements OnInit{

  toppings = new FormControl('');

  toppingList: string[] = ['gagan@productmanager', 'manish@projectmanager', 'divya@webappmanager', 'shankar@webapp', 'gautam@backend', 'jatinder@mobileApp'];
  constructor(public dialogRef: DialogRef<string>,private snackBar: MatSnackBar){}
  ngOnInit() {
    
  }
  cancel()
  {
    this.snackBar.open("Successfully Sent", 'close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000,
    });
    this.dialogRef.close();
  }
}

