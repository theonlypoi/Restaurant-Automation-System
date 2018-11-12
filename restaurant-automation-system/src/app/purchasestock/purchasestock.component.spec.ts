import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasestockComponent } from './purchasestock.component';

describe('PurchasestockComponent', () => {
  let component: PurchasestockComponent;
  let fixture: ComponentFixture<PurchasestockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasestockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasestockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
