import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../models/ingredient';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StockService} from '../services/stock.service';
import { ToastrService } from '../services/toastr.service';
import { MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-ingredientadd',
  templateUrl: './ingredientadd.component.html',
  styleUrls: ['./ingredientadd.component.css']
})
export class IngredientaddComponent implements OnInit {

  ingredientForm: FormGroup;

  constructor(private fb: FormBuilder,private stockService: StockService,
              private toastr: ToastrService,private dialogRef:MatDialogRef<IngredientaddComponent>) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.ingredientForm = this.fb.group({
      'name':['',Validators.required],
      'price':['',Validators.required],
      'quantity':['',Validators.required]
    })
  }

  addNewIngredient() {
    let formValue = this.ingredientForm.value;
    this.stockService.addNewIngredient(formValue)
        .subscribe(result => {
          this.dialogRef.close();
          this.toastr.success("Ingredient Insertion Successful");
        },
        error => {
          this.toastr.error("Ingredient Insertion Failed.")
          this.ingredientForm.reset();
        });
  }

}
