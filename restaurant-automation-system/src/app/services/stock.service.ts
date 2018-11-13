import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient';
import { IngredientPurchase } from '../models/ingredientpurchase';
import { Requirement } from '../models/requirement';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../models/baseurl';
import { Observable,throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  obj: any = {
    "status":"",
    "possibleDishes":""
  }
  requirements: Requirement[];
  ingredientForDish: Requirement[]; // For a particular dish find the ingredients required

  ingredients: Ingredient[];
  
  constructor(private http:HttpClient) { 
    this.ingredientForDish = [];
  }

  getStockDetails() {
    // this will give all the available ingredients 
    return this.http.get<Requirement[]>(baseUrl + 'sclerk/getStockDetails');
  }

  getIngredients() {
    return this.http.get<Ingredient[]>(baseUrl + 'sclerk/getIngredients');
  }

  findMaxLimit() {
    let minVal = 99999  

    for(const elem of this.ingredientForDish){
      let ing = this.ingredients.find(ing => ing.ingredientid === elem.ingredientid);
      if(ing.availability < minVal) {
        minVal = ing.availability;
      }
    }   
    return minVal;
  }

  refreshIngredientQuantity(id:number,quantity:number = 1) {
    for(let elem of this.ingredientForDish){
      let ind = this.ingredients.findIndex(ing => ing.ingredientid === elem.ingredientid);
      // console.log(ind);
      this.ingredients[ind].availability -= (elem.requirement * quantity);
      // console.log(this.ingredients[ind]);
    };
    // console.log("Initial:",this.ingredients);
  }

  cartRemoval(id:number,quantity: number) {
    let dishRequirements = this.requirements.filter(require => require.itemid === id);
    for(const elem of dishRequirements){
      let index = this.ingredients.findIndex(ing => ing.ingredientid === elem.ingredientid);
      // console.log(this.ingredients[index]);
      this.ingredients[index].availability += (elem.requirement * quantity);
      // console.log(this.ingredients[index]);
    }
  }

  quantityIncreaseHandler(dishid:number,quantity:number) {
    // check whether it is possible to increase the quantity or not 
     // console.log("Quantity:",quantity);
      // console.log("Dish id:",dishid);
      /*let dishRequirements = []; // this.requirements.filter(require => {require.itemid === dishid;});

      for(let elem of this.requirements) {
        if(elem.itemid === dishid) {
          dishRequirements.push(elem);
        }
      }*/
      // console.log("Quantity Change:",this.ingredients);
      let dishRequirements = this.requirements.filter(require => require.itemid === dishid);

      let status = false;
      // console.log("Dish Requirements:",dishRequirements);

      for(const elem of dishRequirements){
       let dishIngredients = this.ingredients.find(ing => ing.ingredientid === elem.ingredientid);
       // console.log("Ingredient Available:",dishIngredients.availability);
       // console.log("(elem.requirement * quantity)",(elem.requirement * quantity));
       
       if(dishIngredients.availability - (elem.requirement * quantity) > elem.threshold) {
        // dishIngredients.availability -= (elem.requirement * quantity);
        // console.log(dishIngredients.ingredientname,dishIngredients.availability);
        status = true;
       }
       else {
         status = false;
         break;
       }
      }
      
      for(const elem of dishRequirements){
        let index = this.ingredients.findIndex(ing => ing.ingredientid === elem.ingredientid);
        // console.log(this.ingredients[index]);
        this.ingredients[index].availability -= (elem.requirement * quantity);
        // console.log(this.ingredients[index]);
      }

      // for(const elem of this.ingredientForDish){
      //   let ing = this.ingredients.find(ing => ing.ingredientid === elem.ingredientid);
      //   console.log("Name:",elem.ingredientname,"Quantity",ing.availability);
      // } 
      return status;
  }

  dishPrepPossible(requirements:Requirement[],id: number,ingredients) {
    
    let status = false;
    this.requirements = requirements;
    this.ingredients = ingredients;
    // console.log(this.ingredients);

    // console.log(this.requirements);
    // requirements show the quantity required for different dishes.

    // extract out the ingredients required for the dish
    this.ingredientForDish = []; 

    // making sure the list is empty before inserting values for a new dish.
    for(const elem of this.requirements){
      if(elem.itemid === id) {
        this.ingredientForDish.push(elem);
      }
    }
    // console.log(this.ingredientForDish);
    // If no ingredient allocated then dish should not be prepared
    if(this.ingredientForDish.length === 0){
      this.obj.status = false;
      this.obj.possibleDishes = 0;
      return this.obj;
    }

    // Find out whether all ingredients are above threshold
    for(const elem of this.ingredientForDish){
      let ing = this.ingredients.find(ing => ing.ingredientid === elem.ingredientid);
      
      if(ing.availability - elem.requirement < elem.threshold) {
        
        status = false;
        break;
      } else {
        status = true;
      }
    };
    // console.log(status);

    // If every element is above threshold then allocate the item as well as 
    // subtract the required quantity else dish can't be prepared 

    if(status) {
      // find the maximum number of dishes that can be prepared
      this.obj.status = true;
      this.obj.possibleDishes = this.findMaxLimit();

      this.refreshIngredientQuantity(id);
      // console.log("Initial:");
      // for(const elem of this.ingredientForDish){
      //   let ing = this.ingredients.find(ing => ing.ingredientid === elem.ingredientid);
      //   console.log("Name:",elem.ingredientname,"Quantity",ing.availability);
      // }  
      return this.obj;
    }
    else {
      this.obj.status = false;
      this.obj.possibleDishes = 0;
      return this.obj;
    } 
  }

  getInvoiceNumber() {
    return this.http.get(baseUrl + 'sclerk/stockInvoiceNumber');
  }

  addNewStock(data) {
    return this.http.post(baseUrl + 'sclerk/ingredientPurchase',data);
  }

  updateStockDetails() {
    return this.http.post(baseUrl + 'sclerk/updateStockDetail',this.ingredients);
  }

  allocateIngredients(data) {
    return this.http.post(baseUrl + 'sclerk/allocateIngredient',data);
  }

  addNewIngredient(data) {
    return this.http.post(baseUrl + 'sclerk/addIngredients',data);
  }
}
