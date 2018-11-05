import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { ShoppingCart } from '../models/shoppingcart';


@Component({
  selector: 'app-billgeneration',
  templateUrl: './billgeneration.component.html',
  styleUrls: ['./billgeneration.component.css']
})
export class BillgenerationComponent implements OnInit {

  purchased: ShoppingCart[];
  displayedColumns:string[] = ['name','quantitysold','totalprice'];
  totalBill: number = 0;
  billingDate = new Date();

  constructor(private dialogRef:MatDialogRef<BillgenerationComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any) {
    this.purchased = data.purchased;
    this.calculateTotalBill();
  }

  ngOnInit() {
  }

  calculateTotalBill() {
    this.purchased.forEach(dish => {
      this.totalBill += dish.totalprice;
    });
  }

}
