import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceupdateComponent } from './priceupdate.component';

describe('PriceupdateComponent', () => {
  let component: PriceupdateComponent;
  let fixture: ComponentFixture<PriceupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
