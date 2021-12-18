import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BooksListPageRoutingModule } from './books-list-routing.module';

import { BooksListPage } from './books-list.page';

import { Ng2SearchPipeModule } from 'ng2-search-filter'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BooksListPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [BooksListPage]
})
export class BooksListPageModule {}
