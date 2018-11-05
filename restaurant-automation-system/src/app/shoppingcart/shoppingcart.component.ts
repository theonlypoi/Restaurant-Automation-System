import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Dish } from '../models/dish';
import { ShoppingcartService } from '../services/shoppingcart.service';
import { ShoppingCart } from '../models/shoppingcart';
import { MatDialog,MatDialogConfig } from '@angular/material';
import { BillgenerationComponent } from '../billgeneration/billgeneration.component';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {

  lastInvoice: number;
  error: any;

  cart: ShoppingCart;
  cartGroup: ShoppingCart[] = [];

  prevShoppingCartSize: number = 0;

  @Input('shoppingCart')
  shoppingCart: Dish[];

  @Input('qty')
  qty: number[];

  @Output('restore')
  restore = new EventEmitter<boolean>();

  constructor(private cartService: ShoppingcartService,private dialog:MatDialog) { 
    this.getInvoiceNumber();
  }

  ngOnInit() {
  }

  getInvoiceNumber() {
    this.cartService.getInvoiceNumber()
                    .subscribe(invoice => {
                      this.lastInvoice = invoice[0].invoicenumber;
                    });
  }

  isValid(): boolean {
    return this.shoppingCart.length > 0;
  }

  removeFromCart(i: number): void {
    this.shoppingCart.splice(i,1);
    this.qty.splice(i,1);
  }

  constructShoppingCart() {
    this.cartGroup = [];
    this.shoppingCart.forEach((item,index) => {
      this.cart = new ShoppingCart();
      this.cart.name = item.name;
      this.cart.itemid = item.itemid;
      this.cart.quantitysold = this.qty[index];
      this.cart.invoicenumber = this.lastInvoice + 1;
      this.cart.totalprice = parseInt(item.price) * this.qty[index];
      
      this.cartGroup.push(this.cart); 
    });
  }
  
  placeOrder() {
    this.constructShoppingCart();
    this.cartService.dishSale(this.cartGroup)
                    .subscribe(result => {
                      console.log(result);
                      this.restore.emit(true);
                      this.generateBill();
                    },
                    error => {
                      console.log(error);
                    });
  }

  generateBill() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.height = '600px';
    dialogConfig.width = '600px';
    dialogConfig.data = {
      "purchased":this.cartGroup
    };
    this.dialog.open(BillgenerationComponent,dialogConfig);
  }
}
