import { Injectable } from '@angular/core';
declare var toastr:any;
@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor() { }

  success(title:string, message?:string){
    toastr.success(title,message);
  } 

  error(title:string,message?:string){
    toastr.error(title,message);
  }

  info(title:string,message?:string){
    toastr.info(title,message);
  }

  warn(title:string,message?:string) {
    toastr.warn(title,message);
  }
}
