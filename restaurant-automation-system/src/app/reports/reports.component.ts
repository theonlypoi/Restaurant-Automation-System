import { Component, OnInit,ViewChild } from '@angular/core';
import { ReportService } from '../services/report.service';
import { Report } from '../models/report'; 
import { MatPaginator,MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from '../services/toastr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  weeklyDataSource: any;
  monthlyDataSource: any;
  customDataSource: any;
  expenseDataSource: any;

  startDate: Date;
  endDate: Date;

  monthlyReportLen: number;
  weeklyReportLen: number;
  customReportLen: number;
  expenseReportLen: number;

  @ViewChild('weekPaginator') wpaginator:MatPaginator;
  @ViewChild('monthPaginator') mpaginator:MatPaginator;
  @ViewChild('customPaginator') cpaginator:MatPaginator;
  @ViewChild('expensePaginator') epaginator:MatPaginator;

  @ViewChild('weekSort') wsort: MatSort;
  @ViewChild('monthSort') msort: MatSort;
  @ViewChild('customSort') csort: MatSort;
  @ViewChild('expenseSort') esort: MatSort;

  columnsToDisplay: string[] = ['itemname','category','quantity','price'];
  expenseColumns: string[] = ['purchasedate','vendorname','invoice','ingredientname','quantity','totalcost'];

  constructor(private reportService:ReportService,private toastr:ToastrService,
              private router:Router) { }

  ngOnInit() {
    this.getMonthlySalesReport();
    this.getWeeklySalesReport();
    this.getMonthlyExpenseDetails();
  }

  getMonthlySalesReport() {
    this.reportService.getMonthlySalesReport()
                      .subscribe(report => {
                        this.monthlyDataSource = new MatTableDataSource(report);
                        this.monthlyDataSource.paginator = this.mpaginator;
                        this.monthlyDataSource.sort = this.msort;
                        this.monthlyReportLen = report.length;
                      },
                      error => {
                        this.router.navigate(['/home']);
                        this.toastr.error("Something fishy is going on");
                      });
  }

  getWeeklySalesReport() {
    this.reportService.getWeeklySalesReport()
                      .subscribe(report => {
                        this.weeklyDataSource = new MatTableDataSource(report);
                        this.weeklyDataSource.paginator = this.wpaginator;
                        this.weeklyDataSource.sort = this.wsort;
                        this.weeklyReportLen =report.length;
                      },
                      error => {
                        this.router.navigate(['/home']);
                        this.toastr.error("Something fishy is going on");
                      });
  }

  getCustomSalesReport() {
    this.reportService.getCustomSalesReport(this.startDate,this.endDate) 
                      .subscribe(report=> {
                        this.customDataSource = new MatTableDataSource(Object.values(report));
                        this.customDataSource.paginator = this.cpaginator;
                        this.customDataSource.sort = this.csort;
                        this.customReportLen = Object.values(report).length;
                      }, 
                      error => {
                        this.router.navigate(['/home']);
                        this.toastr.error("Something fishy is going on");
                      });
  }

  getMonthlyExpenseDetails() {
    this.reportService.getMonthlyExpenseDetails()
        .subscribe(report => {
          this.expenseDataSource = new MatTableDataSource(report);
          this.expenseDataSource.paginator = this.epaginator;
          this.expenseDataSource.sort = this.esort;
          this.expenseReportLen = report.length;
        },
        error => {
          this.router.navigate(['/home']);
          this.toastr.error("Something fishy is going on");
        });
  }
}
