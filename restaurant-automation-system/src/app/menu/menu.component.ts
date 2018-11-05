import { Component, OnInit } from '@angular/core';
import { DishService } from '../services/dish.service';
import { RefreshService } from '../services/refresh.service';
import { Dish } from '../models/dish';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { PriceupdateComponent } from '../priceupdate/priceupdate.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  dishes: Dish[];
  shoppingCart: Dish[];
  onDish: boolean[];
  qty: number[];
  height_of_div: number;
  error: any;
  subscription: Subscription;

  constructor(private dishService:DishService,private dialog:MatDialog,private refresh:RefreshService) { 
    this.shoppingCart = [];
    this.onDish = [];
    this.qty = [];

    this.refresh.getNotification()
                    .subscribe(result=> {
                      this.getDishDetails();
                    });
  }

  ngOnInit() {
    this.getDishDetails();
  }

  getDishDetails() {
    this.dishService.getDishDetails()
                    .subscribe(dishes => {
                      this.dishes = dishes;
                      for(let i = 0; i < this.dishes.length;i++) {
                        this.onDish.push(false);
                      }
                      this.height_of_div = 200*((this.dishes.length/4) + 1);
                      this.dishService.setDishes(this.dishes);
                    },
                    error => {
                      this.error = error;
                    });
  }

  onHover(i): void {
    this.onDish[i] = !this.onDish[i];
  }

  openPriceUpdateForm(i: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.height = '600px';
    dialogConfig.width = '600px';
    dialogConfig.data = {
      "index": i
    };

    this.dialog.open(PriceupdateComponent,dialogConfig);
  }

  addToCart(i: number): void {
    if(this.shoppingCart.indexOf(this.dishes[i]) === -1){
      this.shoppingCart.push(this.dishes[i]);
      this.qty.push(1);
    } 
  }
}
