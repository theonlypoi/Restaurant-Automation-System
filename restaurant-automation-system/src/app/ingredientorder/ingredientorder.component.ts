import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from '../services/toastr.service';

@Component({
  selector: 'app-ingredientorder',
  templateUrl: './ingredientorder.component.html',
  styleUrls: ['./ingredientorder.component.css']
})
export class IngredientorderComponent implements OnInit {

  ingredientOrderForm: FormGroup;
  ingredients: FormArray;
  date: any;
  constructor(private fb:FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data:any, private toastrService:ToastrService,
              public dialogRef:MatDialogRef<IngredientorderComponent>) { 
    // console.log(data);
    this.date = new Date();
  }

  ngOnInit() {
    this.createIngredientOrderForm();
  }

  createIngredientOrderForm() {
    this.ingredientOrderForm = this.fb.group({
      vendorName:['',Validators.required],
      ingredients: this.fb.array([this.getIngredients()])
    });
  }

  getIngredients():FormGroup {
    return this.fb.group({
      ingredientname:['',Validators.required],
      quantity:['',Validators.required]
    });
  }

  addIngredient() {
    this.ingredients = this.ingredientOrderForm.get('ingredients') as FormArray;
    this.ingredients.push(this.getIngredients());
  }

  placeOrder() {
    this.toastrService.success("Order Placed Successfully");
    this.dialogRef.close();
  }
}
