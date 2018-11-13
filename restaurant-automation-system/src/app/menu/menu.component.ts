import { Component, OnInit } from '@angular/core';
import { DishService } from '../services/dish.service';
import { RefreshService } from '../services/refresh.service';
import { Dish } from '../models/dish';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { PriceupdateComponent } from '../priceupdate/priceupdate.component';
import { Ingredient } from '../models/ingredient';
import { StockService } from '../services/stock.service';
import { ToastrService } from '../services/toastr.service';
import { Requirement } from '../models/requirement';
import { AuthService } from '../services/auth.service';

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
  requirements: Requirement[];
  maxPossible: boolean[];
  status:boolean;
  shoppingLen = 0;
  ingredients: Ingredient[];

  constructor(private dishService:DishService,private dialog:MatDialog,private refresh:RefreshService,
              private toastrService:ToastrService,private stockService:StockService,
              private auth:AuthService) { 
    this.shoppingCart = [];
    this.onDish = [];
    this.qty = [];
    
    this.maxPossible = [];
    this.requirements = [];
    
    this.getStockDetails();
    this.getAllIngredients();

    this.refresh.getNotification()
                    .subscribe(result=> {
                      this.getDishDetails();
                    });
  }

  ngOnInit() {
    this.getDishDetails();
  }

  isLoggedIn() {
    return this.auth.loggedIn();
  }

  isManager() {
    return (this.auth.getUserRole() === 'Manager');
  }

  getDishDetails() {
    this.dishService.getDishDetails()
                    .subscribe(dishes => {
                      this.dishes = dishes;
                      for(let i = 0; i < this.dishes.length;i++) {
                        this.onDish.push(false);
                        this.maxPossible.push(false);
                      }
                      this.height_of_div = 200*((this.dishes.length/4) + 1);
                      this.shoppingLen = this.dishes.length;
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

  dishPrepPossible(i:number, id: number,ingredients: Ingredient[]) {
    let obj = this.stockService.dishPrepPossible(this.requirements,id,ingredients);
    this.status = obj.status;
    // this.maxPossible[i] = obj.possibleDishes;
    // console.log(this.maxPossible);
    return this.status;
  }

  addToCart(i: number): void {
    // provide additional logic to check whether this dish can be prepared or not.
    if(this.dishPrepPossible(i, this.dishes[i].itemid,this.ingredients)){
      
      if(this.shoppingCart.indexOf(this.dishes[i]) === -1){
        this.shoppingCart.push(this.dishes[i]);
        this.qty.push(1);
      }

    }
    else {
      this.toastrService.warn("Sufficient ingredients for dish not available.");
      this.toastrService.warn("Please check the stock details.");
    }
  }

  cartRestore(event) {
    this.shoppingCart.length = 0;
    this.qty.length = 0;
    this.maxPossible.length = 0;
  }

  getStockDetails() {
    this.stockService.getStockDetails()
            .subscribe(stocks => {
              this.requirements = stocks;
            },
            error => {
              this.toastrService.error("Try again later.")
            });
  }

  getAllIngredients() {
    this.stockService.getIngredients()
                           .subscribe(ingredients => {
                              this.ingredients = ingredients;
                           });
  }
}
