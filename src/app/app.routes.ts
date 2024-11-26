import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProdutoComponent } from './pages/produto/produto.component';


export const routes: Routes = [
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "cart",
    component: CartComponent
  },
  {
    path: "produto/:id",
    component: ProdutoComponent
  }
];
