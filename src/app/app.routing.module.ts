import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CdkDialogOverviewExample } from './cdk-dialog-overview-example';
import { userList } from './userList.component';
import { homePagecomponent } from './homePage.component';

import { userDataService } from './userData.service';


// import { NgxNavbarModule } from 'ngx-bootstrap-navbar';

export const routes: Routes = [
  {
    path: '',
    component: homePagecomponent,
    children: [
      {
        path: 'user',
        component: CdkDialogOverviewExample,
      },
      {
        path: 'admin',
      component: userList,
      },
    ]
  },

]

@NgModule({
  declarations: [ 
   
  ],
  imports: [ 

    RouterModule.forRoot(routes

    )
  ],
  exports: [
    RouterModule,
  ],
  providers: [userDataService],

})
export class AppRoutingModule {}


