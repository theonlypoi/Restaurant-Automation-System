import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../models/baseurl';
import { Observable } from 'rxjs';
import { Report } from '../models/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  dateRange: any;
  constructor(private http:HttpClient) { }

  getMonthlySalesReport():Observable<Report[]> {
    return this.http.get<Report[]>(baseUrl + 'manager/monthlySaleDetails');
  }

  getWeeklySalesReport():Observable<Report[]> {
    return this.http.get<Report[]>(baseUrl + 'manager/weeklySaleDetails');
  }

  getCustomSalesReport(startDate:Date,endDate:Date){
    this.dateRange = {
      "startdate": startDate,
      "enddate": endDate
    }
    return this.http.post(baseUrl + 'manager/getCustomSalesReport',this.dateRange);
  }
}
