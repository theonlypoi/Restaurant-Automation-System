import { Component, OnInit,ViewChild } from '@angular/core';
import { ReportService } from '../services/report.service';
import { Report } from '../models/report'; 
import { MatPaginator,MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  weeklyDataSource: any;
  monthlyDataSource: any;
  customDataSource: any;

  startDate: Date;
  endDate: Date;

  monthlyReportLen: number;
  weeklyReportLen: number;
  customReportLen: number;

  @ViewChild('weekPaginator') wpaginator:MatPaginator;
  @ViewChild('monthPaginator') mpaginator:MatPaginator;
  @ViewChild('customPaginator') cpaginator:MatPaginator;

  @ViewChild('weekSort') wsort: MatSort;
  @ViewChild('monthSort') msort: MatSort;
  @ViewChild('customSort') csort: MatSort;

  columnsToDisplay: string[] = ['itemname','category','quantity','price'];

  constructor(private reportService:ReportService) { }

  ngOnInit() {
    this.getMonthlySalesReport();
    this.getWeeklySalesReport();
  }

  getMonthlySalesReport() {
    this.reportService.getMonthlySalesReport()
                      .subscribe(report => {
                        this.monthlyDataSource = new MatTableDataSource(report);
                        this.monthlyDataSource.paginator = this.mpaginator;
                        this.monthlyDataSource.sort = this.msort;
                        this.monthlyReportLen = report.length;
                      });
  }

  getWeeklySalesReport() {
    this.reportService.getWeeklySalesReport()
                      .subscribe(report => {
                        this.weeklyDataSource = new MatTableDataSource(report);
                        this.weeklyDataSource.paginator = this.wpaginator;
                        this.weeklyDataSource.sort = this.wsort;
                        this.weeklyReportLen =report.length;
                      });
  }

  getCustomSalesReport() {
    this.reportService.getCustomSalesReport(this.startDate,this.endDate) 
                      .subscribe(report=> {
                        this.customDataSource = new MatTableDataSource(Object.values(report));
                        this.customDataSource.paginator = this.cpaginator;
                        this.customDataSource.sort = this.csort;
                        this.customReportLen = Object.values(report).length;
                      }); 
  }
}
