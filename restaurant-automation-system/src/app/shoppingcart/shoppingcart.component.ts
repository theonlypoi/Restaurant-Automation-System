import { Component, OnInit, Input, Output,EventEmitter, OnChanges } from '@angular/core';
import { Dish } from '../models/dish';
import { ShoppingcartService } from '../services/shoppingcart.service';
import { ShoppingCart } from '../models/shoppingcart';
import { MatDialog,MatDialogConfig } from '@angular/material';
import { BillgenerationComponent } from '../billgeneration/billgeneration.component';
import { ToastrService } from '../services/toastr.service';
import { StockService } from '../services/stock.service';
import { DishService } from '../services/dish.service';
import { AuthService } from '../services/auth.service';
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
              private toastrService: ToastrService, private stockService: StockService,
              private auth: AuthService) {  
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
    this.stockService.cartRemoval(this.shoppingCart[i].itemid,this.qty[i]);
    this.shoppingCart.splice(i,1);
    this.qty.splice(i,1);
    this.maxPossible.splice(i,1);

    // add ingredients 
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
                      this.toastrService.success("Dish Item sale successful");
                      this.restore.emit(true);
                      this.updateStockDetail();
                      this.getInvoiceNumber();
                    },
                    error => {
                      this.toastrService.error("Some error occured.");
                    });
  }

  updateStockDetail() {
    this.stockService.updateStockDetails()
        .subscribe(result => {
          this.generateBill();
        },
        err => {
          this.toastrService.error("Some error occured");
        })
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

    this.oldValue[i] = this.newValue[i];
    if(isNaN(this.newValue[i])){
      this.newValue[i] = 0;
    }

    if(isNaN(this.oldValue[i])){
      this.oldValue[i] = 0;
    }
    
    this.newValue[i] = event.target.valueAsNumber;
    
    if(this.stockService.quantityIncreaseHandler(dishid,(this.newValue[i]||0) - this.oldValue[i]||0)){
      this.err = false;
      if(isNaN(this.oldValue[i]) || isNaN(this.newValue[i])) {
        this.err = true;
        this.toastrService.warn("Quantity Should not be empty.");
      }
    }
    
    else {
      this.err = true; 
      this.toastrService.warn("Sufficient Ingredients not available");
    }
    
  }

  isLoggedIn() {
    return this.auth.loggedIn();
  }
}
