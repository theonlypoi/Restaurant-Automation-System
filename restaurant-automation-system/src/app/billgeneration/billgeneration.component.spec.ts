import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillgenerationComponent } from './billgeneration.component';

describe('BillgenerationComponent', () => {
  let component: BillgenerationComponent;
  let fixture: ComponentFixture<BillgenerationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillgenerationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillgenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
