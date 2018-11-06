import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { MenuComponent } from '../menu/menu.component';
import { LoginComponent } from '../login/login.component';
import { DishaddComponent } from '../dishadd/dishadd.component';
import { ReportsComponent } from '../reports/reports.component';

export const routes:Routes = [
    {path: 'home',component: HomeComponent},
    {path: 'menu',component: MenuComponent},
    {path: 'login', component: LoginComponent},
    {path: 'addItem',component: DishaddComponent},
    {path: 'reports',component: ReportsComponent},
    {path: '',redirectTo: '/home',pathMatch: 'full'}
]