import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AccessService } from './service/access.service';
import { RoleService } from './service/role.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'books-list',
    loadChildren: () => import('./books-list/books-list.module').then( m => m.BooksListPageModule),
    canActivate: [ AccessService ]
  },
  {
    path: 'fav-list',
    loadChildren: () => import('./fav-list/fav-list.module').then( m => m.FavListPageModule),
    canActivate: [ AccessService ]
  },
  {
    path: 'user-info',
    loadChildren: () => import('./user-info/user-info.module').then( m => m.UserInfoPageModule),
    canActivate: [ AccessService ]
  },
  {
    path: 'mail-list',
    loadChildren: () => import('./mail-list/mail-list.module').then( m => m.MailListPageModule),
    canActivate: [ AccessService ]
  }, 
  {
    path: 'reserved-books',
    loadChildren: () => import('./reserved-books/reserved-books.module').then( m => m.ReservedBooksPageModule),
    canActivate: [ AccessService ]
  },
  {
    path: 'book-detail',
    loadChildren: () => import('./book-detail/book-detail.module').then( m => m.BookDetailPageModule),
    canActivate: [ AccessService ]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'create-book',
    loadChildren: () => import('./create-book/create-book.module').then( m => m.CreateBookPageModule),
    canActivate: [ RoleService ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
