import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialExampleModule } from '../material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxCaptureModule } from 'ngx-capture';
import { CdkDialogOverviewExampleDialog } from './cdk-dialog-overview-example-dialog';
import { CdkDialogOverviewExample } from './cdk-dialog-overview-example';

import { userList } from './userList.component';
import { AppRoutingModule } from './app.routing.module';

import { userDataService } from './userData.service';
import { homePagecomponent } from './homePage.component';
import { AppComponent } from './app.component';

import {NotifyActionComponent} from './NotifyAction.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DetailsComponents } from './detailsColumn.component';



@NgModule({
  declarations: [AppComponent, CdkDialogOverviewExampleDialog, CdkDialogOverviewExample,userList,homePagecomponent,NotifyActionComponent,DetailsComponents],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    NgxCaptureModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    AppRoutingModule,
    // ToastrModule.forRoot({
    //   closeButton: true,
    //   timeOut: 5000, // 15 seconds
    //   progressBar: true,
    //   positionClass:'inline',
    // }),
    // NgbCollapseModule
    // SpeechRecognitionService,
  ],
  
  providers: [userDataService],
  bootstrap: [AppComponent,CdkDialogOverviewExample,userList],
})
export class AppModule {}
