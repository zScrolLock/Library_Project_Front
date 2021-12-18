import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MailListPageRoutingModule } from './mail-list-routing.module';

import { MailListPage } from './mail-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MailListPageRoutingModule
  ],
  declarations: [MailListPage]
})
export class MailListPageModule {}
