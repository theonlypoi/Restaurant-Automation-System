import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

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
  columnsToDisplay = ["ingredientname","price","availability","threshold"];
  constructor(private stockService: StockService, private toastrService: ToastrService) { 
    this.getStockDetails();
  }

  ngOnInit() {
  }

  @ViewChild('ingPaginator') ingPaginator: MatPaginator;
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
    this.belowThresholdStock = new MatTableDataSource(stock.filter(s => s.availability < s.threshold));
  }

  successNotice() {
  }
}
