import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../models/dish';
import { ShoppingcartService } from '../services/shoppingcart.service';
import { ShoppingCart } from '../models/shoppingcart';

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

  constructor(private cartService: ShoppingcartService) { 
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
    this.shoppingCart.forEach((item,index) => {
      this.cart = new ShoppingCart();
      this.cart.itemid = item.itemid;
      this.cart.quantitysold = this.qty[index];
      this.cart.invoicenumber = this.lastInvoice + 1;
      this.cart.totalprice = parseInt(item.price) * this.qty[index];
      
      this.cartGroup.push(this.cart); 
    });
  }
  
  placeOrder() {
    this.constructShoppingCart();
    console.log(this.cartGroup);
    /*this.cartService.dishSale(this.cartGroup)
                    .subscribe(result => {
                      console.log(result);
                    },
                    error => {
                      console.log(error);
                    })*/
  }
}
