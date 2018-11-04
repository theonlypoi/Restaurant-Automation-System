import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Dish } from '../models/dish';
import { DishService } from '../services/dish.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RefreshService } from '../services/refresh.service';


@Component({
  selector: 'app-priceupdate',
  templateUrl: './priceupdate.component.html',
  styleUrls: ['./priceupdate.component.css']
})
export class PriceupdateComponent implements OnInit {

  dishes: Dish[];
  selectedDish: Dish;
  updatedDish: Dish;

  priceUpdateForm: FormGroup;

  constructor(private dishService:DishService,private fb: FormBuilder,private dialogRef:MatDialogRef<PriceupdateComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any,
              private refresh: RefreshService) { 
    this.getDishes();
    this.createPriceUpdateForm(); 
  }

  ngOnInit() {
    
  }

  getDishes() {
    this.dishes = this.dishService.getDishes();
    let ind = this.data["index"]
    this.selectedDish = this.dishes[ind];
  }

  // create the reactive form 
  createPriceUpdateForm() {
    this.priceUpdateForm = this.fb.group({
      itemid: [this.selectedDish.itemid],
      name: [this.selectedDish.name],
      category:[this.selectedDish.category],
      price: [this.selectedDish.price,[Validators.required,Validators.min(10)]],
      image: [this.selectedDish.image],
      description: [this.selectedDish.description]
    });
  }

  updateDishPrice() {
    this.updatedDish = this.priceUpdateForm.value;
    this.dishService.updateDishPrice(this.updatedDish)
                    .subscribe(result => {
                      console.log(result);
                      this.refresh.sendNotification();
                      this.dialogRef.close();
                    });
  }

}
