import { Injectable } from '@angular/core';
import { Dish } from '../models/dish';
import { Observable,of, throwError,Subject } from 'rxjs';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { baseUrl } from '../models/baseurl';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DishService {

  private subject = new Subject<any>();

  status:boolean = false;
  constructor(private http: HttpClient) { }

  private errorHandler(Error: HttpErrorResponse) {
    if(Error.error instanceof ErrorEvent){
      // client side error 
      console.error(Error.error.message);
    } else {
      console.error(`Backend returned code:${Error.status} with message ${Error.error}`);
    }
    return throwError('Please Try again later');
  }

  sendAddNotification() {
    this.subject.next({text: 'New Item Added'});
  }

  getNotification():Observable<any> {
    return this.subject.asObservable();
  }

  getDishDetails(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseUrl + 'getDishDetails')
                    .pipe(catchError(this.errorHandler));
  }

  getCategories() {
    return this.http.get(baseUrl + 'getCategories')
                    .pipe(catchError(this.errorHandler));
  }

  addNewDish(dish: Dish) {
    return this.http.post(baseUrl + 'manager/addNewDish',dish)
                    .pipe(catchError(this.errorHandler));
  }
}
