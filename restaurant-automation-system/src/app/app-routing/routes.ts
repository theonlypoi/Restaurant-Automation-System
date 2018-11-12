import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { MenuComponent } from '../menu/menu.component';
import { LoginComponent } from '../login/login.component';
import { DishaddComponent } from '../dishadd/dishadd.component';
import { ReportsComponent } from '../reports/reports.component';
import { StockdetailComponent } from '../stockdetail/stockdetail.component';
import { PurchasestockComponent } from '../purchasestock/purchasestock.component';

export const routes:Routes = [
    {path: 'home',component: HomeComponent},
    {path: 'menu',component: MenuComponent},
    {path: 'login', component: LoginComponent},
    {path: 'addItem',component: DishaddComponent},
    {path: 'reports',component: ReportsComponent},
    {path: 'stock',component: StockdetailComponent},
    {path: 'purchaseStock',component: PurchasestockComponent},
    {path: '',redirectTo: '/home',pathMatch: 'full'}
]