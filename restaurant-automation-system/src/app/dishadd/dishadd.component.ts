import { Component, OnInit } from '@angular/core';
import { DishService } from '../services/dish.service';
import { Dish } from '../models/dish';

@Component({
  selector: 'app-dishadd',
  templateUrl: './dishadd.component.html',
  styleUrls: ['./dishadd.component.css']
})
export class DishaddComponent implements OnInit {

  categories: any;
  error: any;
  categoryid: number;

  constructor(private dishService:DishService) { 
    this.getCategories();
  }

  ngOnInit() {
    
  }
  getCategories() {
    this.dishService.getCategories()
                    .subscribe(categories => {
                      this.categories = categories;
                    },
                    error => {
                      this.error = error;
                    });
  }

  addNewDish() {
    
  }
}
