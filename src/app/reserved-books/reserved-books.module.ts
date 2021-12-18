import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservedBooksPageRoutingModule } from './reserved-books-routing.module';

import { ReservedBooksPage } from './reserved-books.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservedBooksPageRoutingModule
  ],
  declarations: [ReservedBooksPage]
})
export class ReservedBooksPageModule {}
