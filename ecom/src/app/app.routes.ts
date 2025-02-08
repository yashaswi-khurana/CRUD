import { Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { SellerAuthComponent } from './shared/seller-auth/seller-auth.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { AddProductFormComponent } from './shared/add-product-form/add-product-form.component';
import { UpdateProductFormComponent } from './shared/update-product-form/update-product-form.component';
import { AboutComponent } from './open/about/about.component';
import { LoginFormComponent } from './shared/login-form/login-form.component';
import { CartComponent } from './shared/cart/cart.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'seller-auth',
    component: SellerAuthComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'add-product-form',
    component: AddProductFormComponent
  },
  {
    path: 'update-product/:id',
    component: UpdateProductFormComponent
  },
  {
    path: 'about',
    component : AboutComponent
  },
  {
    path: 'login',
    component : LoginFormComponent
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate : [AuthGuard]
  },
  {
    path: '**',
    component:PageNotFoundComponent
  },
];
