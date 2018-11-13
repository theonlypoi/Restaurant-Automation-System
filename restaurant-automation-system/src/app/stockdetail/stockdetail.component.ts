import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { IngredientorderComponent } from '../ingredientorder/ingredientorder.component';
import { StockService } from '../services/stock.service';
import { ToastrService } from '../services/toastr.service';

@Component({
  selector: 'app-stockdetail',
  templateUrl: './stockdetail.component.html',
  styleUrls: ['./stockdetail.component.css']
})
export class StockdetailComponent implements OnInit {

  stockAvailable: any;
  belowThresholdStock: any;
  ingLen: number;
  belowingLen:number;
  columnsToDisplay = ["ingredientname","price","availability","threshold"];
  columns = ["ingredientname","price","availability","threshold","quantity"];
  constructor(private stockService: StockService, private toastrService: ToastrService,
              private dialog:MatDialog) { 
    this.getStockDetails();
  }

  ngOnInit() {
  }

  @ViewChild('ingPaginator') ingPaginator: MatPaginator;
  @ViewChild('belowingPaginator') belowingPaginator: MatPaginator;
  getStockDetails() {
    this.stockService.getIngredients()
                     .subscribe(stock => {
                        this.stockAvailable = new MatTableDataSource(stock);
                        this.stockAvailable.paginator = this.ingPaginator;
                        this.ingLen = stock.length;
                        this.getBelowThresholdStock(stock);
                     },
                     err => {
                      this.toastrService.error("Could not get stock details");
                     });
  }

  getBelowThresholdStock(stock) {
    this.belowThresholdStock = new MatTableDataSource(stock.filter(s => s.availability <= s.threshold));
    this.belowingLen = this.belowThresholdStock.filteredData.length;
    // console.log(this.belowThresholdStock);
  }

  placeOrder() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.height = '600px';
    dialogConfig.width = '600px';
    dialogConfig.data = {
      "data": this.belowThresholdStock.filteredData
    };
    this.dialog.open(IngredientorderComponent,dialogConfig);
  }
}
