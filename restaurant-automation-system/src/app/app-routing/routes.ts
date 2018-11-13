import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { MenuComponent } from '../menu/menu.component';
import { LoginComponent } from '../login/login.component';
import { DishaddComponent } from '../dishadd/dishadd.component';
import { ReportsComponent } from '../reports/reports.component';
import { StockdetailComponent } from '../stockdetail/stockdetail.component';
import { PurchasestockComponent } from '../purchasestock/purchasestock.component';
import { AuthGuard } from '../auth.guard';
import { IngredientfordishComponent } from '../ingredientfordish/ingredientfordish.component';

export const routes:Routes = [
    {
     path: 'home',
     component: HomeComponent},
    {
     path: 'menu',
     component: MenuComponent},
    {
     path: 'login',
     component: LoginComponent
    },
    {
     path: 'addItem',
     component: DishaddComponent,
     canActivate:[AuthGuard]
    },
    {
     path: 'reports',
     component: ReportsComponent,
     canActivate:[AuthGuard]
    },
    {
     path: 'stock',
     component: StockdetailComponent,
     canActivate:[AuthGuard]
    },
    {
     path: 'purchaseStock',
     component: PurchasestockComponent,
     canActivate:[AuthGuard]
    },
    {
     path: 'ingredientfordish',
     component: IngredientfordishComponent,
     canActivate: [AuthGuard]
    },
    {path: '',redirectTo: '/home',pathMatch: 'full'}
]