import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { AppRoutingModule } from '../app/app-routing/app-routing.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';

import 'hammerjs';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';

import { baseUrl } from './models/baseurl';
import { DishaddComponent } from './dishadd/dishadd.component';
import { PriceupdateComponent } from './priceupdate/priceupdate.component';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { BillgenerationComponent } from './billgeneration/billgeneration.component';
import { ReportsComponent } from './reports/reports.component';
import { MatSortModule } from '@angular/material/sort';
import { StockdetailComponent } from './stockdetail/stockdetail.component';
import { ModifiedcurrencyPipe } from './modifiedcurrency.pipe';
import { IngredientorderComponent } from './ingredientorder/ingredientorder.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    MenuComponent,
    LoginComponent,
    DishaddComponent,
    PriceupdateComponent,
    ShoppingcartComponent,
    BillgenerationComponent,
    ReportsComponent,
    StockdetailComponent,
    ModifiedcurrencyPipe,
    IngredientorderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatDividerModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    HttpClientModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule
  ],
  exports:[],
  providers: [
    { provide: 'baseUrl',useValue: baseUrl}
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginComponent,
    DishaddComponent,
    PriceupdateComponent,
    BillgenerationComponent,
    IngredientorderComponent
  ]
})
export class AppModule { }
