import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormArray,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { StockService } from '../services/stock.service';
import { Ingredient } from '../models/ingredient';
import { ToastrService } from '../services/toastr.service';

import { Stock } from '../models/stock';

@Component({ 
  selector: 'app-purchasestock',
  templateUrl: './purchasestock.component.html',
  styleUrls: ['./purchasestock.component.css']
})
export class PurchasestockComponent implements OnInit {

  @ViewChild('mform') myForm;

  stockPurchaseForm: FormGroup;
  newStock: FormArray;
  totalCost: number[] = [];
  qty: number[] = [];
  id: number[] = [];
  lastInvoice: number;
  stockEntry: Stock[]; 

  prevStock: Ingredient[];
  constructor(private fb:FormBuilder,private stockService:StockService,
              private toastrService: ToastrService,private _router:Router) {            
    this.createForm();
    this.getInvoiceNumber();
    this.totalCost.push(0);
  }
 
  ngOnInit() {
    this.stockService.getIngredients()
                     .subscribe(ing => {
                      this.prevStock = ing;
                     },
                     error => {
                      this.toastrService.error("Some Error Happened.Try again later")
                     });
    this.stockPurchaseForm.valueChanges.subscribe(result => {
      let i = -1;
      for(let elem of result.stock) {
        i += 1;
        let id = elem.ingredientid;
        for(let ing of this.prevStock){
          if(ing.ingredientid === id) {
            let price = parseFloat(ing.price.toString().substring(2));
            let quantity = elem.quantity;
            this.totalCost[i] = price * quantity;
          }
        } 
      }
    }); 
  }

  getInvoiceNumber() {
    this.stockService.getInvoiceNumber()
                    .subscribe(invoice => {
                      this.lastInvoice = invoice[0].invoice + 1;
                    });
  }

  createForm() {
    this.stockPurchaseForm = this.fb.group({
      vendorName: ['',Validators.required],
      stock: this.fb.array([
        this.getStock()
      ])
    });
  }

  getStock():FormGroup {
    return this.fb.group({
      ingredientid: ['',Validators.required],
      quantity: ['',Validators.required]
    });
  }

  addNewIngredient() {
    this.newStock = this.stockPurchaseForm.get('stock') as FormArray;
    this.newStock.push(this.getStock());
    this.totalCost.push(0);
  }

  buildForm() {
    let formValue = this.stockPurchaseForm.value;
    let stockValue = formValue.stock;
    let vendorName = formValue.vendorName;
    this.stockEntry = [];
    let i  = -1;
    for(let elem of stockValue) {
      i += 1
      let stock: Stock = new Stock();
      stock.ingredientid = elem.ingredientid;
      stock.invoice = this.lastInvoice;
      stock.quantity = elem.quantity;
      stock.totalcost = this.totalCost[i];
      stock.vendorname = vendorName;
      this.stockEntry.push(stock);
    }
  }

  addNewStock() {
    this.buildForm();
    // console.log(this.stockEntry);
    this.stockService.addNewStock(this.stockEntry)
        .subscribe(result => {
          this.toastrService.success("Successfully updated ingredient list");
          this._router.navigate(['/stock']);
          this.myForm.reset();
          this.totalCost = [];
        },
        error => {
          this.toastrService.error("Ingredient addition unsuccessful");
        })
  }
}
