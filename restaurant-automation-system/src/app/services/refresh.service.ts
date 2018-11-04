import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  private subject = new Subject<any>();
  constructor() { }

  sendNotification() {
    this.subject.next({text: 'Page Refresh'});
  }

  getNotification():Observable<any> {
    return this.subject.asObservable();
  }
}
