import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservedBooksPage } from './reserved-books.page';

const routes: Routes = [
  {
    path: '',
    component: ReservedBooksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservedBooksPageRoutingModule {}
