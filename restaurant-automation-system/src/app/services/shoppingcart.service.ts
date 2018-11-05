import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dish } from '../models/dish';
import { ShoppingCart } from '../models/shoppingcart';
import { baseUrl } from '../models/baseurl';

@Injectable({
  providedIn: 'root'
})
export class ShoppingcartService {

  constructor(private http:HttpClient) { }

  getInvoiceNumber() {
    return this.http.get(baseUrl + 'sclerk/getInvoiceNumber');
  }

  dishSale(cartGroup:ShoppingCart[]) {
    return this.http.post(baseUrl + 'sclerk/dishSale',cartGroup);
  }
}
