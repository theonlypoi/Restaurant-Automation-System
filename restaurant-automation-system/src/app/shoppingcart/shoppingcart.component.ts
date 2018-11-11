import { Component, OnInit, Input, Output,EventEmitter, OnChanges } from '@angular/core';
import { Dish } from '../models/dish';
import { ShoppingcartService } from '../services/shoppingcart.service';
import { ShoppingCart } from '../models/shoppingcart';
import { MatDialog,MatDialogConfig } from '@angular/material';
import { BillgenerationComponent } from '../billgeneration/billgeneration.component';
import { ToastrService } from '../services/toastr.service';
import { StockService } from '../services/stock.service';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit{

  lastInvoice: number;
  error: any;

  cart: ShoppingCart;
  cartGroup: ShoppingCart[] = [];

  status: boolean[];

  oldValue: number[] = [];
  newValue: number[] = [];
  err:boolean;
  @Input('shoppingCart')
  shoppingCart: Dish[];

  @Input('qty')
  qty: number[];

  @Input('maxPossible')
  maxPossible: boolean[];

  @Input('length')
  shoppingLen: number;

  @Output('restore')
  restore = new EventEmitter<boolean>();

  constructor(private cartService: ShoppingcartService,private dialog:MatDialog,
              private toastrService: ToastrService, private stockService: StockService) {  
    this.getInvoiceNumber();
    this.status = [];
    this.err = false;
  }

  ngOnInit() {
    for(let i=0;i < this.shoppingLen;i++) {
      this.oldValue.push(0);
      this.newValue.push(1);
    }
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
    this.maxPossible.splice(i,1);
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
                      this.getInvoiceNumber();
                    },
                    error => {
                      this.toastrService.error(error);
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

  quantityHandler(dishid,event,i) {

    //console.log(event);

    console.log("i:",i);
    // console.log("Old value:",this.oldValue[i]);

    this.oldValue[i] = (this.newValue[i]);
    this.newValue[i] = (event.target.valueAsNumber);
    console.log("quantity handler:",dishid,this.newValue[i],this.oldValue[i]);
    if(this.stockService.quantityIncreaseHandler(dishid,this.newValue[i] - this.oldValue[i])){
      // let it increase
      this.err = false;
    }
    else {
      // this.qty[i] = this.oldValue[i];
      // this.maxPossible[i] = true;
      this.err = true; 
      this.toastrService.warn("Sufficient ingredients are not available.");
    }
  }
}
