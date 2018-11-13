import { Component, OnInit} from '@angular/core';
import { FormGroup,FormArray,FormBuilder,Validators } from '@angular/forms';
import { IngredientForDish } from '../models/ingredientfordish';
import { StockService } from '../services/stock.service';
import { DishService } from '../services/dish.service';
import { ToastrService } from '../services/toastr.service';
import { Dish } from '../models/dish';
import { Ingredient } from '../models/ingredient';
@Component({
  selector: 'app-ingredientfordish',
  templateUrl: './ingredientfordish.component.html',
  styleUrls: ['./ingredientfordish.component.css']
})
export class IngredientfordishComponent implements OnInit {

  ingredientForDishForm : FormGroup;
  allDishes: Dish[];
  allIngredients: Ingredient[];

  date = new Date();

  constructor(private fb:FormBuilder,private stock:StockService,private dishService:DishService,
              private toastr:ToastrService) { 
    this.getDishes();
    this.getIngredients();
  }

  ngOnInit() {
    
    this.createForm();
  }

  getDishes() {
    this.dishService.getDishDetails()
        .subscribe(res => {
            this.allDishes = res;
          }, 
          err => {
            this.toastr.error("Some error occured");
          });
  }

  getIngredients() {
    this.stock.getIngredients()
        .subscribe(result => {
          this.allIngredients = result;
        },
        err =>{
          this.toastr.error("Some error occured");
        });
  }

  createForm() {
    this.ingredientForDishForm = this.fb.group({
      dishes: this.fb.array([
        this.getDetails()
      ])
    });
  }

  getDetails() {
    return this.fb.group({
      itemid: ['',Validators.required],
      ingredientid:['',Validators.required],
      quantityrequired:['',Validators.required]
    });
  }

  addMoreIngredient() {
    let dish = this.ingredientForDishForm.get('dishes') as FormArray;
    dish.push(this.getDetails());
  }

  buildForm() {
    let ingForDish: IngredientForDish;
    let ingForDishes: IngredientForDish[] = [];

    let data = this.ingredientForDishForm.get('dishes') as FormArray;
    for(let content of data.value) {
      ingForDish = new IngredientForDish();
      ingForDish.ingredientid = content.ingredientid;
      ingForDish.itemid = content.itemid;
      ingForDish.quantityrequired = content.quantityrequired;
      ingForDishes.push(ingForDish);
    }
    return ingForDishes;
  }

  Submit() {
    let ingForDishes = this.buildForm();
    this.stock.allocateIngredients(ingForDishes)
              .subscribe(res => {
                this.toastr.success("Ingredient allocated successfully");
                this.clearForm();
              },
              err => {
                this.toastr.error("Some error occured.")
              });

  }

  clearForm() {
    this.ingredientForDishForm.reset();
    this.createForm();
  }
}
