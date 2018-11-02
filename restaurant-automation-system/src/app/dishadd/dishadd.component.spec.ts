import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishaddComponent } from './dishadd.component';

describe('DishaddComponent', () => {
  let component: DishaddComponent;
  let fixture: ComponentFixture<DishaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
