import { Injectable } from '@angular/core';
import { Dish } from '../models/dish';
import { DISHES } from '../models/dishes';
import { Observable,of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishDetails(): Observable<Dish[]> {
    return of(DISHES).pipe(delay(2000));
  }
}
