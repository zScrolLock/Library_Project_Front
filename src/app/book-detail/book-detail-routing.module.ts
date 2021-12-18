import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessService } from '../service/access.service';

import { BookDetailPage } from './book-detail.page';

const routes: Routes = [
  {
    path: '',
    component: BookDetailPage
  },
  {
    path: 'books-list',
    loadChildren: () => import('../books-list/books-list.module').then( m => m.BooksListPageModule),
    canActivate: [ AccessService ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookDetailPageRoutingModule {}
