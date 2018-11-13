import { Injectable } from '@angular/core';
import { baseUrl } from '../models/baseurl';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(data) {
    return this.http.post< Observable<Token> >(baseUrl + 'login',data);
  }
}
