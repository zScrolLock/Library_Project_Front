import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavListPageRoutingModule } from './fav-list-routing.module';

import { FavListPage } from './fav-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavListPageRoutingModule
  ],
  declarations: [FavListPage]
})
export class FavListPageModule {}
