import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockdetailComponent } from './stockdetail.component';

describe('StockdetailComponent', () => {
  let component: StockdetailComponent;
  let fixture: ComponentFixture<StockdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
