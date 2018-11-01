import { Component, OnInit } from '@angular/core';
import { DishService } from '../services/dish.service';
import { Dish } from '../models/dish';

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

  constructor(private dishService:DishService) { 
    this.shoppingCart = [];
    this.onDish = [];
    this.qty = [];
  }

  ngOnInit() {
    this.dishService.getDishDetails()
                    .subscribe(dishes => {
                      this.dishes = dishes;
                      for(let i = 0; i < this.dishes.length;i++) {
                        this.onDish.push(false);
                      }
                      this.height_of_div = 200*(this.dishes.length/4);
                    });
  }

  onHover(i): void {
    this.onDish[i] = !this.onDish[i];
  }

  addToCart(i: number): void {
    if(this.shoppingCart.indexOf(this.dishes[i]) === -1){
      this.shoppingCart.push(this.dishes[i]);
      this.qty.push(1);
    } 
  }

  removeFromCart(i: number): void {
    this.shoppingCart.splice(i,1);
    this.qty.splice(i,1);
  }
}
